import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { RequestWithUser } from '../../../shared/types/request-with-user.type';

export const CurrentUser = createParamDecorator(
  (data: keyof RequestWithUser['user'] | undefined, ctx: ExecutionContext) => {
    const gqlCtx = GqlExecutionContext.create(ctx);
    const { req } = gqlCtx.getContext<{ req: RequestWithUser }>();

    const user = req.user;
    if (!user) {
      return null;
    }

    return data ? user[data] : user;
  },
);
