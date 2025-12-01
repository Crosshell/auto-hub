import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { SessionService } from './session.service';
import { UserModel } from '../account/models/user.model';
import type { GqlContext } from '../../shared/types/gql-context.type';
import { LoginInput } from './inputs/login.input';
import { UserEntity } from '../account/entities/user.entity';

@Resolver()
export class SessionResolver {
  constructor(private readonly sessionService: SessionService) {}

  @Mutation(() => UserModel, { name: 'login' })
  async login(
    @Context() { req }: GqlContext,
    @Args('input') input: LoginInput,
  ): Promise<UserEntity> {
    return this.sessionService.login(req, input);
  }

  @Mutation(() => Boolean, { name: 'logout' })
  async logout(@Context() { req }: GqlContext): Promise<boolean> {
    return this.sessionService.logout(req);
  }
}
