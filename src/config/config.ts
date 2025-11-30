import * as process from 'node:process';

export default () => ({
  port: (process.env.PORT && parseInt(process.env.PORT, 10)) ?? 3000,

  postgres: {
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    db: process.env.POSTGRES_DB,
    url: process.env.DATABASE_URL,
  },

  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },

  session: {
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge:
        process.env.SESSION_COOKIE_MAX_AGE &&
        parseInt(process.env.SESSION_COOKIE_MAX_AGE, 10),
      httpOnly: process.env.SESSION_COOKIE_HTTP_ONLY === 'true',
      secure: process.env.NODE_ENV === 'production',
    },
  },
});
