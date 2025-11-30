import { User } from '../entities/user.entity';
import 'express';
import 'express-session';

declare module 'express' {
  interface Request {
    user?: User;
  }
}

declare module 'express-session' {
  interface SessionData {
    userId: string;
  }
}
