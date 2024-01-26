import buildServer from '../server'

describe('GET /suppliers should return a correct status code', () => {
 it("suppliers", async () =>{
  const server = buildServer()
  const response = await server.inject({
    method: 'GET',
    url: '/suppliers',
  });
  expect(response.statusCode).toBe(200);
  expect(response.json()).toBeTruthy();
 })

 
 it("suppliers by id", async () =>{
  const server = buildServer()
  const response = await server.inject({
    method: 'GET',
    url: '/suppliers/3',
  });

  expect(response.statusCode).toBe(200);
  expect(response.json()).toHaveLength(1);
 })

});