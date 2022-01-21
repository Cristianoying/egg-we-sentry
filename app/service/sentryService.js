
'use strict';
const { Service } = require('egg');
const Sentry = require('@sentry/node');

class sentryService extends Service {
  errorCapture(e) {
    // const { ctx } = this;
    // const user = ctx.service.infoGetService.user;
    // Sentry.setUser(user);
    Sentry.captureException(e);
  }
}

module.exports = sentryService;
