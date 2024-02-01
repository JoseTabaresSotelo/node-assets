import { runQuery } from '@api/db/utils';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

const getAllCustomers = 'SELECT * FROM public.customers ORDER BY customer_id ASC';
const getCustomersById = 'SELECT * FROM public.customers WHERE customer_id = $1';

const customers = async (fastify: FastifyInstance) => {
  fastify.get('/customers', async () => {
    const { rows } = await runQuery(fastify.pg, getAllCustomers);
    return rows;
  });

  fastify.get(
    '/customers/:id',
    async (request: FastifyRequest<{ Params: { id: string } }>) => {
      const { id } = request.params;
      const { rows } = await runQuery(fastify.pg, getCustomersById, [id]);
      return rows;
    }
  );
};

export default customers;