import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { SessionService } from './session.service';
import type { GqlContext } from '../../shared/types/gql-context.type';
import { LoginInput } from './dto/login.input';
import { Authorization } from './decorators/auth.decorator';

@Resolver()
export class SessionResolver {
  constructor(private readonly sessionService: SessionService) {}

  @Mutation(() => Boolean)
  async login(
    @Context() { req }: GqlContext,
    @Args('input') input: LoginInput,
  ): Promise<boolean> {
    await this.sessionService.login(req, input);
    return true;
  }

  @Authorization()
  @Mutation(() => Boolean)
  async logout(@Context() { req }: GqlContext): Promise<boolean> {
    return this.sessionService.logout(req);
  }
}
