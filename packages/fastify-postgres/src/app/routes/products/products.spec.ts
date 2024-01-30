import { app } from '../../app';
import Fastify, { FastifyInstance } from 'fastify';

const productsPayload = {
    "product_id": 80,
    "product_name": "Alfredo",
    "supplier_id": 9,
    "category_id": 4,
    "quantity_per_unit": "50 boxes x 10 bags",
    "unit_price": 18,
    "units_in_stock": 39,
    "units_on_order": 0,
    "reorder_level": 10,
    "discontinued": 1
}

describe('/products should return a correct status code', () => {
    let server: FastifyInstance;

  beforeEach(async () => {
    server = Fastify();
    server.register(app);
  });

  afterEach(async () => {
    await server.close(); 
    server = null;
  });

 it("products", async () =>{
  const response = await server.inject({
    method: 'GET',
    url: '/api/products',
  });
  console.log("response----------: ", response.statusCode);
  expect(response.statusCode).toEqual(200);
  expect(response.json()).toBeTruthy();
 })

 
 it("products by id", async () =>{
  const response = await server.inject({
    method: 'GET',
    url: '/api/products/3',
  });

  expect(response.statusCode).toEqual(200);
  expect(response.json()).toHaveLength(1);
 })

 it("products - POST", async () =>{
    const response = await server.inject({
      method: 'POST',
      url: '/api/products',
      payload: productsPayload
    });
  
    expect(response.statusCode).toEqual(200);
    expect(response.json()).toEqual({"message": "Post created"})
   })

});