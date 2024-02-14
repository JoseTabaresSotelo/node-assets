import * as dotenv from 'dotenv';

dotenv.config({ path: './env' });

const originalEnv = process.env;
originalEnv.DB_CONN_STRING = process.env.DB_CONN_STRING;
