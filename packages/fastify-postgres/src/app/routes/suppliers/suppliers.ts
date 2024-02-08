import { runQuery } from '@api/db/utils';
import { FastifyInstance, FastifyRequest } from 'fastify';

const getAllSuppliers =
  'SELECT * FROM public.suppliers ORDER BY supplier_id ASC';
const getSupplierById = 'SELECT * from public.suppliers WHERE supplier_id = $1';
const addSupplier = `INSERT INTO public.suppliers(
    company_name,
    contact_name,
    contact_title,
    address,
    city,
    region,
    postal_code,
    country,
    phone,
    fax,
    homepage
) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *;`;
const updateSupplier = `UPDATE public.suppliers SET (
    company_name,
    contact_name,
    contact_title,
    address,
    city,
    region,
    postal_code,
    country,
    phone,
    fax,
    homepage
) = ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11); WHERE supplier_id = $12 RETURNING *;`;
const deleteSupplier = `DELETE FROM public.suppliers WHERE supplier_id = $1 RETURNING *;`;

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

  fastify.post(
    '/suppliers',
    async (
      request: FastifyRequest<{
        Body: {
          company_name: string;
          contact_name: string;
          contact_title: string;
          address: string;
          city: string;
          region: string;
          postal_code: string;
          country: string;
          phone: string;
          fax: string;
          homepage: string;
        };
      }>
    ) => {
      const {
        company_name,
        contact_name,
        contact_title,
        address,
        city,
        region,
        postal_code,
        country,
        phone,
        fax,
        homepage,
      } = request.body;

      const { rows } = await runQuery(fastify.pg, addSupplier, [
        company_name,
        contact_name,
        contact_title,
        address,
        city,
        region,
        postal_code,
        country,
        phone,
        fax,
        homepage,
      ]);
      return rows;
    }
  );

  fastify.put(
    '/suppliers/:id',
    async (
      request: FastifyRequest<{
        Body: {
          company_name: string;
          contact_name: string;
          contact_title: string;
          address: string;
          city: string;
          region: string;
          postal_code: string;
          country: string;
          phone: string;
          fax: string;
          homepage: string;
        };
        Params: { id: string };
      }>
    ) => {
      const {
        company_name,
        contact_name,
        contact_title,
        address,
        city,
        region,
        postal_code,
        country,
        phone,
        fax,
        homepage,
      } = request.body;
      const id = request.params.id;

      const { rows } = await runQuery(fastify.pg, updateSupplier, [
        company_name,
        contact_name,
        contact_title,
        address,
        city,
        region,
        postal_code,
        country,
        phone,
        fax,
        homepage,
        id,
      ]);

      return rows;
    }
  );

  fastify.delete(
    '/suppliers/:id',
    async (request: FastifyRequest<{ Params: { id: string } }>) => {
      const id = request.params.id;

      const { rows } = await runQuery(fastify.pg, deleteSupplier, [id]);
      return rows;
    }
  );
};

export default suppliers;
