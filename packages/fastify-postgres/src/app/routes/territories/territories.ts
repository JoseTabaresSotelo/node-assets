import { runQuery } from '@api/db/utils';
import { FastifyInstance, FastifyRequest } from 'fastify';

const getAllTerritories = 'SELECT * FROM public.territories ORDER BY territory_id ASC';
const getTerritoryById = 'SELECT * FROM public.territories WHERE territory_id = $1';

const territories = async (fastify: FastifyInstance) => {
  fastify.get('/territories', async () => {
    const { rows } = await runQuery(fastify.pg, getAllTerritories);
    return rows;
  });

  fastify.get(
    '/territories/:id',
    async (request: FastifyRequest<{ Params: { id: string } }>) => {
      const { id } = request.params;
      const { rows } = await runQuery(fastify.pg, getTerritoryById, [id]);
      return rows;
    }
  );
};

export default territories;