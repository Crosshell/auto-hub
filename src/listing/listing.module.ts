import { forwardRef, Module } from '@nestjs/common';
import { ListingService } from './listing.service';
import { ListingResolver } from './listing.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Listing } from './entities/listing.entity';
import { AuthModule } from '../auth/auth.module';
import { CarModule } from '../car/car.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([Listing]),
    CarModule,
  ],
  providers: [ListingService, ListingResolver],
  exports: [ListingService],
})
export class ListingModule {}
