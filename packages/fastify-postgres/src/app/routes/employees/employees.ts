import { runQuery } from '@api/db/utils';
import { FastifyInstance, FastifyRequest } from 'fastify';

const getAllEmployees = 'SELECT * FROM public.employees ORDER BY employee_id ASC';
const getEmployeeById = 'SELECT * from public.employees WHERE employee_id = $1';

const employees = async (fastify: FastifyInstance) => {
  fastify.get('/employees', async () => {
    const { rows } = await runQuery(fastify.pg, getAllEmployees);
    return rows;
  });

  fastify.get(
    '/employees/:id',
    async (request: FastifyRequest<{ Params: { id: string } }>) => {
      const { id } = request.params;
      const { rows } = await runQuery(fastify.pg, getEmployeeById, [id]);
      return rows;
    }
  );
};

export default employees;