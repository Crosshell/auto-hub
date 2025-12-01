import { Module } from '@nestjs/common';
import { ListingService } from './listing.service';
import { ListingResolver } from './listing.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListingEntity } from './entities/listing.entity';
import { AuthModule } from '../auth/auth.module';
import { CarModule } from '../car/car.module';
import { LocationModule } from '../location/location.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([ListingEntity]),
    CarModule,
    LocationModule,
  ],
  providers: [ListingService, ListingResolver],
})
export class ListingModule {}
