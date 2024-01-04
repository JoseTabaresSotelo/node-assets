import Fastify from 'fastify';
import { app } from './app/app';
import {categories} from './app/routes/categories';
import {customers} from './app/routes/customers';
import { employees } from './app/routes/employees';
import { orders } from './app/routes/orders';
import { products } from './app/routes/products';
import { region } from './app/routes/region';
import { shippers } from './app/routes/shippers';
import { suppliers } from './app/routes/suppliers';
import { territories } from './app/routes/territories';
import { users } from './app/routes/users';
import { usStates } from './app/routes/usStates';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3002;

// Instantiate Fastify with some config
const server = Fastify({
  logger: true,
  ignoreTrailingSlash: true
});



// Register your application as a normal plugin.
server.register(app);
server.register(categories)
server.register(customers)
server.register(employees)
server.register(orders)
server.register(products)
server.register(region)
server.register(shippers)
server.register(suppliers)
server.register(territories)
server.register(usStates)

// Start listening.
const start = async () => {
  try {
    await server.listen({port, host})
    console.log(`server listening on http://${host}:${port}`);
  } catch (error) {
    process.exit(1)
  }
}
start();
