import { app } from '../../app';
import Fastify, { FastifyInstance } from 'fastify';

describe('GET /suppliers should return a correct status code', () => {
    let server: FastifyInstance;

  beforeEach(async () => {
    server = Fastify();
    server.register(app);
  });

  afterEach(async () => {
    await server.close(); 
    server = null;
  });

 it("suppliers", async () =>{
  const response = await server.inject({
    method: 'GET',
    url: '/api/suppliers',
  });
  expect(response.statusCode).toEqual(200);
  expect(response.json()).toBeTruthy();
 })

 
 it("suppliers by id", async () =>{
  const response = await server.inject({
    method: 'GET',
    url: '/api/suppliers/3',
  });

  expect(response.statusCode).toEqual(200);
  expect(response.json()).toHaveLength(1);
 })

});