import { runQuery } from '@api/db/utils';
import { FastifyInstance, FastifyRequest } from 'fastify';

const getAllRegions = 'SELECT * FROM public.region ORDER BY region_id ASC;';
const getRegionById = 'SELECT * from public.region WHERE region_id = $1;';
const addRegion = 'INSERT INTO public.region(region_description) VALUES ($1) RETURNING *;';
const updateRegion = `UPDATE public.region SET region_description = $2 WHERE region_id = $1 RETURNING *;`
const deleteRegion = `DELETE FROM public.region WHERE region_id = $1 RETURNING *;`;

const region = async (fastify: FastifyInstance) => {
  fastify.get('/regions', async () => {
    const { rows } = await runQuery(fastify.pg, getAllRegions);
    return rows;
  });

  fastify.get(
    '/regions/:id',
    async (request: FastifyRequest<{ Params: { id: string } }>) => {
      const { id } = request.params;
      const { rows } = await runQuery(fastify.pg, getRegionById, [id]);
      const [row] = rows;

      return row;
    }
  );

  fastify.post(
    '/regions',
    async (
      request: FastifyRequest<{ Body: { regionDescription: string } }>
    ) => {
      const { regionDescription } = request.body;

      const { rows } = await runQuery(fastify.pg, addRegion, [
        regionDescription,
      ]);
      return rows;
    }
  );

  fastify.put(
    '/regions/:id',
    async (
      request: FastifyRequest<{
        Body: { regionDescription: string; regionId: string };
      }>
    ) => {
      const { regionDescription, regionId } = request.body;

      const { rows } = await runQuery(fastify.pg, updateRegion, [
        regionId,
        regionDescription,
      ]);

      return rows;
    }
  );

  fastify.delete(
    '/regions/:id',
    async (request: FastifyRequest<{ Params: { id: string } }>) => {
      const id = request.params.id;

      const { rows } = await runQuery(fastify.pg, deleteRegion, [id]);
      return rows;
    }
  );
};

export default region;
