'use strict';

const assert = require('assert');
const request = require('supertest');
const mm = require('egg-mock');
const uuid = require('uuid/v4');

describe('test/mongoose.test.js', () => {
  let app;
  const key = uuid();
  const value = uuid();
  before(function* () {
    app = mm.app({
      baseDir: 'apps/memcache-test',
    });
    yield app.ready();
  });

  after(() => {
    app.close();
  });
  afterEach(mm.restore);

  it('set', function* () {
    app.mockCsrf();

    const res = yield request(app.callback()).post('/set').send({
      key,
      value,
    });
  });
  it('get', function* () {
    app.mockCsrf();

    const res = yield request(app.callback()).post('/get').send({
      key,
    });
  });
  it('del', function* () {
    app.mockCsrf();

    const res = yield request(app.callback()).post('/del').send({
      key,
    });
  });
});
