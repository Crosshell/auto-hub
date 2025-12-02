import {
  Args,
  Mutation,
  Resolver,
  Query,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CurrentUser } from '../../shared/decorators/current-user.decorator';
import { Authorization } from '../../shared/decorators/auth.decorator';
import { UpdateProfileInput } from './dto/update-profile.input';
import { ChangePasswordInput } from '../registration/change-password.input';
import { ChangeEmailInput } from './dto/change-email.input';
import { Listing } from '../../listing/entities/listing.entity';
import { ListingService } from '../../listing/listing.service';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly listingService: ListingService,
  ) {}

  @Authorization()
  @Query(() => User)
  me(@CurrentUser() user: User): User {
    return user;
  }

  @Authorization()
  @Mutation(() => User)
  async updateProfile(
    @CurrentUser() user: User,
    @Args('input') input: UpdateProfileInput,
  ): Promise<User> {
    return this.userService.updateProfile(user.id, input);
  }

  @Authorization()
  @Mutation(() => Boolean)
  async changePassword(
    @CurrentUser() user: User,
    @Args('input') input: ChangePasswordInput,
  ): Promise<boolean> {
    return this.userService.changePassword(user.id, input);
  }

  @Authorization()
  @Mutation(() => Boolean)
  async changeEmail(
    @CurrentUser() user: User,
    @Args('input') input: ChangeEmailInput,
  ): Promise<boolean> {
    return this.userService.requestEmailChange(user.id, input.newEmail);
  }

  @Mutation(() => Boolean)
  async verifyNewEmail(@Args('token') token: string): Promise<boolean> {
    return this.userService.verifyNewEmail(token);
  }

  @Query(() => User)
  async user(@Args('id') id: string): Promise<User> {
    return this.userService.findOneById(id);
  }

  @ResolveField(() => [Listing])
  async listings(@Parent() user: User): Promise<Listing[]> {
    return this.listingService.findByUserId(user.id);
  }
}
