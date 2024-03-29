import { runQuery } from '@api/db/utils';
import { FastifyInstance, FastifyRequest } from 'fastify';

const getAllStates = 'SELECT * FROM public.us_states ORDER BY state_name ASC';
const getStateByCode = 'SELECT * FROM public.us_states WHERE state_abbr = $1';
const addState = 'INSERT INTO public.us_states(state_name, state_abbr, state_region) VALUES ($1, $2, $3) RETURNING *;';
const updateState = `UPDATE public.us_states SET (state_name, state_abbr, state_region) = ($2, $3, $4) WHERE state_id = $1 RETURNING *;;`;
const deleteState = `DELETE FROM public.us_states WHERE state_id = $1 RETURNING *;`;

const usStates = async (fastify: FastifyInstance) => {
  fastify.get('/states', async () => {
    const { rows } = await runQuery(fastify.pg, getAllStates);
    return rows;
  });

  fastify.get(
    '/states/abbreviation/:abbreviation',
    async (request: FastifyRequest<{ Params: { abbreviation: string } }>) => {
      const { abbreviation } = request.params;
      const { rows } = await runQuery(fastify.pg, getStateByCode, [
        abbreviation,
      ]);
      return rows;
    }
  );

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
