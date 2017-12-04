'use strict';

module.exports = app => {
  const store = {
    set(key, value, lifetime) {
      return app.memcached.setAsync(key, value, lifetime);
    },
    get(key) {
      return app.memcached.getAsync(key);
    },
    del(key) {
      return app.memcached.delAsync(key);
    },
  };

  return store;
};
