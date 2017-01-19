# electron-platform

[![Linux Build Status](https://travis-ci.org/electron-utils/electron-platform.svg?branch=master)](https://travis-ci.org/electron-utils/electron-platform)
[![Windows Build status](https://ci.appveyor.com/api/projects/status/ym6vcqcpqmv3dd34?svg=true)](https://ci.appveyor.com/project/jwu/electron-platform)
[![Dependency Status](https://david-dm.org/electron-utils/electron-platform.svg)](https://david-dm.org/electron-utils/electron-platform)
[![devDependency Status](https://david-dm.org/electron-utils/electron-platform/dev-status.svg)](https://david-dm.org/electron-utils/electron-platform#info=devDependencies)

Platform detection for Electron and Web Browser.

## Install

```bash
npm install --save electron-platform
```

## Usage

```javascript
const platform = require('electron-platform');

if ( platform.isRendererProcess ) {
  // do something
}
```

## API Reference

### Properties

#### isNode

Indicates whether executes in node.js application.

#### isElectron

Indicates whether executes in electron.

#### isNative

Indicates whether executes in native environment (compare to web-browser).

#### isPureWeb

Indicates whether executes in common web browser.

#### isRendererProcess

Indicates whether executes in common web browser, or editor's renderer process(web-page).

#### isMainProcess

Indicates whether executes in editor's main process.

#### isDarwin

Indicates whether executes in OSX.

#### isWin32

Indicates whether executes in Windows.

#### isDev

Check if running in retina display.
If we are in renderer process and `nodeIntegration` is false, isDev will be undefined.

#### isRetina

Check if running in retina display.

## License

MIT © 2017 Johnny Wu
