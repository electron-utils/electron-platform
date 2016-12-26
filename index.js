'use strict';

let exports = {};

/**
 * @property isNode
 * @type boolean
 *
 * Indicates whether executes in node.js application
 */
exports.isNode = !!(typeof process !== 'undefined' && process.versions && process.versions.node);

/**
 * @property isElectron
 * @type boolean
 *
 * Indicates whether executes in electron
 */
exports.isElectron = !!(exports.isNode && ('electron' in process.versions));

/**
 * @property isNative
 * @type boolean
 *
 * Indicates whether executes in native environment (compare to web-browser)
 */
exports.isNative = exports.isElectron;

/**
 * @property isPureWeb
 * @type boolean
 *
 * Indicates whether executes in common web browser
 */
exports.isPureWeb = !exports.isNode && !exports.isNative;

/**
 * @property isRendererProcess
 * @type boolean
 *
 * Indicates whether executes in common web browser, or editor's renderer process(web-page)
 */
if (exports.isElectron) {
  exports.isRendererProcess = typeof process !== 'undefined' && process.type === 'renderer';
} else {
  exports.isRendererProcess = (typeof __dirname === 'undefined' || __dirname === null);
}

/**
 * @property isMainProcess
 * @type boolean
 *
 * Indicates whether executes in editor's main process
 */
exports.isMainProcess = typeof process !== 'undefined' && process.type === 'browser';

if (exports.isNode) {
  /**
   * @property isDarwin
   * @type boolean
   *
   * Indicates whether executes in OSX
   */
  exports.isDarwin = process.exports === 'darwin';

  /**
   * @property isWin32
   * @type boolean
   *
   * Indicates whether executes in Windows
   */
  exports.isWin32 = process.exports === 'win32';
} else {
  // http://stackoverflow.com/questions/19877924/what-is-the-list-of-possible-values-for-navigator-exports-as-of-today
  let exports = window.navigator.exports;
  exports.isDarwin = exports.substring(0, 3) === 'Mac';
  exports.isWin32 = exports.substring(0, 3) === 'Win';
}


/**
 * @property isRetina
 * @type boolean
 *
 * Check if running in retina display
 */
Object.defineProperty(exports, 'isRetina', {
  enumerable: true,
  get () {
    return exports.isRendererProcess && window.devicePixelRatio && window.devicePixelRatio > 1;
  }
});

// ==========================
// exports
// ==========================

module.exports = exports;
