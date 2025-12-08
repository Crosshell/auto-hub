import { forwardRef, Module } from '@nestjs/common';
import { ListingService } from './services/listing.service';
import { ListingResolver } from './resolvers/listing.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Listing } from './entities/listing.entity';
import { CatalogModule } from '../catalog/catalog.module';
import { UserModule } from '../user/user.module';
import { ListingPhoto } from './entities/listing-photo.entity';
import { ListingPhotoResolver } from './resolvers/listing-photo.resolver';
import { ListingPhotoService } from './services/listing-photo.service';

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
