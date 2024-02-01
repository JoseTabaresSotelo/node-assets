import { faker } from '@faker-js/faker';
import { app } from '../../app';
import Fastify, { FastifyInstance } from 'fastify';


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

  describe('GET /users', () => {
    it('should returns status 200', async () => {
      const response = await server.inject({
        method: 'GET',
        url: '/api/users',
      });

      expect(response.statusCode).toEqual(200);
      expect(response.json()).toBeDefined();
      expect(Array.isArray(response.json().data)).toEqual(true);
    });
  });

  describe('POST /users ', () => {
    it('should returns status 500', async () => {
      const response = await server.inject({
        method: 'POST',
        url: '/api/users',
        body: {
          username: 'jose',
          email: 'jose.tabares@gmail.com',
        },
      });

      expect(response.statusCode).toEqual(500);
      expect(response.json().code).toEqual('23505');
      expect(response.json().error).toEqual('Internal Server Error');
      expect(response.json().message).toEqual(
        `duplicate key value violates unique constraint "users_sample_username_key"`
      );
      expect(response.json()).toBeDefined();
    });

    it('should returns status 200', async () => {
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

      expect(response.statusCode).toEqual(200);
      expect(response.json()).toBeDefined();
      expect(response.json().data[0].id).toBeDefined();
      expect(response.json().data[0].username).toEqual(username);
      expect(response.json().data[0].email).toEqual(email);
      expect(response.json().data[0].createdAt).toBeDefined();
      expect(response.json().data[0].updatedAt).toBeDefined();
    });
  });

  describe('GET /users/:id', () => {
    it('should returns status 200', async () => {
      const response = await server.inject({
        method: 'GET',
        url: '/api/users/1',
      });

      expect(response.statusCode).toEqual(200);
      expect(response.json()).toBeDefined();
      expect(response.json().data[0].id).toBeDefined();
      expect(response.json().data[0].username).toBeDefined();
      expect(response.json().data[0].email).toBeDefined();
      expect(response.json().data[0].createdAt).toBeDefined();
      expect(response.json().data[0].updatedAt).toBeDefined();
    });

    it('should returns status 404', async () => {
      const response = await server.inject({
        method: 'GET',
        url: `/api/users/205`,
      });

      expect(response.statusCode).toEqual(404);
      expect(response.statusMessage).toEqual('Not Found');
      expect(response.payload).toEqual('User not found!');
    });

    it('should returns status 500', async () => {
      const id = faker.number.int()
      const response = await server.inject({
        method: 'GET',
        url: `/api/users/${id}`,
      });

      expect(response.statusCode).toEqual(500);
      expect(response.json().code).toEqual('22003');
      expect(response.json().error).toEqual('Internal Server Error');
      expect(response.json().message).toEqual(
        `value "${id}" is out of range for type integer`
      );
      expect(response.json()).toBeDefined();
    });
  });
});
