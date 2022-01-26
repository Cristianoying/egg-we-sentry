'use strict';

/**
 * egg-we-sentry default config
 * @member Config#weSentry
 * @property {String} SOME_KEY - some description
 */
const config = {};
config.weSentry = {
  config: { // sentry初始化参数
    dsn: '', // dsn地址
    servername: '',
    release: '', // release
    testTracesSampleRate: 1.0,
    prodTracesSampleRate: 1.0,
  },
  infoKeys: {
    headers: [ 'username', 'test' ],
    extra: {},
  },
};

module.exports = config;
