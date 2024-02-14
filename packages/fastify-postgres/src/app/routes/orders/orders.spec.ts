import { app } from '../../app';
import Fastify, { FastifyInstance } from 'fastify';

const orderPayload = {
  order_id: 11088,
  customer_id: 'RICSU',
  company_name: 'Rattlesnake Canyon Grocery',
  contact_name: 'Mary Wilson',
  employee_name: 'Dulce Botello',
  order_date: '1998-05-06T05:00:00.000Z',
  required_date: '1998-06-03T05:00:00.000Z',
  shipped_date: null,
  ship_via: 2,
};

describe('/orders should return a correct status code', () => {
  let server: FastifyInstance;

  beforeEach(async () => {
    server = Fastify();
    server.register(app);
  });

  afterEach(async () => {
    await server.close();
    server = null;
  });

  it('orders', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/api/orders',
    });
    expect(response.statusCode).toEqual(200);
    expect(response.json()).toBeTruthy();
  });

  it('orders by id', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/api/orders/11077',
    });

    expect(response.statusCode).toEqual(200);
    expect(response.json().data).toHaveLength(1);
  });

  it('orders - POST - error', async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/api/orders',
      payload: orderPayload,
    });
    console.log('response.json(): ', response.json());
    expect(response.statusCode).toEqual(500);
    expect(response.json().message).toEqual(
      'duplicate key value violates unique constraint "pk_orders"'
    );
  });
});
