import { client } from '../../plugins/db';
import { FastifyInstance, FastifyRequest } from 'fastify';

const getAllUsers = 'SELECT * from users_sample';
const addUser = `INSERT INTO users_sample (username, email) VALUES ($1, $2) RETURNING *;`;

const users = async (fastify: FastifyInstance) => {
  fastify.get('/users', (req, res) => {
    client.query(getAllUsers, (errors, result) => {
      if(errors) res.status(500).send({messageError: errors})
      res.status(200).send(result.rows);
    })
  });
  
  fastify.post('/users/:id',(request: FastifyRequest<{ Body: { username: string; email: string } }>, res) => {
      const { username, email } = request.body;
      client.query(addUser, [username, email], (errors, result) => {
        if(errors) res.status(500).send({messageError: errors})
        res.status(200).send({message: 'User created'});
      })
    }
  );
};

export default users;
