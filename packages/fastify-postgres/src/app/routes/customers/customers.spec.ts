import { app } from '../../app';
import Fastify, { FastifyInstance } from 'fastify';

describe('GET /customers should return a correct status code', () => {
    let server: FastifyInstance;

    beforeEach(async () => {
        server = Fastify();
        server.register(app);
      });
    
      afterEach(async () => {
        await server.close(); 
        server = null;
      });

 it("customers", async () =>{
  
  const response = await server.inject({
    method: 'GET',
    url: '/api/customers',
  });
  expect(response.statusCode).toEqual(200);
  expect(response).toBeTruthy();
 })

 
 it("customers by id", async () =>{

  const response = await server.inject({
    method: 'GET',
    url: '/api/customers/ALFKI',
  });

  expect(response.statusCode).toEqual(200);
  expect(response).toBeTruthy();
 })

 it("customers by id - error", async () =>{

  const response = await server.inject({
    method: 'GET',
    url: '/api/customers/999d',
  });

  expect(response.statusCode).toEqual(200);
  expect(response.json().data).toHaveLength(0)
 })

});