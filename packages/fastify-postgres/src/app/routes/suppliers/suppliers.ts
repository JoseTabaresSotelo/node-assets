import { client } from '../../plugins/db';
import { FastifyInstance, FastifyRequest } from 'fastify';

const getAllSuppliers = 'SELECT * FROM public.suppliers ORDER BY supplier_id ASC';
const getSupplierById = 'SELECT * from public.suppliers WHERE supplier_id = $1';

const suppliers = async (fastify: FastifyInstance) => {
  fastify.get('/suppliers', (req, res) => {
    client.query(getAllSuppliers, (errors, result) => {
      if(errors) res.status(500).send({messageError: errors})
      res.status(200).send(result.rows);
    })
  });

  fastify.get(
    '/suppliers/:id',
    (request: FastifyRequest<{ Params: { id: string } }>, res) => {
      const { id } = request.params;
      client.query(getSupplierById, [id], (errors, result) => {
        if(errors) res.status(500).send({messageError: errors})
        res.status(200).send(result.rows);
      })
    }
  );
};

export default suppliers;
