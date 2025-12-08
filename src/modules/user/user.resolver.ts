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
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Authorization } from '../auth/decorators/auth.decorator';
import { UpdateProfileInput } from './dto/update-profile.input';
import { Listing } from '../listing/entities/listing.entity';
import { FavoriteService } from '../favorites/favorite.service';
import { DataLoaderService } from '../dataloader/dataloader.service';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly favoriteService: FavoriteService,
    private readonly dataLoaderService: DataLoaderService,
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
    return this.userService.update(user.id, input);
  }

  @Query(() => User)
  async user(@Args('id') id: string): Promise<User> {
    return this.userService.findOneByIdOrThrow(id);
  }

  @ResolveField(() => [Listing])
  async listings(@Parent() user: User): Promise<Listing[]> {
    return this.dataLoaderService.listingsByUserIdLoader.load(user.id);
  }

  @ResolveField(() => String, { nullable: true })
  email(@Parent() user: User, @CurrentUser() me: User): string | null {
    return me?.id === user.id ? user.email : null;
  }

  @ResolveField(() => [Listing], { nullable: true })
  async favoriteListings(
    @Parent() user: User,
    @CurrentUser() me: User,
  ): Promise<Listing[] | null> {
    if (me?.id !== user.id) return null;
    return this.favoriteService.getUserFavorites(user.id);
  }
}
