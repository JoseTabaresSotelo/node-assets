import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import pg from '@fastify/postgres';
import 'dotenv/config';
import { Client } from 'pg'

const POSTGRES_USER: string = process.env.POSTGRES_USER;
const POSTGRES_DB_NAME: string = process.env.POSTGRES_DB_NAME;
const POSTGRES_PASSWORD: string = process.env.POSTGRES_PASSWORD;
const POSTGRES_HOST = '127.0.0.1';
const POSTRES_PORT = 5432


/**
 * This plugins adds some utilities to @fastify/postgress
 *
 */

export default fp(async function (fastify: FastifyInstance) {
  try {
    fastify.register(pg, {
      connectionString: `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@localhost:5432/${process.env.POSTGRES_DB_NAME}`,
    });
  } catch (error) {
    console.log("SATABASE ERROR: ", error);
  }
});

export const client = new Client({
  user: POSTGRES_USER,
  host: POSTGRES_HOST,
  database: POSTGRES_DB_NAME,
  password: POSTGRES_PASSWORD,
  port: POSTRES_PORT
})
client.connect()
