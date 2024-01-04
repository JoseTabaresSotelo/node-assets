import { client } from '../../plugins/db';
import { FastifyInstance, FastifyRequest } from 'fastify';

const getAllCustomers = 'SELECT * FROM public.customers ORDER BY customer_id ASC';
const getCustomersById = 'SELECT * FROM public.customers WHERE customer_id = $1';

export const customers = async (fastify: FastifyInstance) => {

  /**
   * Get all customers
   */
  fastify.get('/customers', (req, res) => {
    client.query(getAllCustomers, (errors, result) => {
      if(errors) res.status(500).send({message: errors})
      res.status(200).send(result.rows)
    })
  });

  /**
   * Get a customer by customerId
   */
  fastify.get(
    '/customers/:id',
     (request: FastifyRequest<{ Params: { id: string } }>, res) => {
      const { id } = request.params;
      client.query(getCustomersById, [id], (errors, result) => {
        if(errors) res.status(500).send({message: errors})
        res.status(200).send(result.rows)
      })
    }
  );
};

