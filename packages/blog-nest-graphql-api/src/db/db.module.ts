import { Module } from '@nestjs/common';
import { NestPgpromiseModule } from 'nestjs-pgpromise';
import * as dotenv from 'dotenv';

dotenv.config({ path: './env' });

const originalEnv = process.env;

@Module({
  imports: [
    NestPgpromiseModule.register({
      isGlobal: true,
      connection: {
        host: originalEnv.HOST,
        port: Number(originalEnv.PORT),
        database: originalEnv.DATABASE,
        user: originalEnv.USER,
        password: originalEnv.PASS,
      },
    }),
  ],
})
export class DbModule {}