import { FastifyInstance } from 'fastify';

const auth = async (fastify: FastifyInstance) => {
  fastify.get('/auth/refresh', async () => {
   
    return true;
  });
};

export default auth;