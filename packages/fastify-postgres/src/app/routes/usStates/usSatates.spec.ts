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

 it("states", async () =>{
  const response = await server.inject({
    method: 'GET',
    url: '/api/states',
  });
  expect(response.statusCode).toEqual(200);
  expect(response.json()).toBeTruthy();
 })

 
 it("states by id", async () =>{
  const response = await server.inject({
    method: 'GET',
    url: '/api/states/CA',
  });

  expect(response.statusCode).toEqual(200);
  expect(response.json()).toHaveLength(1);
 })

});