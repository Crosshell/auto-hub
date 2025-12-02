import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { RequestWithUser } from '../../../shared/types/request-with-user.type';
import { UserService } from '../../user/user.service';

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const gqlCtx = GqlExecutionContext.create(context);
    const { req } = gqlCtx.getContext<{ req: RequestWithUser }>();

    const userId = req.session?.userId;
    if (!userId) {
      throw new UnauthorizedException('User not authorized');
    }

    const user = await this.userService.findOneByIdOrThrow(userId);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    req.user = user;

    return true;
  }
}
