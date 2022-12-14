'use strict';
const Sentry = require('@sentry/node');
const {
  stripUrlQueryAndFragment,
} = require('@sentry/tracing');
const fillBaseScope = require('../util/fillBaseScope');
const errKey = Symbol('SENTRY_ERROR_KEY');

module.exports = () => {
  return async function(ctx, next) {
    let traceParentData;
    const reqMethod = (ctx.method || '').toUpperCase();
    const reqUrl = ctx.url && stripUrlQueryAndFragment(ctx.url);
    const transaction = ctx.transaction = Sentry.startTransaction({
      op: 'request Transaction',
      name: `${reqMethod} ${reqUrl}`,
      ...traceParentData,
    });

    const scope = new Sentry.Scope();
    fillBaseScope(scope, ctx);
    ctx.sentryScope = scope;
    scope.setSpan(transaction);
    try {
      await next();
    } catch (e) {
      ctx.res.statusCode = 500;
      ctx.body = e.options || {
        code: -1,
        message: e.message || '接口请求错误',
      };
      ctx[errKey] = e || null;
    } finally {
      ctx.res.once('finish', () => {
        const { transaction, service: { infoGetService: {
          headers, extras,
        } } } = ctx;
        setImmediate(() => {
          transaction.setHttpStatus(ctx.status);
          const { body, query } = ctx.request;
          transaction.setData('body', body);
          transaction.setData('query', query);
          transaction.setTag('headers', headers);
          extras && transaction.setTag('extras', extras);
          // sync to sentry top scope
          const currentStackTop = Sentry.getCurrentHub().getStackTop();
          currentStackTop.scope = Sentry.Scope.clone(scope);
          transaction.finish();
          if (ctx[errKey]) {
            ctx.service.sentryService.errorCapture(ctx[errKey]);
          }
        });
      });
    }
  };
};
