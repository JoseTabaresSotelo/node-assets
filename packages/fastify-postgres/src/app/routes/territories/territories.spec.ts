import { app } from '../../app';
import Fastify, { FastifyInstance } from 'fastify';

describe('GET /territories should return a correct status code', () => {
  let server: FastifyInstance;

  beforeEach(async () => {
    server = Fastify();
    server.register(app);
  });

  afterEach(async () => {
    await server.close();
    server = null;
  });

  it('territories', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/api/territories/',
    });
    expect(response.statusCode).toEqual(200);
    expect(response.json().data).toBeTruthy();
  });

  it('territories by id', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/api/territories/01730',
    });

    expect(response.statusCode).toEqual(200);
    expect(response.json().data).toHaveLength(1);
  });

  it('territories by id - error', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/api/territories/01730000',
    });

    expect(response.statusCode).toEqual(200);
    expect(response.json().data).toHaveLength(0);
  });
});
