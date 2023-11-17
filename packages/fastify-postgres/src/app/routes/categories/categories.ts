import { runQuery } from '@api/db/utils';
import { FastifyInstance, FastifyRequest } from 'fastify';

const getAllCategories = 'SELECT * FROM public.categories ORDER BY category_id ASC';
const getCategoryById = 'SELECT * from public.categories WHERE category_id = $1';

const categories = async (fastify: FastifyInstance) => {
  fastify.get('/categories', async () => {
    const { rows } = await runQuery(fastify.pg, getAllCategories);
    return rows;
  });

  fastify.get(
    '/categories/:id',
    async (request: FastifyRequest<{ Params: { id: string } }>) => {
      const { id } = request.params;
      const { rows } = await runQuery(fastify.pg, getCategoryById, [id]);
      return rows;
    }
  );
};

export default categories;