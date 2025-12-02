import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { SessionService } from './session.service';
import type { GqlContext } from '../../shared/types/gql-context.type';
import { LoginInput } from './dto/login.input';
import { User } from '../user/entities/user.entity';
import { Authorization } from '../../shared/decorators/auth.decorator';

@Resolver()
export class SessionResolver {
  constructor(private readonly sessionService: SessionService) {}

  @Mutation(() => User)
  async login(
    @Context() { req }: GqlContext,
    @Args('input') input: LoginInput,
  ): Promise<User> {
    return this.sessionService.login(req, input);
  }

  @Authorization()
  @Mutation(() => Boolean)
  async logout(@Context() { req }: GqlContext): Promise<boolean> {
    return this.sessionService.logout(req);
  }
}
