import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AccountService } from './account.service';
import { CreateUserInput } from './inputs/create-user.input';

@Resolver()
export class AccountResolver {
  constructor(private readonly accountService: AccountService) {}

  @Mutation(() => Boolean, { name: 'createUser' })
  async create(@Args('input') input: CreateUserInput): Promise<boolean> {
    return this.accountService.create(input);
  }
}
