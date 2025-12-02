import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Authorization } from '../auth/decorators/auth.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { CreateListingInput } from './dto/create-listing.input';
import { Listing } from './entities/listing.entity';
import { ListingService } from './listing.service';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { Car } from '../catalog/car/entities/car.entity';
import { CarService } from '../catalog/car/car.service';
import { UpdateListingInput } from './dto/update-listing.input';
import { ParseUUIDPipe } from '@nestjs/common';
import { ListingsFilterInput } from './dto/listings-filter.input';
import { PaginationInput } from '../../shared/dto/pagination.input';
import { ListingSortInput } from './dto/listings-sort.input';
import { ListingOwner } from './decorators/listing-owner.decorator';

@Resolver(() => Listing)
export class ListingResolver {
  constructor(
    private readonly listingService: ListingService,
    private readonly userService: UserService,
    private readonly carService: CarService,
  ) {}

  @Authorization()
  @Mutation(() => Listing)
  async createListing(
    @Args('input') input: CreateListingInput,
    @CurrentUser('id') userId: string,
  ): Promise<Listing> {
    return this.listingService.create(input, userId);
  }

  @Authorization()
  @ListingOwner()
  @Mutation(() => Listing)
  async updateListing(
    @Args('id', ParseUUIDPipe) id: string,
    @Args('input') input: UpdateListingInput,
  ): Promise<Listing> {
    return this.listingService.update(id, input);
  }

  @Query(() => [Listing])
  async listings(
    @Args('filter', { nullable: true }) filter: ListingsFilterInput,
    @Args('pagination', { nullable: true }) pagination: PaginationInput,
    @Args('sort', { nullable: true }) sort: ListingSortInput,
  ): Promise<Listing[]> {
    return this.listingService.search(filter, pagination, sort);
  }

  @Query(() => Listing, { nullable: true })
  async listing(@Args('id') id: string): Promise<Listing | null> {
    return this.listingService.findOneById(id);
  }

  @Authorization()
  @ListingOwner()
  @Mutation(() => Boolean)
  async deleteListing(@Args('id', ParseUUIDPipe) id: string): Promise<boolean> {
    await this.listingService.delete(id);
    return true;
  }

  @ResolveField(() => User)
  async owner(@Parent() listing: Listing): Promise<User> {
    return this.userService.findOneByIdOrThrow(listing.ownerId);
  }

  @ResolveField(() => Car)
  async car(@Parent() listing: Listing): Promise<Car> {
    return this.carService.findOneById(listing.carId);
  }
}
