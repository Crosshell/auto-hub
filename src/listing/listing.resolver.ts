import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Listing } from './entities/listing.entity';
import { ListingService } from './listing.service';
import { CreateListingInput } from './dto/create-listing.input';
import { ParseUUIDPipe } from '@nestjs/common';
import { ListingsArgs } from './dto/listings.args';

@Resolver(() => Listing)
export class ListingResolver {
  constructor(private readonly service: ListingService) {}

  @Query(() => Listing)
  listing(@Args('id', ParseUUIDPipe) id: string): Promise<Listing> {
    return this.service.findOne(id);
  }

  @Query(() => [Listing])
  listings(@Args() args: ListingsArgs): Promise<Listing[]> {
    return this.service.findMany(args);
  }

  @Mutation(() => Listing)
  createListing(@Args('input') input: CreateListingInput): Promise<Listing> {
    return this.service.create(input);
  }

  @Mutation(() => Boolean)
  async deleteListing(@Args('id', ParseUUIDPipe) id: string): Promise<boolean> {
    await this.service.delete(id);
    return true;
  }
}
