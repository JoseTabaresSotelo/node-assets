import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import pg from '@fastify/postgres';

/** 
* This is Data Base connection using postgres; register method support the coneccion
* For local host use the follow environment variable DB_CONN_STRING
* Sample: DB_CONN_STRING=postgres://postgres:pass@127.0.0.1:5432/northwind
*
* @see https://github.com/fastify/fastify-postgres 
*
*/
export default fp(async function (fastify: FastifyInstance) {
  fastify.register(pg, {
    connectionString: process.env.DB_CONN_STRING,
  });
});
