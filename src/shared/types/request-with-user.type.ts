import type { Request } from 'express';
import type { User } from '../../modules/user/entities/user.entity';

export interface RequestWithUser extends Request {
  user: User;
}
