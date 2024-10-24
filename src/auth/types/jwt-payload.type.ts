import { User } from '../../users/domain/user';

export type JwtPayloadType = Pick<User, 'id' | 'role'> & {
  iat: number;
  exp: number;
};
