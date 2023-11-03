import { FastifyInstance } from 'fastify';
import { resetDb } from '@api/db/utils';

const root = async (fastify: FastifyInstance) => {
  fastify.get('/reset', async () => {
    return await resetDb(fastify.pg);
  });
}

export default root;
