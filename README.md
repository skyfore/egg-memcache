# egg-memcache

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-memcache.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-memcache
[travis-image]: https://img.shields.io/travis/eggjs/egg-memcache.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-memcache
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-memcache.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-memcache?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-memcache.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-memcache
[snyk-image]: https://snyk.io/test/npm/egg-memcache/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-memcache
[download-image]: https://img.shields.io/npm/dm/egg-memcache.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-memcache

Memcached plugin of eggjs, Promise wrapped by bluebird. Will start a memcached connection before server start and using in app.

## Install

```bash
$ npm i egg-memcache --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.memcache = {
  enable: true,
  package: 'egg-memcache',
};
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.memcache = {
  url: 'localhost:11211',
  option: {}
};
```
<!--
see [config/config.default.js](config/config.default.js) for more detail.
-->
see [memcached API](https://github.com/3rd-Eden/memcached) for more detail.

## Example

<!-- example here -->
```js
//  {app_root}/service/store.js
module.exports = (app) => {
  const store = {
    set(key, value, lifetime) {
      return app.memcache.setAsync(key, value, lifetime);
    },
    get(key) {
      return app.memcache.getAsync(key);
    }
  }
};

//  {app_root}/controller/index.js
class IndexController extends Controller {
  * setKey() {
    yield this.service.store.set('key', 'value', 0);
  }
  
  * getKey() {
    const key = yield this.service.store.get('key');
  }
}

```

> Also can use native memcache api without `async`, such as `app.memcached.set`

<!--
## Questions & Suggestions
Please open an issue [here](https://github.com/eggjs/egg/issues).
-->

## License

[MIT](LICENSE)
