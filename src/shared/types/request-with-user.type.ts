import type { Request } from 'express';
import type { UserEntity } from '../../auth/account/entities/user.entity';

export interface RequestWithUser extends Request {
  user: UserEntity;
}
