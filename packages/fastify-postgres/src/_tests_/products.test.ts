import buildServer from '../server'

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
 it("products", async () =>{
  const server = buildServer()
  const response = await server.inject({
    method: 'GET',
    url: '/products',
  });
  expect(response.statusCode).toBe(200);
  expect(response.json()).toBeTruthy();
 })

 
 it("products by id", async () =>{
  const server = buildServer()
  const response = await server.inject({
    method: 'GET',
    url: '/products/3',
  });

  expect(response.statusCode).toBe(200);
  expect(response.json()).toHaveLength(1);
 })

 it("products - POST", async () =>{
    const server = buildServer()
    const response = await server.inject({
      method: 'POST',
      url: '/products',
      payload: productsPayload
    });
  
    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({"message": "Post created"})
   })

});