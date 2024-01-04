import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import pg from '@fastify/postgres';
import { Client } from 'pg'


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
  user: process.env.POSTGRES_USER,
  host: "127.0.0.1",
  database: process.env.POSTGRES_DB_NAME,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432
})
client.connect()
