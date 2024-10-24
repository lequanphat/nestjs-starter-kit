import { User } from '../../domain/user';
import { FilterUserDto, SortUserDto } from '../../dto/query-user.dto';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { NullableType } from 'src/utils/types/nullable.type';
import { PaginationType } from 'src/utils/types/pagination';

export abstract class UserRepository {
  abstract create(
    data: Omit<User, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>,
  ): Promise<User>;

  abstract findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterUserDto | null;
    sortOptions?: SortUserDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<PaginationType<User>>;

  abstract findByEmail(email: User['email']): Promise<NullableType<User>>;

  abstract findById(id: User['id']): Promise<NullableType<User>>;
}
