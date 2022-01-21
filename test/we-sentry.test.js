'use strict';

const mock = require('egg-mock');

describe('test/we-sentry.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/we-sentry-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, weSentry')
      .expect(200);
  });
});
