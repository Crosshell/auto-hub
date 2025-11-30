import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly service: UserService) {}

  @Query(() => User)
  @UseGuards(AuthGuard)
  me(@CurrentUser() user: User): User {
    return user;
  }

  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  async deleteMe(@CurrentUser() user: User): Promise<boolean> {
    await this.service.delete(user.id);
    return true;
  }

  @Mutation(() => User)
  @UseGuards(AuthGuard)
  async updateMe(
    @Args('input') input: UpdateUserInput,
    @CurrentUser() user: User,
  ): Promise<User> {
    return this.service.update(user.id, input);
  }
}
