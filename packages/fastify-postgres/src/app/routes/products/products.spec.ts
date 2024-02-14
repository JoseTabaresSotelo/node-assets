import { app } from '../../app';
import Fastify, { FastifyInstance } from 'fastify';

const productsPayload = {
  productId: 93,
  productName: 'Alfredo Rivas',
  supplierId: 9,
  categoryId: 4,
  quantityPerUnit: '50 boxes x 10 bags',
  unitPrice: 18,
  unitsInStock: 39,
  unitsOnOrder: 0,
  reorderLevel: 10,
  discontinued: 1,
};

describe.skip('/products should return a correct status code', () => {
  let server: FastifyInstance;

  beforeEach(async () => {
    server = Fastify();
    server.register(app);
  });

  afterEach(async () => {
    await server.close();
    server = null;
  });

  it('products', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/api/products',
    });
    expect(response.statusCode).toEqual(200);
    expect(response.json().data).toBeTruthy();
  });

  it('products by id', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/api/products/1',
    });

    expect(response.statusCode).toEqual(200);
    expect(response.json().data).toHaveLength(1);
  });

  it('products - POST - Error', async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/api/products',
      payload: productsPayload,
    });
    console.log('response.json(): ', response.json());
    expect(response.statusCode).toEqual(404);
    expect(response.json().error).toEqual('Not Found');
  });
});
