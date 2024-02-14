import { runQuery } from '@api/db/utils';
import { FastifyInstance, FastifyRequest } from 'fastify';

const getAllPosts = 'SELECT * from posts_sample';
const getPostById = 'SELECT * from posts_sample WHERE id = $1';
const createPostWithUserEmail = `INSERT INTO posts_sample (title, content, user_id)
VALUES ($1, $2, (
  SELECT id FROM users_sample WHERE email = $3 
)) RETURNING * ;`;
const updatePost = `UPDATE public.posts_sample SET(title, content, user_id) = ($2, $3, (
  SELECT id FROM users_sample WHERE email = $4 
)) WHERE id = $1 RETURNING *;`;
const deletePost = `DELETE FROM public.posts_sample WHERE id = $1 RETURNING *;`;

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

  fastify.put(
    '/posts/:id',
     async (
      request: FastifyRequest<{
        Body: { title: string; content: string; author_email: string };
        Params: { id: string };
      }>
    ) => {
      const { title, content, author_email } = request.body;
      const id = request.params.id;

      const { rows } = await runQuery(fastify.pg, updatePost, [
        id, title, content, author_email 
      ]);

      return rows;
    }
  );

  fastify.delete(
    '/posts/:id',
    async (request: FastifyRequest<{ Params: { id: string } }>) => {
      const id = request.params.id;

      const { rows } = await runQuery(fastify.pg, deletePost, [id]);
      return rows;
    }
  );
};

export default posts;
