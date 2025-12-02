import { forwardRef, Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { SessionGuard } from '../auth/guards/session.guard';
import { ListingModule } from '../listing/listing.module';
import { FavoriteModule } from '../favorites/favorites.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => ListingModule),
    forwardRef(() => FavoriteModule),
  ],
  providers: [UserResolver, UserService, SessionGuard],
  exports: [UserService],
})
export class UserModule {}
