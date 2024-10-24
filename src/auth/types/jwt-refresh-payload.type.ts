import { User } from '../../users/domain/user';

export type JwtRefreshPayloadType = {
  id: User['id'];
  iat: number;
  exp: number;
};
