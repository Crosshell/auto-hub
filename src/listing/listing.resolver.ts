import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Listing } from './entities/listing.entity';
import { ListingService } from './listing.service';
import { CreateListingInput } from './inputs/create-listing.input';
import { ParseUUIDPipe } from '@nestjs/common';

@Resolver(() => Listing)
export class ListingResolver {
  constructor(private listingService: ListingService) {}

  @Query(() => Listing)
  listing(@Args('id', ParseUUIDPipe) id: string) {
    return this.listingService.getListing(id);
  }

  @Mutation(() => Listing)
  createListing(
    @Args('createListingInput') createListingInput: CreateListingInput,
  ): Promise<Listing> {
    return this.listingService.createListing(createListingInput);
  }
}
