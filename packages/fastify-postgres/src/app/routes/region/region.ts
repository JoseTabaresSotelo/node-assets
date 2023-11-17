import { runQuery } from '@api/db/utils';
import { FastifyInstance, FastifyRequest } from 'fastify';

const getAllRegions = 'SELECT * FROM public.region ORDER BY region_id ASC';
const getRegionById = 'SELECT * from public.region WHERE region_id = $1';

const region = async (fastify: FastifyInstance) => {
  fastify.get('/region', async () => {
    const { rows } = await runQuery(fastify.pg, getAllRegions);
    return rows;
  });

  fastify.get(
    '/region/:id',
    async (request: FastifyRequest<{ Params: { id: string } }>) => {
      const { id } = request.params;
      const { rows } = await runQuery(fastify.pg, getRegionById, [id]);
      return rows;
    }
  );
};

export default region;