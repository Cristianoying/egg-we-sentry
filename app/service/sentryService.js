
'use strict';
const { Service } = require('egg');
const Sentry = require('@sentry/node');

class sentryService extends Service {
  errorCapture(e) {
    const { ctx } = this;
    ctx.logger.error('egg-we-sentry |ERROR LOG| ', e);
    Sentry.captureException(e);
  }
}

module.exports = sentryService;
