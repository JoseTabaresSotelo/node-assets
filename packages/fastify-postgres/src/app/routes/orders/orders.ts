import { runQuery } from '@api/db/utils';
import { client } from '../../plugins/db';
import { FastifyInstance, FastifyRequest } from 'fastify';

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
        order_id,
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
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING * ;`;

const orders = async (fastify: FastifyInstance) => {
  fastify.get('/orders', (req, res) => {
    client.query(getAllOrders, (errors, result) => {
      if(errors) res.status(500).send({message: errors})
      res.status(200).send(result.rows)
    })
  });

  fastify.get(
    '/orders/:id',
     (request: FastifyRequest<{ Params: { id: string } }>, res) => {
      const { id } = request.params;
      client.query(getOrdersById, [id], (errors, result) => {
        if(errors) res.status(500).send({message: errors})
        res.status(200).send(result.rows)
      })
    }
  );

  fastify.post(
    '/orders',
    (
      request: FastifyRequest<{
        Body: {
          order_id: number;
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
      }>, res
    ) => {
      const {
        order_id,
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
      client.query(createOrder, [
        order_id,
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
      ], (errors) => {
        if(errors) res.status(500).send({message: errors})
        res.status(200).send({message: "Order created"})
      })
    }
  );
};

export default orders;
