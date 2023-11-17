import { runQuery } from '@api/db/utils';
import { FastifyInstance, FastifyRequest } from 'fastify';

const getAllStates = 'SELECT * FROM public.us_states ORDER BY state_name ASC';
const getStateByCode = 'SELECT * FROM public.us_states WHERE state_abbr = $1';

const usStates = async (fastify: FastifyInstance) => {
  fastify.get('/states', async () => {
    const { rows } = await runQuery(fastify.pg, getAllStates);
    return rows;
  });

  fastify.get(
    '/states/:abbreviation',
    async (request: FastifyRequest<{ Params: { abbreviation: string } }>) => {
      const { abbreviation } = request.params;
      const { rows } = await runQuery(fastify.pg, getStateByCode, [abbreviation]);
      return rows;
    }
  );
};

export default usStates;