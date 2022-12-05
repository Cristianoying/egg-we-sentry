'use strict';

/**
 * egg-we-sentry default config
 * @member Config#weSentry
 * @property {String} SOME_KEY - some description
 */
const config = {};
config.weSentry = {
  config: { // sentry初始化参数
    enable: true, // 增加手动控制开关功能
    dsn: '', // dsn地址
    servername: '', // release 不存在时会用作release `${config.servername}-${时间}`
    release: '', // release
    tracesSampleRate: 1.0, // 采样率
  },
  infoKeys: { // 额外携带的参数
    headers: [ 'username', 'test' ], // transtation从headers里面携带的参数
    extra: {}, // 其他要携带的固定参数
  },
};

module.exports = config;
