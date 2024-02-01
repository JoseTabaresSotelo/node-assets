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
  expect(response.json().data).toBeTruthy();
 })

 
 it("suppliers by id", async () =>{
  const response = await server.inject({
    method: 'GET',
    url: '/api/suppliers/3',
  });

  expect(response.statusCode).toEqual(200);
  expect(response.json().data).toHaveLength(1);
 })

 it("suppliers by id - error", async () =>{
  const response = await server.inject({
    method: 'GET',
    url: '/api/suppliers/1000',
  });

  expect(response.statusCode).toEqual(200);
  expect(response.json().data).toHaveLength(0);
 })

});