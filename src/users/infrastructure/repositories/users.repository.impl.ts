import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FindOptionsWhere, Repository } from 'typeorm';
import { UserRepository } from './users.repository';
import { UserEntity } from '../entities/user.entity';
import { User } from '../../domain/user';
import { UserMapper } from '../mappers/user.mapper';
import { FilterUserDto, SortUserDto } from '../../dto/query-user.dto';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { NullableType } from 'src/utils/types/nullable.type';
import { PaginationType } from 'src/utils/types/pagination';

@Injectable()
export class UsersRepositoryImpl implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async create(data: User): Promise<User> {
    const persistenceModel = UserMapper.toPersistence(data);
    const newEntity = await this.usersRepository.save(
      this.usersRepository.create(persistenceModel),
    );
    return UserMapper.toDomain(newEntity);
  }

  async findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterUserDto | null;
    sortOptions?: SortUserDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<PaginationType<User>> {
    const where: FindOptionsWhere<UserEntity> = {};
    if (filterOptions?.roles?.length) {
      where.role = filterOptions.roles.map((role) => ({
        id: Number(role.id),
      }));
    }

    const [results, total] = await this.usersRepository.findAndCount({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where: where,
      order: sortOptions?.reduce(
        (accumulator, sort) => ({
          ...accumulator,
          [sort.orderBy]: sort.order,
        }),
        {},
      ),
    });

    return {
      data: results.map((user) => UserMapper.toDomain(user)),
      meta: {
        page: paginationOptions.page,
        pageSize: paginationOptions.limit,
        totalItems: results.length,
        totalPages: Math.ceil(total / paginationOptions.limit),
        hasNextPage:
          Math.ceil(total / paginationOptions.limit) > paginationOptions.page,
      },
    };
  }

  async findByEmail(email: User['email']): Promise<NullableType<User>> {
    if (!email) return null;

    const entity = await this.usersRepository.findOne({
      where: { email },
    });

    return entity ? UserMapper.toDomain(entity) : null;
  }
}
