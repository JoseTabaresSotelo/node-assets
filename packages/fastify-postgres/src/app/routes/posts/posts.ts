import { runQuery } from '@api/db/utils';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

const getAllPosts = 'SELECT * from posts_sample';
const getPostById = 'SELECT * from posts_sample WHERE id = $1';
const createPostWithUserEmail = `INSERT INTO posts_sample (title, content, user_id)
VALUES ($1, $2, (
  SELECT id FROM users_sample WHERE email = $3 
)) RETURNING * ;`;

const posts = async (fastify: FastifyInstance) => {
  fastify.get('/posts', async () => {
    const { rows } = await runQuery(fastify.pg, getAllPosts);
    return rows;
  });

  fastify.get(
    '/posts/:id',
    async (request: FastifyRequest<{ Params: { id: string } }>) => {
      const { id } = request.params;
      const { rows } = await runQuery(fastify.pg, getPostById, [id]);
      return rows;
    }
  );

  fastify.post(
    '/posts',
    async (
      request: FastifyRequest<{
        Body: { title: string; content: string; author_email: string };
      }>
    ) => {
      const { title, content, author_email } = request.body;
      const { rows } = await runQuery(fastify.pg, createPostWithUserEmail, [
        title,
        content,
        author_email,
      ]);
      return rows;
    }
  );
};

export default posts;
