import { Type } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export type PaginationType<T> = {
  data: T[];
  meta: {
    page: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
    hasNextPage: boolean;
  };
};

class Meta {
  @ApiProperty({
    type: Number,
    example: 1,
  })
  page: number;

  @ApiProperty({
    type: Number,
    example: 10,
  })
  pageSize: number;

  @ApiProperty({
    type: Number,
    example: 5,
  })
  totalPages: number;

  @ApiProperty({
    type: Number,
    example: 50,
  })
  totalItems: number;

  @ApiProperty({
    type: Boolean,
    example: true,
  })
  hasNextPage: boolean;
}

export function PaginationTypeResponse<T>(classReference: Type<T>) {
  abstract class Pagination {
    @ApiProperty({ type: [classReference] })
    data!: T[];

    @ApiProperty({ type: Meta })
    meta: Meta;
  }

  Object.defineProperty(Pagination, 'name', {
    writable: false,
    value: `Pagination${classReference.name}Response`,
  });

  return Pagination;
}
