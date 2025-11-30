import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { FactoryProvider } from '@nestjs/common';

export const REDIS_CLIENT = 'RedisClient';

export const redisClientFactory: FactoryProvider<Redis> = {
  provide: REDIS_CLIENT,
  useFactory: (configService: ConfigService) => {
    const redis = new Redis({
      host: configService.getOrThrow<string>('redis.host'),
      port: configService.getOrThrow<number>('redis.port'),
      retryStrategy: (times) => {
        return Math.min(times * 50, 2000);
      },
      maxRetriesPerRequest: 3,
    });

    redis.on('error', (err: Error) => {
      console.error('Redis Client Error:', err.message);
    });

    return redis;
  },
  inject: [ConfigService],
};
