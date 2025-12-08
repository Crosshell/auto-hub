import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { isDev, isProd } from '../shared/utils/is-env.util';

export function getTypeOrmConfig(
  configService: ConfigService,
): TypeOrmModuleOptions {
  return {
    type: 'postgres',
    host: configService.getOrThrow<string>('POSTGRES_HOST'),
    port: parseInt(configService.getOrThrow<string>('POSTGRES_PORT'), 10),
    username: configService.getOrThrow<string>('POSTGRES_USER'),
    password: configService.getOrThrow<string>('POSTGRES_PASSWORD'),
    database: configService.getOrThrow<string>('POSTGRES_DB'),
    autoLoadEntities: true,
    migrations: [__dirname + '/../migrations/*{.ts,.js}'],
    migrationsRun: isProd(configService),
    synchronize: isDev(configService),
    migrationsTableName: 'migrations',
    ssl: isProd(configService)
      ? {
          rejectUnauthorized: false,
        }
      : false,
  };
}
