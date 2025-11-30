import { Module } from '@nestjs/common';
import { ListingResolver } from './listing.resolver';
import { ListingService } from './listing.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Listing } from './entities/listing.entity';
import { ListingRepository } from './listing.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Listing])],
  providers: [ListingResolver, ListingService, ListingRepository],
})
export class ListingModule {}
