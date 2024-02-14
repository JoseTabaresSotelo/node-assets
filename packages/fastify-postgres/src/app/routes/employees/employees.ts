import { runQuery } from '@api/db/utils';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

const getAllEmployees =
  'SELECT * FROM public.employees ORDER BY employee_id ASC';
const getEmployeeById = 'SELECT * from public.employees WHERE employee_id = $1';
const addCategory =
  'INSERT INTO public.region(region_description) VALUES ($1);';
const updateCategory = `UPDATE public.region SET region_description = $2 WHERE region_id = $1;`;
const deleteCategory = `DELETE FROM public.region WHERE region_id = $1;`;

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

  fastify.post(
    '/employees',
    async (
      request: FastifyRequest<{
        Body: { categoryName: string; description: string; picture: string };
      }>
    ) => {
      const { categoryName, description, picture } = request.body;

      const { rows } = await runQuery(fastify.pg, addCategory, [
        categoryName,
        description,
        picture,
      ]);
      return rows;
    }
  );

  fastify.put(
    '/employees/:id',
    async (
      request: FastifyRequest<{
        Body: { categoryName: string; description: string; picture: string };
        Params: { id: string };
      }>
    ) => {
      const { categoryName, description, picture } = request.body;
      const id = request.params.id;

      const { rows } = await runQuery(fastify.pg, updateCategory, [
        id,
        categoryName,
        description,
        picture,
      ]);

      return rows;
    }
  );

  fastify.delete(
    '/employees/:id',
    async (request: FastifyRequest<{ Params: { id: string } }>) => {
      const id = request.params.id;

      const { rows } = await runQuery(fastify.pg, deleteCategory, [id]);
      return rows;
    }
  );
};

export default employees;
