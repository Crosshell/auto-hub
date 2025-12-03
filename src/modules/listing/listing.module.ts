import { forwardRef, Module } from '@nestjs/common';
import { ListingService } from './listing.service';
import { ListingResolver } from './listing.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Listing } from './entities/listing.entity';
import { CatalogModule } from '../catalog/catalog.module';
import { UserModule } from '../user/user.module';
import { ListingPhoto } from './entities/listing-photo.entity';
import { ListingPhotoResolver } from './listing-photo.resolver';
import { ListingPhotoService } from './listing-photo.service';

@Module({
  imports: [
    CatalogModule,
    forwardRef(() => UserModule),
    TypeOrmModule.forFeature([Listing, ListingPhoto]),
  ],
  providers: [
    ListingService,
    ListingResolver,
    ListingPhotoResolver,
    ListingPhotoService,
  ],
  exports: [ListingService, ListingPhotoService],
})
export class ListingModule {}
