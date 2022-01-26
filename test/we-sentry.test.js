'use strict';

const assert = require('assert');
const mock = require('egg-mock');
const sleep = require('ko-sleep');
// const path = require('path');
mock.consoleLevel('NONE');

describe('sentry config', () => {
  it('miss dsn config', async () => {
    const app = mock.app({
      baseDir: 'apps/miss-config',
    });
    try {
      await app.ready();
    } catch (err) {
      assert(err.message === '[egg-we-wentry] dsn must be set in weSentry config!');
    } finally {
      await app.close();
    }
  });

  it('should be config correctly', async () => {
    const app = mock.app({
      baseDir: 'apps/correctly-config',
    });
    await app.ready();
    const client = app.Sentry.getCurrentHub().getClient();
    const options = client.getOptions();
    const { dsn, servername, release, tracesSampleRate } = options;
    assert.strictEqual(dsn, 'http://12345@sentry.example.com/1');
    assert.strictEqual(servername, 'correctly-config-servername');
    assert.strictEqual(release, 'correctly-config-release');
    assert.strictEqual(tracesSampleRate, 0.5);
  });
});

// describe('context test', () => {
//   let app;
//   before(() => {
//     app = mock.app({
//       baseDir: 'apps/context',
//     });
//     return app.ready();
//   });
//   after(() => app.close());
//   beforeEach(() => app.mockCsrf());

//   it('context test', async () => {
//     let eventResult = {};
//     const client = app.Sentry.getCurrentHub().getClient();
//     client._options.beforeSend = (event, hint) => {
//       eventResult = { ...event, hint };
//       return null;
//     };
//     client._options.beforeBreadcrumb = event => {
//       eventResult = { ...event };
//       return null;
//     };

//     await app.httpRequest()
//       .post('/')
//       .send({ a: 1, b: { c: 2 } })
//       .expect(200);
//     await sleep(1500);
//     // assert.strictEqual(eventResult, {});
//     console.log(eventResult, '============');
//   });
// });

describe('capture Error', async () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/capture',
    });
    return app.ready();
  });
  after(() => app.close());

  afterEach(mock.restore);

  it('capture an throw exception', async () => {
    let eventResult = {};

    const client = app.Sentry.getCurrentHub().getClient();
    client._options.beforeSend = event => {
      eventResult = { ...event };
      return null;
    };

    const result = await app.httpRequest()
      .get('/capture/throw?value=this is a throw Error');

    assert.deepEqual(result.status, 200);
    await sleep(500);

    assert.strictEqual(eventResult.exception.values[0].type, 'Error');
    assert.strictEqual(eventResult.exception.values[0].value, 'this is a throw Error');
  });

  it('capture an Context logger exception', async () => {
    let eventResult = {};

    const client = app.Sentry.getCurrentHub().getClient();
    client._options.beforeSend = event => {
      eventResult = { ...event };
      return null;
    };

    const result = await app.httpRequest()
      .get('/capture/message?value=capture an Context logger exception&type=Context');

    assert.deepEqual(result.status, 200);
    await sleep(500);

    assert.strictEqual(eventResult.exception.values[0].type, 'Error');
    assert.strictEqual(eventResult.exception.values[0].value, 'capture an Context logger exception');
  });

  it('capture an App logger exception', async () => {
    let eventResult = {};

    const client = app.Sentry.getCurrentHub().getClient();
    client._options.beforeSend = event => {
      eventResult = { ...event };
      return null;
    };

    const result = await app.httpRequest()
      .get('/capture/message?value=capture an App logger exception&type=App');

    assert.deepEqual(result.status, 200);
    await sleep(500);

    assert.strictEqual(eventResult.exception.values[0].type, 'Error');
    assert.strictEqual(eventResult.exception.values[0].value, 'capture an App logger exception');
  });

  it('capture an Core logger exception', async () => {
    let eventResult = {};

    const client = app.Sentry.getCurrentHub().getClient();
    client._options.beforeSend = event => {
      eventResult = { ...event };
      return null;
    };

    const result = await app.httpRequest()
      .get('/capture/message?value=capture an Core logger exception&type=Core');

    assert.deepEqual(result.status, 200);
    await sleep(500);

    assert.strictEqual(eventResult.exception.values[0].type, 'Error');
    assert.strictEqual(eventResult.exception.values[0].value, 'capture an Core logger exception');
  });
});
