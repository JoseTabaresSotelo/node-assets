import { client } from '../../plugins/db';
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

export const territories = async (fastify: FastifyInstance) => {
  fastify.get('/territories',  (req, res) => {
    client.query(getAllTerritories, (errors, result) => {
      if(errors) res.status(500).send({messageError: errors})
      res.status(200).send(result.rows);
    })
  });

  fastify.get(
    '/territories/:id',
     (request: FastifyRequest<{ Params: { id: string } }>, res) => {
      const { id } = request.params;
      client.query(getTerritoryById, [id], (errors, result) => {
        if(errors) res.status(500).send({messageError: errors})
        res.status(200).send(result.rows);
      })
    }
  );
};
