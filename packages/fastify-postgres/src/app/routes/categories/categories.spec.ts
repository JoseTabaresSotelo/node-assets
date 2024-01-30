import { app } from '../../app'
import Fastify, { FastifyInstance } from 'fastify'


describe('GET /api/categpries should return a list of categpries', () => {
    let server: FastifyInstance;

    beforeEach(async () => {
        server = Fastify();
        server.register(app);
    })

    afterEach(async () => {
        await server.close();
        server = null
    })


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
  expect(response.json()).toHaveLength(1);
 })

});