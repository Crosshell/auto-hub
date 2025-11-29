import { Resolver, Query } from '@nestjs/graphql';
import { ListingType } from './listing.type';

@Resolver((of) => ListingType)
export class ListingResolver {
  @Query((returns) => ListingType)
  listing() {
    return { id: '1', title: 'test', price: 100, status: 'active' };
  }
}
