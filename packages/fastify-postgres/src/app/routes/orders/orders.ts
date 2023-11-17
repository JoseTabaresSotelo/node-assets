import { runQuery } from '@api/db/utils';
import { FastifyInstance, FastifyRequest } from 'fastify';

const getAllOrders = 'SELECT * FROM public.orders ORDER BY order_id DESC';
const getOrdersById = 'SELECT * FROM public.orders WHERE order_id = $1';

const orders = async (fastify: FastifyInstance) => {
  fastify.get('/orders', async () => {
    const { rows } = await runQuery(fastify.pg, getAllOrders);
    return rows;
  });

  fastify.get(
    '/orders/:id',
    async (request: FastifyRequest<{ Params: { id: string } }>) => {
      const { id } = request.params;
      const { rows } = await runQuery(fastify.pg, getOrdersById, [id]);
      return rows;
    }
  );
};

export default orders;