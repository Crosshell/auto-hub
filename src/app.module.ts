import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisModule } from './redis/redis.module';
import { IS_DEV_ENV } from '@common/utils/is-dev.util';
import { getGraphQLConfig } from './config/graphql.config';
import { getTypeOrmConfig } from './config/typeorm.config';
import { AccountModule } from './auth/account/account.module';
import { SessionModule } from './auth/session/session.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: !IS_DEV_ENV,
      isGlobal: true,
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: getGraphQLConfig,
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getTypeOrmConfig,
      inject: [ConfigService],
    }),
    AccountModule,
    SessionModule,
    RedisModule,
  ],
})
export class AppModule {}
