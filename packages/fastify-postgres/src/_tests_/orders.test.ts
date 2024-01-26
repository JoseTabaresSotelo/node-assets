import buildServer from '../server'

const orderPayload = {
    "order_id": 11083 ,
    "customer_id": "RICSU",
    "company_name": "Rattlesnake Canyon Grocery",
    "contact_name": "Mary Wilson",
    "employee_name": "Dulce Botello",
    "order_date": "1998-05-06T05:00:00.000Z",
    "required_date": "1998-06-03T05:00:00.000Z",
    "shipped_date": null,
    "ship_via": 2
}

describe('/orders should return a correct status code', () => {
 it("orders", async () =>{
  const server = buildServer()
  const response = await server.inject({
    method: 'GET',
    url: '/orders',
  });
  expect(response.statusCode).toBe(200);
  expect(response.json()).toBeTruthy();
 })

 
 it("orders by id", async () =>{
  const server = buildServer()
  const response = await server.inject({
    method: 'GET',
    url: '/orders/11075',
  });

  expect(response.statusCode).toBe(200);
  expect(response.json()).toHaveLength(1);
 })

 it("orders - POST", async () =>{
    const server = buildServer()
    const response = await server.inject({
      method: 'POST',
      url: '/orders',
      payload: orderPayload
    });
  
    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({"message": "Order created"})
   })

});