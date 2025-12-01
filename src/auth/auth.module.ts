import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/entities/user.entity';
import { UserService } from './user/user.service';
import { UserResolver } from './user/user.resolver';
import { SessionService } from './session/session.service';
import { SessionResolver } from './session/session.resolver';
import { SessionGuard } from './guards/session.guard';
import { RegistrationService } from './registration/registration.service';
import { RegistrationResolver } from './registration/registration.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    UserService,
    UserResolver,
    SessionService,
    SessionResolver,
    SessionGuard,
    RegistrationService,
    RegistrationResolver,
  ],
})
export class AuthModule {}
