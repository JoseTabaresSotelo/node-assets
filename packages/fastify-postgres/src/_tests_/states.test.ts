import buildServer from '../server'

describe('GET /states should return a correct status code', () => {
 it("states", async () =>{
  const server = buildServer()
  const response = await server.inject({
    method: 'GET',
    url: '/states',
  });
  expect(response.statusCode).toBe(200);
  expect(response.json()).toBeTruthy();
 })

 
 it("states by id", async () =>{
  const server = buildServer()
  const response = await server.inject({
    method: 'GET',
    url: '/states/CA',
  });

  expect(response.statusCode).toBe(200);
  expect(response.json()).toHaveLength(1);
 })

});