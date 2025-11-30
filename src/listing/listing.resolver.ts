import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Listing } from './entities/listing.entity';
import { ListingService } from './listing.service';
import { createListingInput } from './dto/create-listing.input';
import { ParseUUIDPipe } from '@nestjs/common';
import { ListingsArgs } from './dto/listings.args';

@Resolver(() => Listing)
export class ListingResolver {
  constructor(private listingService: ListingService) {}

  @Query(() => Listing)
  listing(@Args('id', ParseUUIDPipe) id: string): Promise<Listing> {
    return this.listingService.getListing(id);
  }

  @Query(() => [Listing])
  listings(@Args() listingsArgs: ListingsArgs): Promise<Listing[]> {
    return this.listingService.getListings(listingsArgs);
  }

  @Mutation(() => Listing)
  createListing(
    @Args('createListingInput') createListingInput: createListingInput,
  ): Promise<Listing> {
    return this.listingService.createListing(createListingInput);
  }

  @Mutation(() => Boolean)
  async deleteListing(@Args('id', ParseUUIDPipe) id: string): Promise<boolean> {
    await this.listingService.deleteListing(id);
    return true;
  }
}
