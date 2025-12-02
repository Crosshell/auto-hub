import type { Request } from 'express';
import type { User } from '../../auth/user/entities/user.entity';

export interface RequestWithUser extends Request {
  user: User;
}
