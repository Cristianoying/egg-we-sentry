'use strict';
const { Transport } = require('egg-logger');
const Sentry = require('@sentry/node');

class SentryLoggerTransport extends Transport {
  log(level, args) {
    // 只捕获错误日志
    if (level === 'ERROR' && args[0] instanceof Error) {
      const err = args[0];
      Sentry.captureException(err);
    }
  }
}
module.exports = SentryLoggerTransport;
