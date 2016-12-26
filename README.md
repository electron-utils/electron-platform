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

### isNode

Indicates whether executes in node.js application

### isElectron

Indicates whether executes in electron

### isNative

Indicates whether executes in native environment (compare to web-browser)

### isPureWeb

Indicates whether executes in common web browser

### isRendererProcess

Indicates whether executes in common web browser, or editor's renderer process(web-page)

### isMainProcess

Indicates whether executes in editor's main process

### isDarwin

Indicates whether executes in OSX

### isWin32

Indicates whether executes in Windows

### isRetina

Check if running in retina display

## License

MIT © 2016 Johnny Wu
