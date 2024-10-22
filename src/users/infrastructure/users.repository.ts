import { User } from '../domain/user';
import { FilterUserDto, SortUserDto } from '../dto/query-user.dto';
import { IPaginationOptions } from '../../utils/types/pagination-options';

export abstract class UserRepository {
  abstract findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterUserDto | null;
    sortOptions?: SortUserDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<User[]>;
}
