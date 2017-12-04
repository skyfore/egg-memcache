'use strict';

module.exports = app => {
  class IndexController extends app.Controller {
    * get() {
      const { ctx } = this;
      const { key } = ctx.request.body;
      const v = yield this.ctx.service.store.get(key);
    }

    * set() {
      const { ctx } = this;
      const { key, value } = ctx.request.body;
      yield this.ctx.service.store.set(key, value, 0);
    }

    * del() {
      const { ctx } = this;
      const { key } = ctx.request.body;
      yield this.ctx.service.store.del(key);
    }
  }

  return IndexController;
};
