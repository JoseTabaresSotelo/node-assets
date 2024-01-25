import { app } from '../../app';
import Fastify, { FastifyInstance } from 'fastify';
import { faker } from '@faker-js/faker';

describe('/users', () => {
  let server: FastifyInstance;

  beforeEach(async () => {
    server = Fastify();
    server.register(app);
  });

  afterEach(async () => {
    await server.close();
    server = null;
  });

  describe('GET /users returns status 200', () => {
    it('should respond with users', async () => {
      const response = await server.inject({
        method: 'GET',
        url: '/api/users',
      });

      console.log(response.json());
      expect(response.statusCode).toEqual(200);
      expect(response.json()).toBeDefined();
      expect(Array.isArray(response.json().data)).toEqual(true);
    });
  });

  describe('POST /users returns status 500', () => {
    it('should respond with users', async () => {
      const response = await server.inject({
        method: 'POST',
        url: '/api/users',
        body: {
          username: 'jose',
          email: 'jose.tabares@gmail.com',
        },
      });

      console.log(response.json());
      expect(response.statusCode).toEqual(500);
      expect(response.json().code).toEqual('23505');
      expect(response.json().error).toEqual('Internal Server Error');
      expect(response.json().message).toEqual(
        `duplicate key value violates unique constraint "users_sample_username_key"`
      );
      expect(response.json()).toBeDefined();
    });
  });

  describe('POST /users returns status 200', () => {
    it('should respond with users', async () => {
      const username = faker.internet.userName();
      const email = faker.internet.email();

      const response = await server.inject({
        method: 'POST',
        url: '/api/users',
        body: {
          username,
          email,
        },
      });

      console.log(response.json());
      expect(response.statusCode).toEqual(200);
      expect(response.json()).toBeDefined();
      expect(response.json().data[0].id).toBeDefined();
      expect(response.json().data[0].username).toEqual(username);
      expect(response.json().data[0].email).toEqual(email);
      expect(response.json().data[0].createdAt).toBeDefined();
      expect(response.json().data[0].updatedAt).toBeDefined();
    });
  });

  xdescribe('GET /users/:id returns status 200', () => {
    it('should respond with users', async () => {
      const response = await server.inject({
        method: 'POST',
        url: '/api/users/1',
      });

      console.log(response.json());
      expect(response.statusCode).toEqual(200);
      expect(response.json()).toBeDefined();
      expect(response.json().data[0].id).toBeDefined();
      expect(response.json().data[0].username).toBeDefined();
      expect(response.json().data[0].email).toBeDefined();
      expect(response.json().data[0].createdAt).toBeDefined();
      expect(response.json().data[0].updatedAt).toBeDefined();
    });
  });
});