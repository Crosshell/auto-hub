import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisModule } from './modules/redis/redis.module';
import { IS_DEV_ENV } from './shared/utils/is-env.util';
import { getGraphQLConfig } from './config/graphql.config';
import { getTypeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './modules/auth/auth.module';
import { EmailModule } from './modules/email/email.module';
import { ListingModule } from './modules/listing/listing.module';
import { CatalogModule } from './modules/catalog/catalog.module';
import { FavoriteModule } from './modules/favorites/favorites.module';
import { UploadModule } from './modules/upload/upload.module';
import { HealthModule } from './modules/health/health.module';
import { DataLoaderModule } from './modules/dataloader/dataloader.module';

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
    CatalogModule,
    FavoriteModule,
    UploadModule,
    DataLoaderModule,
    HealthModule,
  ],
})
export class AppModule {}
