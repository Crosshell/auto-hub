import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ListingModule } from './listing/listing.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from './redis/redis.module';
import { UserModule } from './user/user.module';
import config from './config/config';
import { GraphQLContext } from '@common/types/graphql-context.type';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: true,
      driver: ApolloDriver,
      context: ({ req, res }: GraphQLContext) => ({ req, res }),
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.getOrThrow<string>('postgres.host'),
        port: config.getOrThrow<number>('postgres.port'),
        username: config.getOrThrow<string>('postgres.user'),
        password: config.getOrThrow<string>('postgres.password'),
        database: config.getOrThrow<string>('postgres.db'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
    }),
    ListingModule,
    AuthModule,
    RedisModule,
    UserModule,
  ],
})
export class AppModule {}
