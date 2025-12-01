import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import session from 'express-session';
import RedisStore from 'connect-redis';
import { RedisService } from './redis/redis.service';
import cookieParser from 'cookie-parser';
import { parseBoolean } from './shared/utils/parse-boolean.util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const redisService = app.get(RedisService);

  app.enableCors({
    origin: true,
    credentials: true,
  });

  app.use(
    session({
      secret: configService.getOrThrow<string>('SESSION_SECRET'),
      name: configService.getOrThrow<string>('SESSION_NAME'),
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: parseInt(
          configService.getOrThrow<string>('SESSION_MAX_AGE'),
          10,
        ),
        httpOnly: parseBoolean(
          configService.getOrThrow<string>('SESSION_HTTP_ONLY'),
        ),
        secure: parseBoolean(
          configService.getOrThrow<string>('SESSION_SECURE'),
        ),
        sameSite: 'lax',
      },
      store: new RedisStore({
        client: redisService,
        prefix: configService.getOrThrow<string>('SESSION_FOLDER'),
      }),
    }),
  );

  app.use(cookieParser(configService.getOrThrow<string>('COOKIES_SECRET')));

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const port = configService.getOrThrow<number>('APP_PORT');
  await app.listen(port);
}
bootstrap();
