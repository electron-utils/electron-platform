'use strict';

(function (window, factory) {
  if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    window.platform = factory();
  }
})(this, function () {

  let platform = {};

  /**
   * @property isNode
   * @type boolean
   *
   * Indicates whether executes in node.js application.
   */
  platform.isNode = !!(typeof process !== 'undefined' && process.versions && process.versions.node);

  if (platform.isNode) {
    /**
     * @property isDarwin
     * @type boolean
     *
     * Indicates whether executes in OSX.
     */
    platform.isDarwin = process.platform === 'darwin';

    /**
     * @property isWin32
     * @type boolean
     *
     * Indicates whether executes in Windows.
     */
    platform.isWin32 = process.platform === 'win32';

    /**
     * @property isElectron
     * @type boolean
     *
     * Indicates whether executes in electron.
     */
    platform.isElectron = !!('electron' in process.versions);

  } else {
    // http://stackoverflow.com/questions/19877924/what-is-the-list-of-possible-values-for-navigator-platform-as-of-today
    let platform_ = window.navigator.platform;
    platform.isDarwin = platform_.substring(0, 3) === 'Mac';
    platform.isWin32 = platform_.substring(0, 3) === 'Win';

    platform.isElectron = window.navigator.userAgent.indexOf('Electron') !== -1;
  }

  /**
   * @property isNative
   * @type boolean
   *
   * Indicates whether executes in native environment (compare to web-browser).
   */
  platform.isNative = platform.isElectron;

  /**
   * @property isPureWeb
   * @type boolean
   *
   * Indicates whether executes in common web browser.
   */
  platform.isPureWeb = !platform.isNode && !platform.isNative;

  /**
   * @property isRendererProcess
   * @type boolean
   *
   * Indicates whether executes in common web browser, or editor's renderer process(web-page).
   */
  platform.isRendererProcess = typeof process === 'undefined' || process.type === 'renderer';

  /**
   * @property isMainProcess
   * @type boolean
   *
   * Indicates whether executes in editor's main process.
   */
  platform.isMainProcess = typeof process !== 'undefined' && process.type === 'browser';

  /**
   * @property isDev
   * @type boolean
   *
   * Check if Electron is running in development.
   * If we are in renderer process and `nodeIntegration` is false, isDev will be undefined.
   */
  // NOTE: Reference from https://github.com/sindresorhus/electron-is-dev
  if ( typeof process !== 'undefined' ) {
    platform.isDev = process.defaultApp || /[\\/]electron-prebuilt[\\/]/.test(process.execPath) || /[\\/]electron[\\/]/.test(process.execPath);
  }

  /**
   * @property isRetina
   * @type boolean
   *
   * Check if running in retina display.
   */
  Object.defineProperty(platform, 'isRetina', {
    enumerable: true,
    get () {
      return platform.isRendererProcess && window.devicePixelRatio && window.devicePixelRatio > 1;
    }
  });

  return platform;
});
