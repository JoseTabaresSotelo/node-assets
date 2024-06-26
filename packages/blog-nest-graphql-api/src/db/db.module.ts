import { Module } from '@nestjs/common';
import { NestPgpromiseModule } from 'nestjs-pgpromise';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    NestPgpromiseModule.register({
      isGlobal: true,
      connection: {
        host: process.env.HOST,
        port: Number(process.env.PORT),
        database: process.env.DATABASE,
        user: process.env.USER,
        password: process.env.PASS,
      },
    }),
  ],
})
export class DbModule {}