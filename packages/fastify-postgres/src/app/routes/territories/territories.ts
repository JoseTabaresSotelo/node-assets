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
const addTerritory =
  'INSERT INTO public.region(region_description) VALUES ($1);';
const updateTerritory = `UPDATE public.region SET region_description = $2 WHERE region_id = $1;`;
const deleteTerritory = `DELETE FROM public.region WHERE region_id = $1;`;

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

  fastify.post(
    '/territories',
    async (
      request: FastifyRequest<{
        Body: { territoryDescription: string; regionId: string };
      }>
    ) => {
      const { territoryDescription, regionId } = request.body;

      const { rows } = await runQuery(fastify.pg, addTerritory, [
        territoryDescription,
        regionId,
      ]);
      return rows;
    }
  );

  fastify.put(
    '/territories/:id',
    async (
      request: FastifyRequest<{
        Body: { territoryDescription: string; regionId: string };
        Params: { id: string };
      }>
    ) => {
      const { territoryDescription, regionId } = request.body;
      const id = request.params.id;

      const { rows } = await runQuery(fastify.pg, updateTerritory, [
        id,
        territoryDescription,
        regionId,
      ]);

      return rows;
    }
  );

  fastify.delete(
    '/territories/:id',
    async (request: FastifyRequest<{ Params: { id: string } }>) => {
      const id = request.params.id;

      const { rows } = await runQuery(fastify.pg, deleteTerritory, [id]);
      return rows;
    }
  );
};

export default territories;
