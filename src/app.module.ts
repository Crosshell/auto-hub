import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisModule } from './redis/redis.module';
import { IS_DEV_ENV } from './shared/utils/is-dev.util';
import { getGraphQLConfig } from './config/graphql.config';
import { getTypeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
import { ListingModule } from './listing/listing.module';
import { CarModule } from './car/car.module';
import { CarModelModule } from './car-model/car-model.module';
import { CarMakeModule } from './car-make/car-make.module';

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
    AuthModule,
    RedisModule,
    EmailModule,
    ListingModule,
    CarModule,
    CarMakeModule,
    CarModelModule,
  ],
})
export class AppModule {}
