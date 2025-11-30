import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import session from 'express-session';
import { RedisStore } from 'connect-redis';
import { RedisService } from './redis/redis.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.getOrThrow<number>('port');

  const redisService = app.get(RedisService);

  app.use(
    session({
      store: new RedisStore({
        client: redisService.getClient(),
        prefix: 'session:',
      }),
      secret: configService.getOrThrow<string>('session.secret'),
      resave: false,
      saveUninitialized: false,
      cookie: configService.getOrThrow('session.cookie'),
    }),
  );

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
}
bootstrap();
