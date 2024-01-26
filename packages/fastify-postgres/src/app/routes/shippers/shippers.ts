import { client } from '../../plugins/db';
import { FastifyInstance, FastifyRequest } from 'fastify';

const getAllShippers = 'SELECT * FROM public.shippers ORDER BY shipper_id ASC';
const getShipperById = 'SELECT * FROM public.shippers WHERE shipper_id = $1';

const shippers = async (fastify: FastifyInstance) => {
  fastify.get('/shippers', (req, res) => {
    client.query(getAllShippers, (errors, result) => {
      if(errors) res.status(500).send({messageError: errors})
      res.status(200).send(result.rows);
    })
  });

  fastify.get(
    '/shippers/:id',
     (request: FastifyRequest<{ Params: { id: string } }>, res) => {
      const { id } = request.params;
      client.query(getShipperById, [id], (errors, result) => {
        if(errors) res.status(500).send({messageError: errors})
        res.status(200).send(result.rows);
      })

    }
  );
};

export default shippers;
