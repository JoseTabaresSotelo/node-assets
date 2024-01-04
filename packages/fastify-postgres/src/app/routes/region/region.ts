import { client } from '../../plugins/db';
import { FastifyInstance, FastifyRequest } from 'fastify';

const getAllRegions = 'SELECT * FROM public.region ORDER BY region_id ASC';
const getRegionById = 'SELECT * from public.region WHERE region_id = $1';

export const region = async (fastify: FastifyInstance) => {
  fastify.get('/region', (req, res) => {
    client.query(getAllRegions, (errors, result) => {
      if(errors) res.status(500).send({messageError: errors})
      res.status(200).send(result.rows);
    })
  });

  fastify.get(
    '/region/:id',
     (request: FastifyRequest<{ Params: { id: string } }>, res) => {
      const { id } = request.params;
      client.query(getRegionById, [id], (errors, result) => {
        if(errors) res.status(500).send({messageError: errors})
        res.status(200).send(result.rows);
      })
    }
  );
};

