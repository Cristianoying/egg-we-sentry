'use strict';
const Sentry = require('@sentry/node');
const {
  extractTraceparentData,
  stripUrlQueryAndFragment,
} = require('@sentry/tracing');
const fillBaseScope = require('../util/fillBaseScope');

module.exports = () => {
  return async function(ctx, next) {
    const sentryTraceHeaderName = 'sentry-trace';

    let traceParentData;
    if (ctx.get(sentryTraceHeaderName)) {
      traceParentData = extractTraceparentData(ctx.get(sentryTraceHeaderName));
    }

    const scope = new Sentry.Scope();
    fillBaseScope(scope, ctx);
    ctx.sentryScope = scope;
    const reqMethod = (ctx.method || '').toUpperCase();
    const reqUrl = ctx.url && stripUrlQueryAndFragment(ctx.url);

    const transaction = Sentry.startTransaction({
      op: 'request Transaction',
      name: `${reqMethod} ${reqUrl}`,
      ...traceParentData,
    });

    scope.setSpan(transaction);
    try {
      await next();
    } catch (error) {
      ctx.res.statusCode = 500;
      ctx.body = {
        code: -1,
        message: error.message || '接口请求错误',
      };
      Sentry.captureException(error);
    } finally {
      ctx.res.once('finish', () => {
        setImmediate(() => {
          // if using koa router, a nicer way to capture transaction using the matched route
          if (ctx._matchedRoute) {
            const mountPath = ctx.mountPath || '';
            transaction.setName(`${reqMethod} ${mountPath}${ctx._matchedRoute}`);
          }
          transaction.setHttpStatus(ctx.status);
          const { body, query } = ctx.request;
          const headerkeys = Object.keys(ctx.service.infoGetService.headers);
          transaction.setData('body', body);
          transaction.setData('query', query);
          headerkeys.length && transaction.setTag('headers', ctx.service.infoGetService.headers);
          ctx.service.infoGetService.extras && transaction.setTag('extras', ctx.service.infoGetService.extras);
          // sync to sentry top scope
          const currentStackTop = Sentry.getCurrentHub().getStackTop();
          currentStackTop.scope = Sentry.Scope.clone(scope);
          transaction.finish();
        });
      });
    }
  };
};
