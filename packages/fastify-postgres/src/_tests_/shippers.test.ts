import buildServer from '../server'

describe('GET /shippers should return a correct status code', () => {
 it("shippers", async () =>{
  const server = buildServer()
  const response = await server.inject({
    method: 'GET',
    url: '/shippers',
  });
  expect(response.statusCode).toBe(200);
  expect(response.json()).toBeTruthy();
 })

 
 it("shippers by id", async () =>{
  const server = buildServer()
  const response = await server.inject({
    method: 'GET',
    url: '/shippers/3',
  });

  expect(response.statusCode).toBe(200);
  expect(response.json()).toHaveLength(1);
 })

});