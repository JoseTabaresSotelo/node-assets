import { app } from '../../app';
import Fastify, { FastifyInstance } from 'fastify';

describe('GET /states should return a correct status code', () => {
  let server: FastifyInstance;

  beforeEach(async () => {
    server = Fastify();
    server.register(app);
  });

  afterEach(async () => {
    await server.close();
    server = null;
  });

  it('states', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/api/states',
    });
    expect(response.statusCode).toEqual(200);
    expect(response.json().data).toBeTruthy();
  });

  it('states by id', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/api/states/CA',
    });

    expect(response.statusCode).toEqual(200);
    expect(response.json().data).toHaveLength(1);
  });

  it('states by id - error', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/api/states/CA2222',
    });

    expect(response.statusCode).toEqual(200);
    expect(response.json().data).toHaveLength(0);
  });
});
