import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionResolver } from './session.resolver';
import { SessionGuard } from './guards/session.guard';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { AuthResolver } from './auth.resolver';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [UserModule, EmailModule],
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
