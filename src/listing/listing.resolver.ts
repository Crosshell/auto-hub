import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Authorization } from '../shared/decorators/auth.decorator';
import { CurrentUser } from '../shared/decorators/current-user.decorator';
import { CreateListingInput } from './dto/create-listing.input';
import { Listing } from './entities/listing.entity';
import { ListingService } from './listing.service';
import { User } from '../auth/user/entities/user.entity';
import { UserService } from '../auth/user/user.service';
import { Car } from '../car/entities/car.entity';
import { CarService } from '../car/car.service';

@Resolver(() => Listing)
export class ListingResolver {
  constructor(
    private readonly listingService: ListingService,
    private readonly userService: UserService,
    private readonly carService: CarService,
  ) {}

  @Authorization()
  @Mutation(() => Listing)
  createListing(
    @Args('input') input: CreateListingInput,
    @CurrentUser('id') userId: string,
  ): Promise<Listing> {
    return this.listingService.create(input, userId);
  }

  @Query(() => [Listing])
  async listings(): Promise<Listing[]> {
    return this.listingService.findAll();
  }

  @Query(() => Listing, { nullable: true })
  async listing(@Args('id') id: string): Promise<Listing | null> {
    return this.listingService.findOneById(id);
  }

  @ResolveField(() => User)
  async owner(@Parent() listing: Listing): Promise<User> {
    return this.userService.findOneById(listing.ownerId);
  }

  @ResolveField(() => Car)
  async car(@Parent() listing: Listing): Promise<Car> {
    return this.carService.findOneById(listing.carId);
  }
}
