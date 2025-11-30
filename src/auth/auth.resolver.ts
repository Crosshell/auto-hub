import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { RegisterInput } from './dto/register.input';
import { LoginInput } from './dto/login.input';
import { User } from '../user/entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './guards/auth.guard';
import type { GraphQLContext } from '@common/types/graphql-context.type';

@Resolver()
export class AuthResolver {
  constructor(private readonly service: AuthService) {}

  @Mutation(() => User)
  async register(@Args('input') input: RegisterInput): Promise<User> {
    return this.service.register(input);
  }

  @Mutation(() => User)
  async login(
    @Args('input') input: LoginInput,
    @Context() ctx: GraphQLContext,
  ): Promise<User> {
    const user = await this.service.login(input);
    ctx.req.session.userId = user.id;
    return user;
  }

  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  async logout(@Context() ctx: GraphQLContext) {
    await new Promise((resolve) => ctx.req.session.destroy(resolve));
    ctx.res.clearCookie('connect.sid');
    return true;
  }
}
