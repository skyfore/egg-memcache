'use strict';

const path = require('path');

const memcached = require(path.join(__dirname, 'lib', 'memcached.js'));

module.exports = agent => {
  memcached(agent);
};
