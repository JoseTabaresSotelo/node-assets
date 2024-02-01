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

 it("region", async () =>{
  const response = await server.inject({
    method: 'GET',
    url: '/api/region',
  });
  expect(response.statusCode).toEqual(200);
  expect(response.json().data).toBeTruthy();
 })

 
 it("region by id", async () =>{
  const response = await server.inject({
    method: 'GET',
    url: '/api/region/3',
  });

  expect(response.statusCode).toEqual(200);
  expect(response.json().data).toHaveLength(1);
 })

});