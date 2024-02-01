import * as dotenv from 'dotenv';
import ''

dotenv.config({ path: './env' });

const originalEnv = process.env
originalEnv.DB_CONN_STRING='postgres://postgres:admin@localhost:5432/northwind'
