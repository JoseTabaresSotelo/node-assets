import { runQuery } from '@api/db/utils';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

const getAllCategories = 'SELECT * FROM public.categories ORDER BY category_id ASC';

const categories = async (fastify: FastifyInstance) => {
  fastify.get('/categories', async () => {
    const { rows } = await runQuery(fastify.pg, getAllCategories);
    return rows;
  });
};

export default categories;