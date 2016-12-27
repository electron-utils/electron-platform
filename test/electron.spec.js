'use strict';

const path = require('path');
const electron = require('electron');
const {Application} = require('spectron');
const assert = require('assert');
const {expect} = require('chai');

describe("electron", function () {
  this.timeout(0);
  let app = null;

  beforeEach(function () {
    app = new Application({
      path: electron,
      args: [path.join(__dirname, 'fixtures', 'app')]
    });
    return app.start();
  });

  afterEach(function () {
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
      });
  });

  it('should be ok in renderer process', function () {
    return app.client
      .waitUntilWindowLoaded()
      .getRenderProcessLogs()
      .then(function (logs) {
        expect(logs.length).to.equal(8);
        expect(logs[0].message).to.contains('isNode: true');
        expect(logs[1].message).to.contains('isElectron: true');
        expect(logs[2].message).to.contains('isNative: true');
        expect(logs[3].message).to.contains('isPureWeb: false');
        expect(logs[4].message).to.contains('isRendererProcess: true');
        expect(logs[5].message).to.contains('isMainProcess: false');
        expect(logs[6].message).to.contains('isDarwin: ' + (process.platform === 'darwin').toString());
        expect(logs[7].message).to.contains('isWin32: ' + (process.platform === 'win32').toString());
      });
  });
});

describe("electron without node-integration", function () {
  this.timeout(0);
  let app = null;

  beforeEach(function () {
    app = new Application({
      path: electron,
      args: [path.join(__dirname, 'fixtures', 'app-no-node-integration')],
      requireName: 'electronRequire'
    });
    return app.start();
  });

  afterEach(function () {
    if (app && app.isRunning()) {
      return app.stop();
    }
  });

  it('should be ok in renderer process', function () {
    return app.client
      .waitUntilWindowLoaded()
      .getRenderProcessLogs()
      .then(function (logs) {
        expect(logs.length).to.equal(8);
        expect(logs[0].message).to.contains('isNode: false');
        expect(logs[1].message).to.contains('isElectron: true');
        expect(logs[2].message).to.contains('isNative: true');
        expect(logs[3].message).to.contains('isPureWeb: false');
        expect(logs[4].message).to.contains('isRendererProcess: true');
        expect(logs[5].message).to.contains('isMainProcess: false');
        expect(logs[6].message).to.contains('isDarwin: ' + (process.platform === 'darwin').toString());
        expect(logs[7].message).to.contains('isWin32: ' + (process.platform === 'win32').toString());
      });
  });
});
