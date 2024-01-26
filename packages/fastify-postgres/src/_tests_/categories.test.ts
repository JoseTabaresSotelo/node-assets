import buildServer from '../server'

describe('GET /api/users should return a list of users', () => {
 test("categories", async () =>{
  const server = buildServer()
  const response = await server.inject({
    method: 'GET',
    url: '/categories',
  });

  expect(response.statusCode).toBe(200);
  expect(response.json()).toBeTruthy();
 })

 
 test("categories by id", async () =>{
  const server = buildServer()
  const response = await server.inject({
    method: 'GET',
    url: '/categories/6',
  });

  expect(response.statusCode).toBe(200);
  expect(response.json()).toHaveLength(1);
 })

});