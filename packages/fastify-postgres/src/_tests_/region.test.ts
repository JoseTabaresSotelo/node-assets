import buildServer from '../server'

describe('GET /region should return a correct status code', () => {
 it("region", async () =>{
  const server = buildServer()
  const response = await server.inject({
    method: 'GET',
    url: '/region',
  });
  expect(response.statusCode).toBe(200);
  expect(response.json()).toBeTruthy();
 })

 
 it("region by id", async () =>{
  const server = buildServer()
  const response = await server.inject({
    method: 'GET',
    url: '/region/3',
  });

  expect(response.statusCode).toBe(200);
  expect(response.json()).toHaveLength(1);
 })

});