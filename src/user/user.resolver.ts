import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';

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
}
