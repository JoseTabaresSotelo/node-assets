import { runQuery } from '@api/db/utils';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

const getAllCustomers =
  'SELECT * FROM public.customers ORDER BY customer_id ASC';
const getCustomersById =
  'SELECT * FROM public.customers WHERE customer_id = $1';
const addCustomer = `INSERT INTO public.customers(company_name, contact_name, contact_title, address, city, region, postal_code, country, phone, fax)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *;`;
const updateCustomer = `UPDATE public.customers SET (company_name, contact_name, contact_title, address, city, region, postal_code, country, phone, fax) 
    = ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) WHERE customer_id = $11 RETURNING *;`;
const deleteCustomer = `DELETE FROM public.customers WHERE customer_id = $1 RETURNING *;`;

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

  fastify.post(
    '/customers',
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
      } = request.body;

      const { rows } = await runQuery(fastify.pg, addCustomer, [
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
      ]);
      return rows;
    }
  );

  fastify.put(
    '/customers/:id',
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
      } = request.body;
      const id = request.params.id;

      const { rows } = await runQuery(fastify.pg, updateCustomer, [
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
        id,
      ]);

      return rows;
    }
  );

  fastify.delete(
    '/customers/:id',
    async (request: FastifyRequest<{ Params: { id: string } }>) => {
      const id = request.params.id;

      const { rows } = await runQuery(fastify.pg, deleteCustomer, [id]);
      return rows;
    }
  );
};

export default customers;
