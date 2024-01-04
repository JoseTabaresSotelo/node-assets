import { client } from '../../plugins/db';
import { FastifyInstance, FastifyRequest } from 'fastify';

  /**
   * Esta tabla no existe
   */

const getAllPosts = 'SELECT * from posts_sample';
const getPostById = 'SELECT * from posts_sample WHERE id = $1';
const createPostWithUserEmail = `INSERT INTO posts_sample (title, content, user_id)
VALUES ($1, $2, (
  SELECT id FROM users_sample WHERE email = $3 
)) RETURNING * ;`;

export const posts = async (fastify: FastifyInstance) => {
  fastify.get('/posts', (req, res) => {
    client.query(getAllPosts, (errors, result) => {
      if(errors) res.status(500).send({message: errors})
      res.status(200).send(result)
    })
  });

  fastify.get(
    '/posts/:id',
     (request: FastifyRequest<{ Params: { id: string } }>, res) => {
      const { id } = request.params;
      client.query(getPostById, [id], (errors, result) => {
        if(errors) res.status(500).send({message: errors})
        res.status(200).send(result.rows)
      })
    }
  );

  fastify.post(
    '/posts',
    async (
      request: FastifyRequest<{
        Body: { title: string; content: string; author_email: string };
      }>, res
    ) => {
      const { title, content, author_email } = request.body;
      client.query(createPostWithUserEmail, [
        title,
        content,
        author_email,
      ], (errors, result) => {
        if(errors) res.status(500).send({message: errors})
        res.status(200).send(result.rows)
      })
    }
  );
};

