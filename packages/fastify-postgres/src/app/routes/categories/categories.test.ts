import {test} from 'tap'
// const { test } = require('tap')
// const build = require('../../app.ts')
import { app as build } from '../../app'

test('GET `/` route', async (t) => {
  const app = build();
  const response = await app.inject({
    method: 'GET',
    url: '/'
  })
  t.equal(response.statusCode, 200, 'returns a status code of 200')

})