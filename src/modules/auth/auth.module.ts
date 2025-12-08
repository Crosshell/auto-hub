import { Module } from '@nestjs/common';
import { SessionService } from './services/session.service';
import { SessionResolver } from './resolvers/session.resolver';
import { SessionGuard } from './guards/session.guard';
import { AuthService } from './services/auth.service';
import { UserModule } from '../user/user.module';
import { AuthResolver } from './resolvers/auth.resolver';

@Module({
  imports: [UserModule],
  providers: [
    AuthService,
    AuthResolver,
    SessionService,
    SessionResolver,
    SessionGuard,
  ],
  exports: [SessionGuard],
})
export class AuthModule {}
