import Fastify from 'fastify';
import { app } from './app/app';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

// Instantiate Fastify with some config
/**
 * As Fastify is focused on performance, it uses pino as its logger, with the default log level, when enabled, set to 'info'.
 * @see https://fastify.dev/docs/latest/Reference/Logging/
 */
const server = Fastify({
  logger: true,
});

// Register your application as a normal plugin.
server.register(app);
/**
* Middlewares
* 
* @see https://fastify.dev/docs/latest/Reference/Middleware/
* Enables the use of CORS in a Fastify application.
*
* @see https://github.com/fastify/fastify-cors
*/
server.register(cors, { 
  // please put options as needed here
});
// Simply require this plugin, and the basic security headers will be set.
server.register(
  helmet,
  // Example disables the `contentSecurityPolicy` middleware but keeps the rest.
  { contentSecurityPolicy: false }
);

// Start listening.
server.listen({ port, host }, (err) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
});
