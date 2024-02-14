import { runQuery } from '@api/db/utils';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

const ordersQuery = `
    SELECT 
        o.order_id,
        o.customer_id,
        c.company_name,
		c.contact_name,
        CONCAT(e.first_name, ' ', e.last_name) AS employee_name,
        o.order_date,
        o.required_date,
        o.shipped_date,
        o.ship_via
    FROM public.orders AS o
    INNER JOIN public.employees AS e ON o.employee_id = e.employee_id
    INNER JOIN public.customers AS c ON o.customer_id = c.customer_id`;
const getAllOrders = `${ordersQuery} ORDER BY order_id DESC`;
const getOrdersById = `${ordersQuery} WHERE order_id = $1`;
const createOrder = `INSERT INTO orders (
        customer_id,
        employee_id,
        order_date,
        required_date,
        shipped_date,
        ship_via,
        freight,
        ship_name,
        ship_address,
        ship_city,
        ship_region,
        ship_postal_code,
        ship_country
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING * ;`;
const updateOrder = `UPDATE public.orders SET (
        customer_id,
        employee_id,
        order_date,
        required_date,
        shipped_date,
        ship_via,
        freight,
        ship_name,
        ship_address,
        ship_city,
        ship_region,
        ship_postal_code,
        ship_country
    ) = ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) WHERE order_id = $14 RETURNING *;`;
const deleteOrder = `DELETE FROM public.orders WHERE order_id = $1 RETURNING *;`;

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

  fastify.post(
    '/orders',
    async (
      request: FastifyRequest<{
        Body: {
          customer_id: string;
          employee_id: number;
          order_date: string;
          required_date: string;
          shipped_date: string;
          ship_via: string;
          freight: number;
          ship_name: string;
          ship_address: string;
          ship_city: string;
          ship_region: string;
          ship_postal_code: string;
          ship_country: string;
        };
      }>
    ) => {
      const {
        customer_id,
        employee_id,
        order_date,
        required_date,
        shipped_date,
        ship_via,
        freight,
        ship_name,
        ship_address,
        ship_city,
        ship_region,
        ship_postal_code,
        ship_country,
      } = request.body;
      const { rows } = await runQuery(fastify.pg, createOrder, [
        customer_id,
        employee_id,
        order_date,
        required_date,
        shipped_date,
        ship_via,
        freight,
        ship_name,
        ship_address,
        ship_city,
        ship_region,
        ship_postal_code,
        ship_country,
      ]);
      return rows;
    }
  );

  fastify.put(
    '/orders/:id',
    async (
      request: FastifyRequest<{
        Body: {
          customer_id: string;
          employee_id: number;
          order_date: string;
          required_date: string;
          shipped_date: string;
          ship_via: string;
          freight: number;
          ship_name: string;
          ship_address: string;
          ship_city: string;
          ship_region: string;
          ship_postal_code: string;
          ship_country: string;
        };
        Params: { id: string };
      }>
    ) => {
      const {
        customer_id,
        employee_id,
        order_date,
        required_date,
        shipped_date,
        ship_via,
        freight,
        ship_name,
        ship_address,
        ship_city,
        ship_region,
        ship_postal_code,
        ship_country,
      } = request.body;
      const { id } = request.params;

      const { rows } = await runQuery(fastify.pg, updateOrder, [
        customer_id,
        employee_id,
        order_date,
        required_date,
        shipped_date,
        ship_via,
        freight,
        ship_name,
        ship_address,
        ship_city,
        ship_region,
        ship_postal_code,
        ship_country,
        id,
      ]);

      return rows;
    }
  );

  fastify.delete(
    '/orders/:id',
    async (request: FastifyRequest<{ Params: { id: string } }>) => {
      const id = request.params.id;

      const { rows } = await runQuery(fastify.pg, deleteOrder, [id]);
      return rows;
    }
  );
};

export default orders;
