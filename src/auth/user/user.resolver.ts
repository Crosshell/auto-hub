import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { UserModel } from './dto/user.model';
import { CurrentUser } from '../../shared/decorators/current-user.decorator';
import { Authorization } from '../../shared/decorators/auth.decorator';
import { UpdateProfileInput } from './dto/update-profile.input';
import { ChangePasswordInput } from '../registration/change-password.input';
import { ChangeEmailInput } from './dto/change-email.input';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Authorization()
  @Query(() => UserModel)
  me(@CurrentUser() user: UserEntity): UserEntity {
    return user;
  }

  @Authorization()
  @Mutation(() => UserModel)
  async updateProfile(
    @CurrentUser() user: UserEntity,
    @Args('input') input: UpdateProfileInput,
  ): Promise<UserEntity> {
    return this.userService.updateProfile(user.id, input);
  }

  @Authorization()
  @Mutation(() => Boolean)
  async changePassword(
    @CurrentUser() user: UserEntity,
    @Args('input') input: ChangePasswordInput,
  ): Promise<boolean> {
    return this.userService.changePassword(user.id, input);
  }

  @Authorization()
  @Mutation(() => Boolean)
  async changeEmail(
    @CurrentUser() user: UserEntity,
    @Args('input') input: ChangeEmailInput,
  ): Promise<boolean> {
    return this.userService.requestEmailChange(user.id, input.newEmail);
  }

  @Mutation(() => Boolean)
  async verifyNewEmail(@Args('token') token: string): Promise<boolean> {
    return this.userService.verifyNewEmail(token);
  }
}
