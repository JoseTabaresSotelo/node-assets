import { app } from '../../app';
import Fastify, { FastifyInstance } from 'fastify';

describe('GET /employees should return a correct status code', () => {
    let server: FastifyInstance;

    beforeEach(async () => {
      server = Fastify();
      server.register(app);
    });
  
    afterEach(async () => {
      await server.close(); 
      server = null;
    });
  
 it("employees", async () =>{
  const response = await server.inject({
    method: 'GET',
    url: '/api/employees',
  });
  expect(response.statusCode).toEqual(200);
  expect(response.json()).toBeTruthy();
 })

 
 it("employees by id", async () =>{
  const response = await server.inject({
    method: 'GET',
    url: '/api/employees/3',
  });

  expect(response.statusCode).toEqual(200);
  expect(response.json()).toHaveLength(1);
 })

});