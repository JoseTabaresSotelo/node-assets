import { runQuery } from '@api/db/utils';
import { FastifyInstance, FastifyRequest } from 'fastify';

const getAllSuppliers = 'SELECT * FROM public.suppliers ORDER BY supplier_id ASC';
const getSupplierById = 'SELECT * from public.suppliers WHERE supplier_id = $1';

const suppliers = async (fastify: FastifyInstance) => {
  fastify.get('/suppliers', async () => {
    const { rows } = await runQuery(fastify.pg, getAllSuppliers);
    return rows;
  });

  fastify.get(
    '/suppliers/:id',
    async (request: FastifyRequest<{ Params: { id: string } }>) => {
      const { id } = request.params;
      const { rows } = await runQuery(fastify.pg, getSupplierById, [id]);
      return rows;
    }
  );
};

export default suppliers;