import { Module } from '@nestjs/common';
import { AccountResolver } from './account.resolver';
import { AccountService } from './account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [AccountResolver, AccountService],
})
export class AccountModule {}
