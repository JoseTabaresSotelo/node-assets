import { Module } from '@nestjs/common';
import { NestPgpromiseModule } from 'nestjs-pgpromise';
import * as dotenv from 'dotenv';

dotenv.config();

// HOST=127.0.0.1
// NAME=blog
// PORT=5432
// USER=postgres
// PASS=pass


@Module({
  imports: [
    NestPgpromiseModule.register({
      isGlobal: true,
      connection: {
        host: '127.0.0.1',
        port: 5432,
        database: 'blog',
        user: 'postgres',
        password: 'pass',
      },
    }),
  ],
})
export class DbModule {}