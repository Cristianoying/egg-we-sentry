'use strict';
const { Service } = require('egg');

class InfoGetService extends Service {
  bodyGet(key) {
    const body = this.ctx.request.body;
    return key && body[key] ? body[key] : '';
  }
  queryGet(key) {
    const query = this.ctx.request.query;
    return key && query[key] ? query[key] : '';
  }
  headerGet(key) {
    return this.ctx.get(key) || '';
  }

  getVal(caseWay, caseKey) {
    const { ctx } = this;
    if (!ctx.request[caseKey]) return '';
    if (caseWay === 'query' || caseWay === 'body') {
      return ctx.request[caseWay][caseKey];
    } else if (caseWay === 'header') {
      return ctx.get(caseKey);
    }
    return ctx.app.config[caseKey];

  }

  get user() {
    const userKeys = this.app.config.weSentry.infoKeys.user || {};
    return this.getVals(userKeys);
  }

  get tags() {
    const tagKeys = this.app.config.weSentry.infoKeys.tags || {};
    return this.getVals(tagKeys);
  }
  get headers() {
    const headers = this.app.config.weSentry.infoKeys.headers || [];
    return this.getVals(headers);
  }

  get extras() {
    return this.app.config.weSentry.infoKeys.extras || null;
  }

  getVals(keys) {
    const res = {};
    keys.forEach(key => {
      res[key] = this.getVal('header', key);
    });
    return res;
  }
}

module.exports = InfoGetService;
