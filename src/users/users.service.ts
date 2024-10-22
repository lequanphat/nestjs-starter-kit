import { Injectable } from '@nestjs/common';
import { User } from './domain/user';
import { FilterUserDto, SortUserDto } from './dto/query-user.dto';
import { IPaginationOptions } from '../utils/types/pagination-options';

import { UserRepository } from './infrastructure/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UserRepository) {}

  findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterUserDto | null;
    sortOptions?: SortUserDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<User[]> {
    return this.usersRepository.findManyWithPagination({
      filterOptions,
      sortOptions,
      paginationOptions,
    });
  }
}
