import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { SessionService } from './session.service';
import { UserModel } from '../user/dto/user.model';
import type { GqlContext } from '../../shared/types/gql-context.type';
import { LoginInput } from './dto/login.input';
import { UserEntity } from '../user/entities/user.entity';
import { Authorization } from '../../shared/decorators/auth.decorator';

@Resolver()
export class SessionResolver {
  constructor(private readonly sessionService: SessionService) {}

  @Mutation(() => UserModel)
  async login(
    @Context() { req }: GqlContext,
    @Args('input') input: LoginInput,
  ): Promise<UserEntity> {
    return this.sessionService.login(req, input);
  }

  @Authorization()
  @Mutation(() => Boolean)
  async logout(@Context() { req }: GqlContext): Promise<boolean> {
    return this.sessionService.logout(req);
  }
}
