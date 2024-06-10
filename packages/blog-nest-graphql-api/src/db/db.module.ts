import { Module } from '@nestjs/common';
import { NestPgpromiseModule } from 'nestjs-pgpromise';
import * as dotenv from 'dotenv';

dotenv.config({ path: './env' });

@Module({
  imports: [
    NestPgpromiseModule.register({
      isGlobal: true,
      connection: {
        host: '127.0.0.1',
        port: 5432,
        database: 'blog',
        user: `postgres`,
        password: `pass`,
      },
    }),
  ],
})
export class DbModule {}

/**
    Environment variables sample in .env file
    DATABASE_HOST=127.0.0.1
    DATABASE_NAME=blog
    DATABASE_PORT=5432
    DATABASE_USER=postgres
    DATABASE_PASS=password
*/