# egg-we-sentry

[![NPM version][npm-image]][npm-url]
[![Node.js CI](https://github.com/Cristianoying/egg-we-sentry/actions/workflows/nodejs.yml/badge.svg)](https://github.com/Cristianoying/egg-we-sentry/actions/workflows/nodejs.yml)
[![Test coverage][codecov-image]][codecov-url]
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

## 依赖说明

此插件基于 [@sentry/node](https://docs.sentry.io/platforms/node/) 进行二次封装，针对egg机制进行定制化功能开发：
### 依赖的 egg 版本

egg-we-sentry 版本 | egg 1.x
--- | ---
1.x | 😁
0.x | ❌


## 开启插件

```js
// config/plugin.js
exports.weSentry = {
  enable: true,
  package: 'egg-we-sentry',
};
```

## 使用场景
egg 框架的 sentry 插件

此插件基于 [@sentry/node](https://docs.sentry.io/platforms/node/) 进行二次封装，针对egg机制进行定制化功能开发：

* 默认接入应用请求会话
* 全局统一错误处理，并捕捉错误日志
* 适配EggJS日志API
* 适配EggJS日志Error分类

## 详细配置
```js
config.weSentry = {
  config: {
    dsn: '',
    servername: '',
    release: '',
    testTracesSampleRate: 1.0,
    prodTracesSampleRate: 1.0,
  },
  infoKeys: {
    headers: [ 'username', 'test' ],
    extra: {},
  },
}
```
请到 [config/config.default.js](config/config.default.js) 查看详细配置项说明。

## 单元测试


## 提问交流

请到 [egg issues](https://github.com/Cristianoying/egg-we-sentry/issues) 异步交流。

## License

[MIT](LICENSE)
