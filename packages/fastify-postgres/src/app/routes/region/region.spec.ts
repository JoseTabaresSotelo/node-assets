import { app } from '../../app';
import Fastify, { FastifyInstance } from 'fastify';

describe('GET /region should return a correct status code', () => {
  let server: FastifyInstance;

  beforeEach(async () => {
    server = Fastify();
    server.register(app);
  });

  afterEach(async () => {
    await server.close();
    server = null;
  });

  it('region', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/api/regions',
    });
    expect(response.statusCode).toEqual(200);
    expect(response.json().data).toBeTruthy();
  });

  it('region by id', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/api/regions/3',
    });

    expect(response.statusCode).toEqual(200);
    expect(response.json().data).toEqual({
      regionDescription: 'Northern',
      regionId: 3,
    });
  });
});
