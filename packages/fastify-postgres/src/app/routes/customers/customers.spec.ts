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
  expect(response.json()).toBeTruthy();
 })

 
 it("customers by id", async () =>{

  const response = await server.inject({
    method: 'GET',
    url: '/api/customers/ALFKI',
  });

  expect(response.statusCode).toEqual(200);
  expect(response.json()).toHaveLength(1);
 })

});