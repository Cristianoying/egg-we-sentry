'use strict';
const Sentry = require('@sentry/node');
const util = require('./app/util');
const assert = require('assert');
const SentryLoggerTransport = require('./app/util/sentryLoggerTransport');

class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  async configWillLoad() {
    const { app } = this;
    // 加载插件中间件
    app.config.coreMiddleware.unshift('requestTranstionMiddleware');
  }
  async didLoad() {
    const { app } = this;
    // 所有的配置已经加载完毕
    const { formatDate } = util;
    const { weSentry: { config } } = app.config;
    const { enable } = config;
    if (enable) {
      assert(config.dsn, '[egg-we-wentry] dsn must be set in weSentry config!');
      Sentry.init({
        ...config,
        release: config.release || `${config.servername}-${formatDate(Date.now())}`,
        tracesSampleRate: config.tracesSampleRate || 1,
      });
      app.Sentry = Sentry;

      for (const [ name, logger ] of app.loggers.entries()) {
        const transport = new SentryLoggerTransport({
          level: logger.options.level,
          loggerEntry: name + '-sentry',
          app,
        });
        logger.set('sentry', transport);
      }
      app.on('error', (err, ctx) => {
        ctx = ctx || app.createAnonymousContext();
        ctx.service.sentryService.errorCapture(err);
      });
      console.log('[egg-we-sentry] egg-we-sentry plugin is ready.');
    }
  }

}

module.exports = AppBootHook;
