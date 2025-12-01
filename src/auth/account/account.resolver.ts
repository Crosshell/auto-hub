import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AccountService } from './account.service';
import { CreateUserInput } from './inputs/create-user.input';
import { UserEntity } from './entities/user.entity';
import { UserModel } from './models/user.model';
import { Authorized } from '../../shared/decorators/authorized.decorator';
import { Authorization } from '../../shared/decorators/auth.decorator';

@Resolver()
export class AccountResolver {
  constructor(private readonly accountService: AccountService) {}

  @Authorization()
  @Query(() => UserModel, { name: 'findAccount' })
  async me(@Authorized('id') id: string): Promise<UserEntity | null> {
    return this.accountService.me(id);
  }

  @Mutation(() => Boolean, { name: 'createUser' })
  async create(@Args('input') input: CreateUserInput): Promise<boolean> {
    return this.accountService.create(input);
  }
}
