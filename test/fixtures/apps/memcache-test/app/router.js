'use strict';

module.exports = app => {
  const { index } = app.controller;
  app.post('/get', index.get);
  app.post('/set', index.set);
  app.post('/del', index.del);
};
