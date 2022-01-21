'use strict';
const Sentry = require('@sentry/node');
const util = require('./app/util');
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
    const { formatDate, assertLog } = util;
    const { env = 'dev', weSentry } = app.config;
    const { dsn, prodTracesSampleRate, testTracesSampleRate, release, infoKeys: { config } } = weSentry;

    assertLog(dsn, '[egg-we-wentry] dsn must be in weSentry config!');
    Sentry.init({
      dsn,
      ...config,
      release: release || `${env}-${formatDate(Date.now())}`,
      tracesSampleRate: env === 'prod' ? prodTracesSampleRate : testTracesSampleRate,
    });
    app.Sentry = Sentry;
  }
  async serverDidReady() {
    console.log('[egg-we-sentry] egg-we-sentry插件加载完毕');
    // 获取ctx
    const { app } = this;

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
  }

}

module.exports = AppBootHook;
