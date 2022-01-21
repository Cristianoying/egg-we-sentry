'use strict';

const path = require('path');
const fs = require('fs');

function loadModuleVersion(app, name = '') {
  const modulePath = path.join(app.baseDir, 'node_modules', name, 'package.json');
  if (fs.existsSync(modulePath)) {
    return require(modulePath).version;
  }
  return null;
}

let eggVersion = '';
let eggScriptsVersion = '';
let eggAliNodeVersion = '';
module.exports = (scope, ctx) => {
  const { app } = ctx;

  if (!eggVersion) {
    eggVersion = loadModuleVersion(app, 'egg');
    if (eggVersion) {
      scope.setExtra('egg', eggVersion);
    }
  }
  if (!eggScriptsVersion) {
    eggScriptsVersion = loadModuleVersion(app, 'egg-scripts');
    if (eggScriptsVersion) {
      scope.setExtra('egg-scripts', eggScriptsVersion);
    }
  }
  if (!eggAliNodeVersion) {
    eggAliNodeVersion = loadModuleVersion(app, 'egg-alinode');
    if (eggAliNodeVersion) {
      scope.setExtra('egg-alinode', eggAliNodeVersion);
    }
  }

  if (app.type) {
    scope.setTag('app.type', app.type);
  }

  const user = scope.getUser();
  if (!user.ip_address) {
    scope.setUser({
      ip_address: ctx.ips.length > 0 ? ctx.ips[0] : ctx.ip,
    });
  }
};
