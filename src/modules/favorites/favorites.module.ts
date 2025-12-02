import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListingModule } from '../listing/listing.module';
import { UserFavorite } from './entities/user-favorite.entity';
import { FavoriteResolver } from './favorite.resolver';
import { FavoriteService } from './favorite.service';
import { SessionGuard } from '../auth/guards/session.guard';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserFavorite]),
    ListingModule,
    forwardRef(() => UserModule),
  ],
  providers: [FavoriteService, FavoriteResolver, SessionGuard],
  exports: [FavoriteService],
})
export class FavoriteModule {}
