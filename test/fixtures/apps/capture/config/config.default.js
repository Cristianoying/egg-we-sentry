'use strict';

exports.keys = '123456';

// 日志
exports.logger = {
  level: 'DEBUG',
  consoleLevel: 'DEBUG',
};

exports.weSentry = {
  config: { // sentry初始化参数
    dsn: 'http://481cc753f9e84d8290545ae4af31692b@10.205.11.188:9000/3', // dsn地址
    servername: 'capture-servername',
    release: 'capture-release', // release
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
