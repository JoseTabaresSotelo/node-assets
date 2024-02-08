import { runQuery } from '@api/db/utils';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

const getAllUsers = 'SELECT * FROM users_sample;';
const addUser = `INSERT INTO users_sample (username, email) VALUES ($1, $2) RETURNING *;`;
const getUserId = `SELECT * FROM users_sample WHERE id=$1;`;
const updateUser = `UPDATE public.users_sample SET (username, email) = ($2, $3) WHERE id = $1 RETURNING *;`;
const deleteUser = `DELETE FROM public.users_sample WHERE id = $1 RETURNING *;`;

const users = async (fastify: FastifyInstance) => {
  fastify.get('/users', async () => {
    const { rows } = await runQuery(fastify.pg, getAllUsers);
    return rows;
  });

  fastify.post(
    '/users',
    async (
      request: FastifyRequest<{ Body: { username: string; email: string } }>
    ) => {
      const { username, email } = request.body;

      const { rows } = await runQuery(fastify.pg, addUser, [username, email]);
      return rows;
    }
  );

  fastify.get(
    '/users/:id',
    async (
      request: FastifyRequest<{ Params: { id: string } }>,
      replay: FastifyReply
    ) => {
      const { id } = request.params;
      const { rows } = await runQuery(fastify.pg, getUserId, [id]);

      if (rows.length === 0) {
        replay.status(404).send('User not found!');
      }

      return rows;
    }
  );

  fastify.put(
    '/users/:id',
    async (
      request: FastifyRequest<{
        Body: { username: string; email: string };
        Params: { id: string };
      }>
    ) => {
      const { username, email } = request.body;
      const id = request.params.id;

      const { rows } = await runQuery(fastify.pg, updateUser, [
        id,
        username,
        email,
      ]);

      return rows;
    }
  );

  fastify.delete(
    '/users/:id',
    async (request: FastifyRequest<{ Params: { id: string } }>) => {
      const id = request.params.id;

      const { rows } = await runQuery(fastify.pg, deleteUser, [id]);
      return rows;
    }
  );
};

export default users;
