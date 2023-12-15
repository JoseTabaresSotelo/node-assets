import * as path from 'path';
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import AutoLoad from '@fastify/autoload';
import * as _ from 'lodash';

const camelize = (obj) =>
  _.transform(obj, (acc, value, key, target) => {
    const camelKey = _.isArray(target) ? key : _.camelCase(key);

    acc[camelKey] = _.isObject(value) ? camelize(value) : value;
  });

/* eslint-disable-next-line */
export interface AppOptions {}

export async function app(fastify: FastifyInstance, opts: AppOptions) {
  fastify.addHook('preSerialization', (request, reply, payload, done) => {
    let err = null;
    let data = [];
    try {
      data = camelize(payload);
    } catch (e) {
      err = e;
    }

    const newPayload = { Data: data };
    done(err, newPayload);
  });
  // Place here your custom code!

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: { ...opts },
  });

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    dirNameRoutePrefix: false,
    ignorePattern: /.spec.(t|j)s/,
    options: { prefix: '/api' },
  });
}
