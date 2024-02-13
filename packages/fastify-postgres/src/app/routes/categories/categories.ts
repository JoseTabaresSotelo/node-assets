import { runQuery } from '@api/db/utils';
import { FastifyInstance, FastifyRequest } from 'fastify';

/**
 * Using the fastify-postgres allows to use SQL Postgres queries, this ones are working on Postgres workbenches and consoles
 * Parameters in queries are expressed with `$1`, `$2` etc. This arguments are provided in runQuery method and passed in the query parameters
 *  @see https://www.postgresql.org/docs/current/queries.html
 *  @see https://www.postgresql.org/docs/current/sql-syntax-calling-funcs.html
 *  @see https://github.com/fastify/fastify-postgres
 */

const getAllCategories =
  'SELECT * FROM public.categories ORDER BY category_id ASC';
const getCategoryById =
  'SELECT * from public.categories WHERE category_id = $1';
const addCategory =
  'INSERT INTO public.region(region_description) VALUES ($1);';
const updateCategory = `UPDATE public.region SET region_description = $2 WHERE region_id = $1;`;
const deleteCategory = `DELETE FROM public.region WHERE region_id = $1;`;

/**
 * Creating fastify routes
 *  The route methods will configure the endpoints of your application. You have two ways to declare a route with Fastify: the shorthand method and the full declaration.
 *
 * @see https://fastify.dev/docs/latest/Reference/Routes/
 *
 */

const categories = async (fastify: FastifyInstance) => {
  fastify.get('/categories', async () => {
    const { rows } = await runQuery(fastify.pg, getAllCategories); 
    return rows;
  });



  fastify.get(
    '/categories/:id',
    async (request: FastifyRequest<{ Params: { id: string } }>) => {
      const { id } = request.params;
      const { rows } = await runQuery(fastify.pg, getCategoryById, [id]);
      return rows;
    }
  );

  fastify.post(
    '/categories',
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
    '/categories/:id',
    async (
      request: FastifyRequest<{
        Body: { categoryName: string; description: string; picture: string },
        Params: { id: string }
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
    '/categories/:id',
    async (request: FastifyRequest<{ Params: { id: string } }>) => {
      const id = request.params.id;

      const { rows } = await runQuery(fastify.pg, deleteCategory, [id]);
      return rows;
    }
  );
};

export default categories;
