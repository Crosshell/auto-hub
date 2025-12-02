import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { RegisterInput } from './dto/register.input';
import { AuthService } from './auth.service';
import { User } from '../user/entities/user.entity';
import { Authorization } from './decorators/auth.decorator';
import { CurrentUser } from './decorators/current-user.decorator';
import { ChangePasswordInput } from './dto/change-password.input';
import { ChangeEmailInput } from '../user/dto/change-email.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Boolean)
  async register(@Args('input') input: RegisterInput) {
    return this.authService.register(input);
  }

  @Mutation(() => Boolean)
  async verifyEmail(@Args('token') token: string) {
    return this.authService.verifyEmail(token);
  }

  @Authorization()
  @Mutation(() => Boolean)
  async changePassword(
    @CurrentUser() user: User,
    @Args('input') input: ChangePasswordInput,
  ): Promise<boolean> {
    return this.authService.changePassword(user.id, input);
  }

  @Authorization()
  @Mutation(() => Boolean)
  async changeEmail(
    @CurrentUser() user: User,
    @Args('input') input: ChangeEmailInput,
  ): Promise<boolean> {
    return this.authService.requestEmailChange(user.id, input.newEmail);
  }

  @Mutation(() => Boolean)
  async verifyNewEmail(@Args('token') token: string): Promise<boolean> {
    return this.authService.verifyNewEmail(token);
  }
}
