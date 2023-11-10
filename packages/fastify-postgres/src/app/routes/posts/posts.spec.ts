import Fastify, { FastifyInstance } from 'fastify';
import  posts  from './posts';

describe('GET /', () => {
  let server: FastifyInstance;

  beforeEach(() => {
    server = Fastify();
    server.register(posts);
  });

  it('should return all posts', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/posts',
    });

    expect(response.json()).toEqual({ message: 'Hello API' });
  });

  it('return 200 in /ping get route', async () => {
      const res = await server.inject({
        method: 'GET',
        path: '/posts',
      });
      expect(res.statusCode).toBe(200);
    });
});