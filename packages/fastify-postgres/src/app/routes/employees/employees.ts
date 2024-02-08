import { runQuery } from '@api/db/utils';
import { FastifyInstance, FastifyRequest } from 'fastify';

const getAllEmployees =
  'SELECT * FROM public.employees ORDER BY employee_id ASC';
const getEmployeeById = 'SELECT * from public.employees WHERE employee_id = $1';
const addCategory = `INSERT INTO public.employees(
    last_name,
    first_name,
    title,
    title_of_courtesy,
    birth_date,
    hire_date,
    address,
    city,
    region,
    postal_code,
    country,
    home_phone,
    extension
) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *;`;
const updateCategory = `UPDATE public.employees SET (
    last_name,
    first_name,
    title,
    title_of_courtesy,
    birth_date,
    hire_date,
    address,
    city,
    region,
    postal_code,
    country,
    home_phone,
    extension) 
    = ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) WHERE employee_id = $14 RETURNING *;`;
const deleteCategory = `DELETE FROM public.employees WHERE employee_id = $1 RETURNING *;`;

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
        Body: {
          lastName: string;
          firstName: string;
          title: string;
          titleOfCourtesy: string;
          birthDate: string;
          hireDate: string;
          address: string;
          city: string;
          region: string;
          postalCode: string;
          country: string;
          homePhone: string;
          extension: string;
        };
      }>
    ) => {
      const {
        lastName,
        firstName,
        title,
        titleOfCourtesy,
        birthDate,
        hireDate,
        address,
        city,
        region,
        postalCode,
        country,
        homePhone,
        extension,
      } = request.body;

      const { rows } = await runQuery(fastify.pg, addCategory, [
        lastName,
        firstName,
        title,
        titleOfCourtesy,
        birthDate,
        hireDate,
        address,
        city,
        region,
        postalCode,
        country,
        homePhone,
        extension,
      ]);
      return rows;
    }
  );

  fastify.put(
    '/employees/:id',
    async (
      request: FastifyRequest<{
        Body: {
          lastName: string;
          firstName: string;
          title: string;
          titleOfCourtesy: string;
          birthDate: string;
          hireDate: string;
          address: string;
          city: string;
          region: string;
          postalCode: string;
          country: string;
          homePhone: string;
          extension: string;
        };
        Params: { id: string };
      }>
    ) => {
      const {
        lastName,
        firstName,
        title,
        titleOfCourtesy,
        birthDate,
        hireDate,
        address,
        city,
        region,
        postalCode,
        country,
        homePhone,
        extension,
      } = request.body;
      const id = request.params.id;

      const { rows } = await runQuery(fastify.pg, updateCategory, [
        lastName,
        firstName,
        title,
        titleOfCourtesy,
        birthDate,
        hireDate,
        address,
        city,
        region,
        postalCode,
        country,
        homePhone,
        extension,
        id,
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
