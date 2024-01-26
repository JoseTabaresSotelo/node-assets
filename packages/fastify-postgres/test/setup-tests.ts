import * as dotenv from 'dotenv';
import ''

dotenv.config({ path: './env' });

const originalEnv = process.env
originalEnv.POSTGRES_USER= 'postgres'
originalEnv.POSTGRES_DB_NAME= 'northwind'
originalEnv.POSTGRES_PASSWORD= 'admin'