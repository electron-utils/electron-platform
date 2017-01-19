'use strict';

const path = require('path');
const electron = require('electron');
const {Application} = require('spectron');
const assert = require('assert');

// DISABLE: tap failed with spectron
// issue reported: https://github.com/electron/spectron/issues/155
// const tap = require('tap');
// tap.test('electron', {autoend: false, timeout: 0}, t => {
//   let app = null;

//   t.beforeEach(() => {
//     app = new Application({
//       path: electron,
//       args: [path.join(__dirname, 'fixtures', 'app')]
//     });
//     return app.start();
//   });

//   t.afterEach(() => {
//     if (app && app.isRunning()) {
//       return app.stop();
//     }
//   });

//   t.test('should be ok in main process', () => {
//     t.equal('foo', 'foo');
//     t.end();
//   });
// });

describe('electron', function () {
  this.timeout(0);
  let app = null;

  before(function () {
    app = new Application({
      path: electron,
      args: [path.join(__dirname, 'fixtures', 'app')]
    });
    return app.start();
  });

  after(function () {
    if (app && app.isRunning()) {
      return app.stop();
    }
  });

  it('should be ok in main process', function () {
    return app.electron.remote.getGlobal('platform')
      .then(function (platform) {
        assert.equal(platform.isNode, true);
        assert.equal(platform.isElectron, true);
        assert.equal(platform.isNative, true);
        assert.equal(platform.isPureWeb, false);
        assert.equal(platform.isRendererProcess, false);
        assert.equal(platform.isMainProcess, true);
        assert.equal(platform.isDarwin, process.platform === 'darwin');
        assert.equal(platform.isWin32, process.platform === 'win32');
        assert.equal(platform.isDev, true);
      });
  });

  it('should be ok in renderer process', function () {
    return app.client
      .waitUntilWindowLoaded()
      .getRenderProcessLogs()
      .then(function (logs) {
        assert.equal(logs.length, 9);
        assert.ok(logs[0].message.indexOf('isNode: true') !== -1);
        assert.ok(logs[1].message.indexOf('isElectron: true') !== -1);
        assert.ok(logs[2].message.indexOf('isNative: true') !== -1);
        assert.ok(logs[3].message.indexOf('isPureWeb: false') !== -1);
        assert.ok(logs[4].message.indexOf('isRendererProcess: true') !== -1);
        assert.ok(logs[5].message.indexOf('isMainProcess: false') !== -1);
        assert.ok(logs[6].message.indexOf('isDarwin: ' + (process.platform === 'darwin').toString()) !== -1);
        assert.ok(logs[7].message.indexOf('isWin32: ' + (process.platform === 'win32').toString()) !== -1);
        assert.ok(logs[8].message.indexOf('isDev: true') !== -1);
      });
  });
});

describe('electron without node-integration', function () {
  this.timeout(0);
  let app = null;

  before(function () {
    app = new Application({
      path: electron,
      args: [path.join(__dirname, 'fixtures', 'app-no-node-integration')],
      requireName: 'electronRequire'
    });
    return app.start();
  });

  after(function () {
    if (app && app.isRunning()) {
      return app.stop();
    }
  });

  it('should be ok in renderer process', function () {
    return app.client
      .waitUntilWindowLoaded()
      .getRenderProcessLogs()
      .then(function (logs) {
        assert.equal(logs.length, 9);
        assert.ok(logs[0].message.indexOf('isNode: false') !== -1);
        assert.ok(logs[1].message.indexOf('isElectron: true') !== -1);
        assert.ok(logs[2].message.indexOf('isNative: true') !== -1);
        assert.ok(logs[3].message.indexOf('isPureWeb: false') !== -1);
        assert.ok(logs[4].message.indexOf('isRendererProcess: true') !== -1);
        assert.ok(logs[5].message.indexOf('isMainProcess: false') !== -1);
        assert.ok(logs[6].message.indexOf('isDarwin: ' + (process.platform === 'darwin').toString()) !== -1);
        assert.ok(logs[7].message.indexOf('isWin32: ' + (process.platform === 'win32').toString()) !== -1);
        assert.ok(logs[8].message.indexOf('isDev: undefined') !== -1);
      });
  });
});
