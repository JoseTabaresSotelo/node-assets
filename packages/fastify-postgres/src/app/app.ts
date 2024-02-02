import * as path from 'path';
import { FastifyInstance } from 'fastify';
import AutoLoad from '@fastify/autoload';
import * as _ from 'lodash';

// Iterative function that convert object properties in camel case format
const camelize = (obj) =>
  _.transform(obj, (acc, value, key, target) => {
    const camelKey = _.isArray(target) ? key : _.camelCase(key);

    acc[camelKey] = _.isObject(value) && !(value instanceof Date) ? camelize(value) : value;
  });

/* eslint-disable-next-line */
export interface AppOptions {}

export async function app(fastify: FastifyInstance, opts: AppOptions) {
  /**
  * Place here your custom code!
  * Added hook, method and allow you to listen to specific events in the application or request/response lifecycle. You have to register a hook before the event is triggered, otherwise, the event is lost.
  * If you are using the preSerialization hook, you can change (or replace) the payload before it is serialized. For example: 
  * `const newPayload = { wrapped: payload }` this wrapping the payload in wrapped property object
  * This current hook is wrapping in `data` and camelize the convert data base columns in camel case format 
  *
  * @see https://fastify.dev/docs/latest/Reference/Hooks/
  *
  **/
  fastify.addHook('preSerialization', (request, reply, payload, done) => {
    let err = null;
    let data = [];
    try {
      data = camelize(payload);
    } catch (e) {
      err = e;
    }

    const newPayload = { data: data, success: true,  message: 'successfully'};
    done(err, newPayload);
  });

  // Do not touch the following lines

  /**
  * This loads all plugins defined in plugins like data base connection
  * those should be support plugins that are reused
  * through your application
  * @see https://fastify.dev/docs/latest/Reference/Plugins/
  */
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: { ...opts },
  });

  /**
  * This loads all routes
  * define your routes in routes folder otherwise the routes are not in scope
  *  @see https://fastify.dev/docs/latest/Reference/Routes/
  */

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    dirNameRoutePrefix: false,
    ignorePattern: /.spec.(t|j)s/,
    options: { prefix: '/api' },
  });
}
