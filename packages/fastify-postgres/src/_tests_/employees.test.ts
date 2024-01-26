import buildServer from '../server'

describe('GET /employees should return a correct status code', () => {
 it("employees", async () =>{
  const server = buildServer()
  const response = await server.inject({
    method: 'GET',
    url: '/employees',
  });
  expect(response.statusCode).toBe(200);
  expect(response.json()).toBeTruthy();
 })

 
 it("employees by id", async () =>{
  const server = buildServer()
  const response = await server.inject({
    method: 'GET',
    url: '/employees/3',
  });

  expect(response.statusCode).toBe(200);
  expect(response.json()).toHaveLength(1);
 })

});