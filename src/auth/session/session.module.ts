import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../account/entities/user.entity';
import { SessionResolver } from './session.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [SessionService, SessionResolver],
})
export class SessionModule {}
