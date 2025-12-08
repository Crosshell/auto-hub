import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { ConfigService } from '@nestjs/config';
import { isProd } from '../../shared/utils/is-env.util';

@Injectable()
export class RedisService extends Redis {
  constructor(private readonly configService: ConfigService) {
    super(configService.getOrThrow<string>('REDIS_URL'), {
      connectTimeout: 10000,
      tls: isProd(configService) ? {} : undefined,
    });
  }
}
