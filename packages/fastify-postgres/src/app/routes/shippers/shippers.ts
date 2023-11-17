import { runQuery } from '@api/db/utils';
import { FastifyInstance, FastifyRequest } from 'fastify';

const getAllShippers = 'SELECT * FROM public.shippers ORDER BY shipper_id ASC';
const getShipperById = 'SELECT * FROM public.shippers WHERE shipper_id = $1';

const shippers = async (fastify: FastifyInstance) => {
  fastify.get('/shippers', async () => {
    const { rows } = await runQuery(fastify.pg, getAllShippers);
    return rows;
  });

  fastify.get(
    '/shippers/:id',
    async (request: FastifyRequest<{ Params: { id: string } }>) => {
      const { id } = request.params;
      const { rows } = await runQuery(fastify.pg, getShipperById, [id]);
      return rows;
    }
  );
};

export default shippers;