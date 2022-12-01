'use strict';

const util = require('util');
const Controller = require('egg').Controller;

class CaptureController extends Controller {
  async message() {
    const { type, value } = this.ctx.request.query;
    switch (type) {
      case 'Context':
        this.ctx.logger.error(new Error(value));
        break;
      case 'App':
        this.app.logger.error(new Error(value));
        break;
      case 'Core':
        this.app.coreLogger.error(new Error(value));
        break;
      default:
        break;
    }
    this.ctx.body = 'ok';
  }

  async prePostContext() {
    const { name } = this.ctx.query;

    this.ctx.sentryScope.setTag('query.name', name);

    throw new Error('test');

    // this.ctx.body = 'ok';
  }

  async stacktraceOrder() {
    const { ctx } = this;

    await ctx.service.user.find(1);

    ctx.body = 'ok';
  }

  async formatString() {
    const { ctx } = this;

    const messageTpl = 'test, i am %s, node versions: %j';
    this.logger.info(messageTpl, 'logger-sentry', process.versions);

    ctx.body = `[controller.capture] ${util.format('test, i am %s, node versions: %j', 'logger-sentry', process.versions)}`;
  }
}

module.exports = CaptureController;
