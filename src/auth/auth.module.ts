import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { UserService } from './user/user.service';
import { UserResolver } from './user/user.resolver';
import { SessionService } from './session/session.service';
import { SessionResolver } from './session/session.resolver';
import { SessionGuard } from './guards/session.guard';
import { RegistrationService } from './registration/registration.service';
import { RegistrationResolver } from './registration/registration.resolver';
import { ListingModule } from '../listing/listing.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => ListingModule)],
  providers: [
    UserService,
    UserResolver,
    SessionService,
    SessionResolver,
    SessionGuard,
    RegistrationService,
    RegistrationResolver,
  ],
  exports: [SessionGuard, TypeOrmModule.forFeature([User]), UserService],
})
export class AuthModule {}
