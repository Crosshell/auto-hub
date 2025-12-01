import { createParamDecorator, type ExecutionContext } from '@nestjs/common';
import { UserEntity } from '../../auth/account/entities/user.entity';
import { GqlExecutionContext } from '@nestjs/graphql';
import { RequestWithUser } from '../types/request-with-user.type';

export const Authorized = createParamDecorator(
  (data: keyof UserEntity, ctx: ExecutionContext) => {
    let user: UserEntity;

    if (ctx.getType() === 'http') {
      user = ctx.switchToHttp().getRequest<RequestWithUser>().user;
    } else {
      const context = GqlExecutionContext.create(ctx);
      user = context.getContext<{ req: RequestWithUser }>().req.user;
    }

    return data ? user[data] : user;
  },
);
