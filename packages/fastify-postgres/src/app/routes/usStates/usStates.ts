import { client } from '../../plugins/db';
import { FastifyInstance, FastifyRequest } from 'fastify';

const getAllStates = 'SELECT * FROM public.us_states ORDER BY state_name ASC';
const getStateByCode = 'SELECT * FROM public.us_states WHERE state_abbr = $1';

export const usStates = async (fastify: FastifyInstance) => {
  fastify.get('/states', (req, res) => {
    client.query(getAllStates, (errors, result) => {
      if(errors) res.status(500).send({messageError: errors})
      res.status(200).send(result.rows);
    })
  });

  fastify.get(
    '/states/:abbreviation',
     (request: FastifyRequest<{ Params: { abbreviation: string } }>, res) => {
      const { abbreviation } = request.params;
      client.query(getStateByCode, [abbreviation], (errors, result) => {
        if(errors) res.status(500).send({messageError: errors})
        res.status(200).send(result.rows);
      })
    }
  );
};
