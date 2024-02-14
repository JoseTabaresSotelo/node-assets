import { runQuery } from '@api/db/utils';
import { FastifyInstance, FastifyRequest } from 'fastify';

const getAllStates = 'SELECT * FROM public.us_states ORDER BY state_name ASC';
const getStateByCode = 'SELECT * FROM public.us_states WHERE state_abbr = $1';
const addState = 'INSERT INTO public.region(region_description) VALUES ($1);';
const updateState = `UPDATE public.region SET region_description = $2 WHERE region_id = $1;`;
const deleteState = `DELETE FROM public.region WHERE region_id = $1;`;

const usStates = async (fastify: FastifyInstance) => {
  fastify.get('/states', async () => {
    const { rows } = await runQuery(fastify.pg, getAllStates);
    return rows;
  });

  fastify.get(
    '/states/:id',
    async (request: FastifyRequest<{ Params: { id: string } }>) => {
      const id = request.params.id;
      const { rows } = await runQuery(fastify.pg, getStateByCode, [id]);
      return rows;
    }
  );

  fastify.post(
    '/states',
    async (
      request: FastifyRequest<{
        Body: { stateName: string; stateAbbr: string; stateRegion: string };
      }>
    ) => {
      const { stateName, stateAbbr, stateRegion } = request.body;

      const { rows } = await runQuery(fastify.pg, addState, [
        stateName,
        stateAbbr,
        stateRegion,
      ]);
      return rows;
    }
  );

  fastify.put(
    '/states/:id',
    async (
      request: FastifyRequest<{
        Body: { stateName: string; stateAbbr: string; stateRegion: string };
        Params: { id: string };
      }>
    ) => {
      const { stateName, stateAbbr, stateRegion } = request.body;
      const id = request.params.id;

      const { rows } = await runQuery(fastify.pg, updateState, [
        id,
        stateName,
        stateAbbr,
        stateRegion,
      ]);

      return rows;
    }
  );

  fastify.delete(
    '/states/:id',
    async (request: FastifyRequest<{ Params: { id: string } }>) => {
      const id = request.params.id;

      const { rows } = await runQuery(fastify.pg, deleteState, [id]);
      return rows;
    }
  );
};

export default usStates;
