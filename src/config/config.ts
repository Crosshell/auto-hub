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
});
