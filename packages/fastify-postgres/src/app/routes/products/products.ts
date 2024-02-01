import { runQuery } from '@api/db/utils';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

const getAllProducts = 'SELECT * from products';
const getProductById = 'SELECT * from products where product_id = $1';
const addUser = `INSERT INTO products (
        product_id,
        product_name,
        supplier_id,
        category_id,
        quantity_per_unit,
        unit_price,
        units_in_stock,
        units_on_order,
        reorder_level,
        discontinued
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *;`;

const users = async (fastify: FastifyInstance) => {
  fastify.get('/products', async () => {
    const { rows } = await runQuery(fastify.pg, getAllProducts);
    return rows;
  });


  fastify.get(
    '/products/:id',
    async (request: FastifyRequest<{ Params: { id: string } }>) => {
      const { id } = request.params;
      const { rows } = await runQuery(fastify.pg, getProductById, [id]);
      return rows;
    }
  );

  fastify.post(
    '/products',
    async (
      request: FastifyRequest<{
        Body: {
          product_id: number;
          product_name: string;
          supplier_id: number;
          category_id: number;
          quantity_per_unit: string;
          unit_price: number;
          units_in_stock: number;
          units_on_order: number;
          reorder_level: number;
          discontinued: number;
        };
      }>
    ) => {
      const {
        product_id,
        product_name,
        supplier_id,
        category_id,
        quantity_per_unit,
        unit_price,
        units_in_stock,
        units_on_order,
        reorder_level,
        discontinued,
      } = request.body;
      const { rows } = await runQuery(fastify.pg, addUser, [
        product_id,
        product_name,
        supplier_id,
        category_id,
        quantity_per_unit,
        unit_price,
        units_in_stock,
        units_on_order,
        reorder_level,
        discontinued,
      ]);
      return rows
    }
  );


};





export default users;
