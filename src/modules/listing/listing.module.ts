import { forwardRef, Module } from '@nestjs/common';
import { ListingService } from './listing.service';
import { ListingResolver } from './listing.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Listing } from './entities/listing.entity';
import { CatalogModule } from '../catalog/catalog.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    CatalogModule,
    forwardRef(() => UserModule),
    TypeOrmModule.forFeature([Listing]),
  ],
  providers: [ListingService, ListingResolver],
  exports: [ListingService],
})
export class ListingModule {}
