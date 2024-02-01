import { app } from '../../app'
import Fastify, { FastifyInstance } from 'fastify'


describe('GET /api/categories should return a list of categories', () => {
    let server: FastifyInstance;

  beforeEach(async () => {
    server = Fastify();
    server.register(app);
  });

  afterEach(async () => {
    await server.close(); 
    server = null;
  });


 it("categories", async () =>{
  const response = await server.inject({
    method: 'GET',
    url: '/api/categories',
  });
  expect(response.statusCode).toEqual(200);
  expect(response.json()).toBeTruthy();
 })
 
 it("categories by id", async () =>{
  const response = await server.inject({
    method: 'GET',
    url: '/api/categories/6',
  });
  expect(response.statusCode).toEqual(200);
  expect(response).toBeTruthy();
 })

 it(" categories by id - error", async () =>{
  const response = await server.inject({
    method: 'GET',
    url: '/api/categories/999d',
  });
  expect(response.statusCode).toEqual(500);
  expect(response.json().message).toEqual('invalid input syntax for type smallint: "999d"')
 })

});