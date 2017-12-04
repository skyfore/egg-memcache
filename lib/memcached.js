'use strict';

const assert = require('assert');

const Promise = require('bluebird');
const Memcached = require('memcached');

module.exports = app => {
  const config = app.config.memcache;
  assert(config.url, '[egg-memcache] url is required on config');
  app.coreLogger.info('[egg-memcache] connecting %s', config.url);

  const memcached = new Memcached(config.url, config.options);
  app.memcached = Promise.promisifyAll(memcached);

  memcached.on('failure', details => {
    const err = new Error();
    err.message = `[egg-memcache] Server ${details.server} went down due to: ${details.message.join('')}`;
    app.coreLogger.error(err);
  });

  memcached.on('reconnecting', details => {
    const err = new Error();
    err.message = `[egg-memcache] Total downtime caused by server ${details.server}: ${details.totalDownTime} ms.`;
    app.coreLogger.error(err);
  });

  memcached.on('issue', details => {
    const err = new Error();
    err.message = `[egg-memcache] Server ${details.server} has problem: ${details.message.join('')}, and trying again.`;
    app.coreLogger.error(err);
  });
  memcached.on('reconnect', details => {
    const info = `[egg-memcache] Server ${details.server} reconnect success.`;
    app.coreLogger.info(info);
  });
  memcached.on('remove', details => {
    const info = `[egg-memcache] Server ${details.server} has been removed`;
    app.coreLogger.info(info);
  });
};
