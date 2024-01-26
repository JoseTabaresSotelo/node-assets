import buildServer from './server';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3002;

// Instantiate Fastify with some config
const server = buildServer();

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
