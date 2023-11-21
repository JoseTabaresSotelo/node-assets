import { runQuery } from '@api/db/utils';
import { FastifyInstance, FastifyRequest } from 'fastify';

const territoriesQuery = `
    SELECT 
        t.territory_id,
        t.territory_description,
        r.region_description
    FROM public.territories AS t
    INNER JOIN public.region AS r ON t.region_id = r.region_id`;
const getAllTerritories = `${territoriesQuery} ORDER BY t.territory_id ASC`;
const getTerritoryById = `${territoriesQuery} WHERE territory_id = $1`;

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