# egg-we-sentry

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-we-sentry.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-we-sentry
[travis-image]: https://img.shields.io/travis/eggjs/egg-we-sentry.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-we-sentry
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-we-sentry.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-we-sentry?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-we-sentry.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-we-sentry
[snyk-image]: https://snyk.io/test/npm/egg-we-sentry/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-we-sentry
[download-image]: https://img.shields.io/npm/dm/egg-we-sentry.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-we-sentry

<!--
Description here.
-->

## Install

```bash
$ npm i egg-we-sentry --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.weSentry = {
  enable: true,
  package: 'egg-we-sentry',
};
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.weSentry = {
  config: { // sentry初始化参数
    dsn: '', // dsn地址
    servername: '',
    release: '', // release
    testTracesSampleRate: 1.0,
    prodTracesSampleRate: 1.0,
  },
  infoKeys: {
    user: { // user参数
      // username1: 'header|username',
      // username2: 'query|username',
      // username3: 'body|username',
      browser: 'header|sec-ch-ua',
    },
    tags: { // tag参数
      // username1: 'header|username',
      // username2: 'query|username',
      // username3: 'body|username',
    },
  },
};
```

see [config/config.default.js](config/config.default.js) for more detail.

## Example

<!-- example here -->

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## License

[MIT](LICENSE)
