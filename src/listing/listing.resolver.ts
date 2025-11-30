import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Listing } from './entities/listing.entity';
import { ListingService } from './listing.service';
import { createListingInput } from './dto/create-listing.input';
import { ParseUUIDPipe } from '@nestjs/common';
import { ListingsArgs } from './dto/listings.args';

@Resolver(() => Listing)
export class ListingResolver {
  constructor(private service: ListingService) {}

  @Query(() => Listing)
  listing(@Args('id', ParseUUIDPipe) id: string): Promise<Listing> {
    return this.service.getListing(id);
  }

  @Query(() => [Listing])
  listings(@Args() args: ListingsArgs): Promise<Listing[]> {
    return this.service.getListings(args);
  }

  @Mutation(() => Listing)
  createListing(@Args('input') input: createListingInput): Promise<Listing> {
    return this.service.createListing(input);
  }

  @Mutation(() => Boolean)
  async deleteListing(@Args('id', ParseUUIDPipe) id: string): Promise<boolean> {
    await this.service.deleteListing(id);
    return true;
  }
}
