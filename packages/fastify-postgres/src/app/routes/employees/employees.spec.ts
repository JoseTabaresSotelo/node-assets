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
  expect(response).toBeTruthy();
 })

 
 it("employees by id", async () =>{
  const response = await server.inject({
    method: 'GET',
    url: '/api/employees/3',
  });

  expect(response.statusCode).toEqual(200);
  expect(response).toBeTruthy();
 })

 it("employees by id- error", async () =>{

  const response = await server.inject({
    method: 'GET',
    url: '/api/employees/1000',
  });

  expect(response.statusCode).toEqual(200);
  expect(response.json().data).toHaveLength(0)
 })

});