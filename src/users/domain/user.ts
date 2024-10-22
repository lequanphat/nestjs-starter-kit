import { Exclude, Expose } from 'class-transformer';
import { Role } from '../../roles/domain/role';
import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({
    type: Number,
  })
  id: number | string;

  @ApiProperty({
    type: String,
    example: 'quanphat@gmail.dev',
  })
  @Expose({ groups: ['me', 'admin'] })
  email: string | null;

  @Exclude({ toPlainOnly: true })
  password?: string;

  @ApiProperty({
    type: String,
    example: 'email',
  })
  @Expose({ groups: ['me', 'admin'] })
  provider: string;

  @ApiProperty({
    type: String,
    example: '1234567890',
  })
  @Expose({ groups: ['me', 'admin'] })
  socialId?: string | null;

  @ApiProperty({
    type: String,
    example: 'Quan',
  })
  firstName: string | null;

  @ApiProperty({
    type: String,
    example: 'Phat',
  })
  lastName: string | null;

  @ApiProperty({
    type: () => Role,
  })
  role?: Role | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;
}
