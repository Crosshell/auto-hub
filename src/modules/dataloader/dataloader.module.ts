import { Module, Global } from '@nestjs/common';
import { DataLoaderService } from './dataloader.service';
import { UserModule } from '../user/user.module';
import { ListingModule } from '../listing/listing.module';
import { CatalogModule } from '../catalog/catalog.module';

@Global()
@Module({
  imports: [UserModule, ListingModule, CatalogModule],
  providers: [DataLoaderService],
  exports: [DataLoaderService],
})
export class DataLoaderModule {}
