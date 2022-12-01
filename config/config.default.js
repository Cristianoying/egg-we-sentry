'use strict';

/**
 * egg-we-sentry default config
 * @member Config#weSentry
 * @property {String} SOME_KEY - some description
 */
const config = {};
config.weSentry = {
  config: { // sentry初始化参数
    enable: true,
    dsn: '', // dsn地址
    servername: '',
    release: '', // release
    testTracesSampleRate: 1.0,
    prodTracesSampleRate: 1.0,
  },
  infoKeys: { // 额外携带的参数
    headers: [ 'username', 'test' ], // transtation从headers里面携带的参数
    extra: {}, // 其他要携带的自定义参数
  },
};

module.exports = config;
