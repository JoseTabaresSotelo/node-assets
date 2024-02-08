import { runQuery } from '@api/db/utils';
import { FastifyInstance, FastifyRequest } from 'fastify';

const getAllShippers = 'SELECT * FROM public.shippers ORDER BY shipper_id ASC';
const getShipperById = 'SELECT * FROM public.shippers WHERE shipper_id = $1';
const addShipper = 'INSERT INTO public.shippers(company_name, phone) VALUES ($1, $2) RETURNING *;';
const updateShipper = `UPDATE public.shippers SET (company_name, phone) = ($2, $3) WHERE shipper_id = $1 RETURNING *;`;
const deleteShipper = `DELETE FROM public.shippers WHERE shipper_id = $1 RETURNING *;`;

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

  fastify.post(
    '/shippers',
    async (
      request: FastifyRequest<{
        Body: { company_name: string; phone: string };
      }>
    ) => {
      const { company_name, phone } = request.body;

      const { rows } = await runQuery(fastify.pg, addShipper, [
        company_name,
        phone,
      ]);
      return rows;
    }
  );

  fastify.put(
    '/shippers/:id',
    async (
      request: FastifyRequest<{
        Body: { company_name: string; phone: string };
        Params: { id: string };
      }>
    ) => {
      const { company_name, phone } = request.body;
      const id = request.params.id;

      const { rows } = await runQuery(fastify.pg, updateShipper, [
        id,
        company_name,
        phone,
      ]);

      return rows;
    }
  );

  fastify.delete(
    '/shippers/:id',
    async (request: FastifyRequest<{ Params: { id: string } }>) => {
      const id = request.params.id;

      const { rows } = await runQuery(fastify.pg, deleteShipper, [id]);
      return rows;
    }
  );
};

export default shippers;
