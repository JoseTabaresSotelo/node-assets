import { runQuery } from '@api/db/utils';
import { client } from '../../plugins/db';
import { FastifyInstance, FastifyRequest } from 'fastify';

const getAllEmployees = 'SELECT * FROM public.employees ORDER BY employee_id ASC';
const getEmployeeById = 'SELECT * from public.employees WHERE employee_id = $1';

export const employees = async (fastify: FastifyInstance) => {

  /**
   * Get all employees
   */
  fastify.get('/employees', (req, res) => {
    client.query(getAllEmployees, (errors, result) => {
      if(errors) res.status(500).send({message: errors})
      res.status(200).send(result.rows);
    })
  });

  /**
   * Get an employees by id
   */
  fastify.get(
    '/employees/:id',
     (request: FastifyRequest<{ Params: { id: string } }>, res) => {
      const { id } = request.params;
      client.query(getEmployeeById, [id], (errors, result) => {
        if(errors) res.status(500).send({message: errors})
        res.status(200).send(result.rows);
      })
    }
  );
};

