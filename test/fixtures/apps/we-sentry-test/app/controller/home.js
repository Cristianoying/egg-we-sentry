'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const message = 'hi, weSentry';

    const input = {
      ...ctx.request.body,
    };

    ctx.logger.debug(message, input);

    ctx.body = {
      input,
      output: {
        message,
      },
    };
  }
}

module.exports = HomeController;
