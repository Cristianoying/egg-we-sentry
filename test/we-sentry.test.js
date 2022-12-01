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
    assert.strictEqual(tracesSampleRate, 1);
  });
});

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
