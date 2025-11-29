import { Module } from '@nestjs/common';
import { ListingResolver } from './listing.resolver';

@Module({
  providers: [ListingResolver],
})
export class ListingModule {}
