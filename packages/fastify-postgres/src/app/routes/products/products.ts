import { client } from '../../plugins/db';
import { FastifyInstance, FastifyRequest } from 'fastify';

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

export const products = async (fastify: FastifyInstance) => {
  fastify.get('/products', (req, res) => {
    client.query(getAllProducts, (errors, result) => {
      if(errors) res.status(500).send({mesageError: errors})
      res.status(200).send(result.rows);
    })
  });

  fastify.get('/products/:id', (req: FastifyRequest<{ Params: { id: string } }>, res) => {
    const { id } = req.params;
    client.query(getProductById, [id], (errors, result) => {
      if(errors) res.status(500).send({mesageError: errors})
      res.status(200).send(result.rows);
    })
  })

  fastify.post(
    '/products',
     (
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
      }>, res
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
       client.query(addUser, [
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
      ], (errors) => {
        if(errors) res.status(500).send({mesageError: errors})
        res.status(200).send({message: 'Post created'});
      })
      
    }
  );
};

