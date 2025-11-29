import { Resolver, Query } from '@nestjs/graphql';
import { Listing } from './entities/listing.entity';

@Resolver(() => Listing)
export class ListingResolver {
  @Query(() => Listing)
  listing() {
    return { id: '1', title: 'test', price: 100, status: 'active' };
  }
}
