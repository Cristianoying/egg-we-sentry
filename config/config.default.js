'use strict';

/**
 * egg-we-sentry default config
 * @member Config#weSentry
 * @property {String} SOME_KEY - some description
 */
const config = {};
config.weSentry = {
  dsn: '',
  testTracesSampleRate: 1.0,
  prodTracesSampleRate: 1.0,
  infoKeys: {
    user: {

    },
    tags: {

    },
  },
};

module.exports = config;
