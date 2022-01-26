'use strict';

exports.keys = '123456';

exports.weSentry = {
  config: { // sentry初始化参数
    dsn: 'http://12345@sentry.example.com/1', // dsn地址
    servername: 'correctly-config-servername',
    release: 'correctly-config-release', // release
    testTracesSampleRate: 0.5,
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
