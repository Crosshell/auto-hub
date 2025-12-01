import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { UserEntity } from './entities/user.entity';
import { UserModel } from './dto/user.model';
import { CurrentUser } from '../../shared/decorators/current-user.decorator';
import { Authorization } from '../../shared/decorators/auth.decorator';

@Resolver()
export class UserResolver {
  constructor(private readonly accountService: UserService) {}

  @Authorization()
  @Query(() => UserModel)
  me(@CurrentUser() user: UserEntity): UserEntity | null {
    return user;
  }

  @Mutation(() => UserModel)
  async createUser(@Args('input') input: CreateUserInput): Promise<UserEntity> {
    return this.accountService.create(input);
  }
}
