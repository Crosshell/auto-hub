import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserService } from '../../user/user.service';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);

    const request = ctx.getContext<{ req: Request }>().req;

    const session = request.session;
    const userId = session?.userId;

    if (!session || !userId) {
      throw new UnauthorizedException('Not authenticated');
    }

    const user = await this.userService.findOneById(userId);

    if (!user) {
      await new Promise((resolve) => session.destroy(resolve));
      throw new UnauthorizedException('User not found');
    }

    request.user = user;

    return true;
  }
}
