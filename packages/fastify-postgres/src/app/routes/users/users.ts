import { runQuery } from '@api/db/utils';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

const getAllUsers = 'SELECT * from users_sample';
const addUser = `INSERT INTO users_sample (username, email) VALUES ($1, $2) RETURNING *;`;

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
};

export default users;
