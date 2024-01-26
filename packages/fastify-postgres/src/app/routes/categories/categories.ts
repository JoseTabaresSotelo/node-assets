import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { client } from '../../plugins/db';

const getAllCategories = 'SELECT * FROM public.categories ORDER BY category_id ASC';
const getCategoryById = 'SELECT * from public.categories WHERE category_id = $1';

const categories = async (fastify: FastifyInstance) => {
  /**
   * Get all categories 
   */
  fastify.get('/categories', (req, res) => {
     client.query(getAllCategories, (errors, result) =>{
      if(errors) res.status(500).send({message: errors})
      res.status(200).send(result.rows)
    })
  });

  /**
   * Get a categorie by id
   */
  fastify.get('/categories/:id', (request: FastifyRequest<{ Params: { id: string } }>, res) => {
      const { id } = request.params;
      client.query(getCategoryById, [id], (errors, result) =>{
        if(errors) res.status(500).send({message: errors})
        res.status(200).send(result.rows)
      })

    }
  );
};

export default categories
