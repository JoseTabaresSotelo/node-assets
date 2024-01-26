import buildServer from '../server'

describe('GET /territories should return a correct status code', () => {
 it("territories", async () =>{
  const server = buildServer()
  const response = await server.inject({
    method: 'GET',
    url: '/territories',
  });
  expect(response.statusCode).toBe(200);
  expect(response.json()).toBeTruthy();
 })

 
 it("territories by id", async () =>{
  const server = buildServer()
  const response = await server.inject({
    method: 'GET',
    url: '/territories/01730',
  });

  expect(response.statusCode).toBe(200);
  expect(response.json()).toHaveLength(1);
 })

});