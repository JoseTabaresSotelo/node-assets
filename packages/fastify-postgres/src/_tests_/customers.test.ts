import buildServer from '../server'

describe('GET /customers should return a correct status code', () => {
 it("customers", async () =>{
  const server = buildServer()
  const response = await server.inject({
    method: 'GET',
    url: '/customers',
  });
  expect(response.statusCode).toBe(200);
  expect(response.json()).toBeTruthy();
 })

 
 it("customers by id", async () =>{
  const server = buildServer()
  const response = await server.inject({
    method: 'GET',
    url: '/customers/ALFKI',
  });

  expect(response.statusCode).toBe(200);
  expect(response.json()).toHaveLength(1);
 })

});