# electron-platform

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

## Properties

### platform.isNode

Indicates whether executes in node.js application

### platform.isElectron

Indicates whether executes in electron

### platform.isNative

Indicates whether executes in native environment (compare to web-browser)

### platform.isPureWeb

Indicates whether executes in common web browser

### platform.isRendererProcess

Indicates whether executes in common web browser, or editor's renderer process(web-page)

### platform.isMainProcess

Indicates whether executes in editor's main process

### platform.isDarwin

Indicates whether executes in OSX

### platform.isWin32

Indicates whether executes in Windows

### platform.isRetina

Check if running in retina display

## License

MIT © 2016 Johnny Wu
