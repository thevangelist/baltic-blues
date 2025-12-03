// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        globalObject
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"b85s8":[function(require,module,exports,__globalThis) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "48d4a72fc3fdd8eb";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , disposedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && ![
        'localhost',
        '127.0.0.1',
        '0.0.0.0'
    ].includes(hostname) ? 'wss' : 'ws';
    var ws;
    if (HMR_USE_SSE) ws = new EventSource('/__parcel_hmr');
    else try {
        ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
    } catch (err) {
        if (err.message) console.error(err.message);
        ws = {};
    }
    // Web extension context
    var extCtx = typeof browser === 'undefined' ? typeof chrome === 'undefined' ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes('test.js');
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        disposedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === 'reload') fullReload();
        else if (data.type === 'update') {
            // Remove error overlay if there is one
            if (typeof document !== 'undefined') removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') window.dispatchEvent(new CustomEvent('parcelhmraccept'));
                await hmrApplyUpdates(assets);
                hmrDisposeQueue();
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                let processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
            }
            if (typeof document !== 'undefined') {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    if (ws instanceof WebSocket) {
        ws.onerror = function(e) {
            if (e.message) console.error(e.message);
        };
        ws.onclose = function() {
            console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
        };
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, '') : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + '</div>').join('')}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ''}
      </div>
    `;
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ('reload' in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute('href');
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', // $FlowFixMe
    href.split('?')[0] + '?' + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === 'js') {
        if (typeof document !== 'undefined') {
            let script = document.createElement('script');
            script.src = asset.url + '?t=' + Date.now();
            if (asset.outputFormat === 'esmodule') script.type = 'module';
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === 'function') {
            // Worker scripts
            if (asset.outputFormat === 'esmodule') return import(asset.url + '?t=' + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + '?t=' + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != 'undefined' && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        }
        // Always traverse to the parent bundle, even if we already replaced the asset in this bundle.
        // This is required in case modules are duplicated. We need to ensure all instances have the updated code.
        if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDisposeQueue() {
    // Dispose all old assets.
    for(let i = 0; i < assetsToDispose.length; i++){
        let id = assetsToDispose[i][1];
        if (!disposedAssets[id]) {
            hmrDispose(assetsToDispose[i][0], id);
            disposedAssets[id] = true;
        }
    }
    assetsToDispose = [];
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        let assetsToAlsoAccept = [];
        cached.hot._acceptCallbacks.forEach(function(cb) {
            let additionalAssets = cb(function() {
                return getParents(module.bundle.root, id);
            });
            if (Array.isArray(additionalAssets) && additionalAssets.length) assetsToAlsoAccept.push(...additionalAssets);
        });
        if (assetsToAlsoAccept.length) {
            let handled = assetsToAlsoAccept.every(function(a) {
                return hmrAcceptCheck(a[0], a[1]);
            });
            if (!handled) return fullReload();
            hmrDisposeQueue();
        }
    }
}

},{}],"g9e9u":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _bgPng = require("./images/bg.png");
var _bgPngDefault = parcelHelpers.interopDefault(_bgPng);
var _patrolPng = require("./images/patrol.png");
var _patrolPngDefault = parcelHelpers.interopDefault(_patrolPng);
var _tankerSprite2Png = require("./images/tanker-sprite-2.png");
var _tankerSprite2PngDefault = parcelHelpers.interopDefault(_tankerSprite2Png);
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const DEFAULT_WIDTH = 800;
const DEFAULT_HEIGHT = 500;
canvas.width = DEFAULT_WIDTH;
canvas.height = DEFAULT_HEIGHT;
const TANKER_IMAGE_WIDTH = 344, TANKER_IMAGE_HEIGHT = 52;
let score = 0;
let gameFrame = 0;
let warnings = 0;
const gameSpeed = 1;
let previousChainLength = 0;
let isPaused = false;
let detectionRisk = 0; // 0-100 scale for patrol detection risk
ctx.font = '24px sans-serif';
// Expose game state to window for cross-module access
window.gameState = {
    get isPaused () {
        return isPaused;
    },
    set isPaused (value){
        isPaused = value;
        // Pause/resume all audio when game is paused
        if (isPaused) pauseAllAudio();
        else resumeAllAudio();
    }
};
// Audio control functions
function pauseAllAudio() {
    const allAudio = document.querySelectorAll('audio');
    allAudio.forEach((audio)=>{
        if (!audio.paused) audio.pause();
    });
}
function resumeAllAudio() {
    // Only resume looping background audio, not one-shot sounds
    music.play().catch(()=>{});
    wind1.play().catch(()=>{});
    waves.play().catch(()=>{});
    ship.play().catch(()=>{});
}
// Audio elements map
const audioElements = {
    metal1: document.getElementById('metal1'),
    metal2: document.getElementById('metal2'),
    metal3: document.getElementById('metal3'),
    metal4: document.getElementById('metal4'),
    metal5: document.getElementById('metal5')
};
// All other audio elements
const music = document.getElementById('music');
const wind1 = document.getElementById('wind1');
const waves = document.getElementById('waves');
const ship = document.getElementById('ship');
const winch1 = document.getElementById('winch1');
const winch5 = document.getElementById('winch5');
const winch8 = document.getElementById('winch8');
const scrape7 = document.getElementById('scrape7');
const alarm1 = document.getElementById('alarm1');
const splash = document.getElementById('splash');
// Get metal sounds from audioElements for convenience
const metal1 = audioElements.metal1;
const metal2 = audioElements.metal2;
const metal3 = audioElements.metal3;
const metal4 = audioElements.metal4;
const metal5 = audioElements.metal5;
const targetPosition = {
    x: canvas.width / 2 - TANKER_IMAGE_WIDTH / 2,
    y: canvas.height / 1.5
};
document.addEventListener('keydown', function(e) {
    e.preventDefault();
    // Reel anchor up - slower (harder to pull up)
    if (e.key === 'ArrowUp') {
        tanker.chainLength = Math.max(0, tanker.chainLength - 5);
        winch8.volume = 0.25;
        winch8.play().catch(()=>{});
    }
    // Lower anchor - faster (easier to drop) - only if anchors remain
    if (e.key === 'ArrowDown' && hud.remainingAnchors > 0) {
        tanker.chainLength = Math.min(tanker.chainLength + 20, tanker.chainLengthMax);
        winch1.volume = 0.25;
        winch1.play().catch(()=>{});
    }
    // Back
    if (e.key === 'ArrowLeft') targetPosition.x -= 5;
    // Forward
    if (e.key === 'ArrowRight') targetPosition.x += 20;
});
// Player
const tankerImage = new Image();
tankerImage.src = (0, _tankerSprite2PngDefault.default);
class Tanker {
    constructor(){
        this.x = targetPosition.x;
        this.y = targetPosition.y;
        this.frameX = 0;
        this.frameY = 0;
        this.frame = 0;
        this.spriteWidth = TANKER_IMAGE_WIDTH;
        this.spriteHeight = TANKER_IMAGE_HEIGHT;
        this.chainLength = 0;
        this.chainLengthMax = 2000; // Increased to allow 4x depth (max depth ~470, so 4x ~1880)
    }
    update() {
        const dx = this.x - targetPosition.x;
        const dy = this.y - targetPosition.y;
        // Calculate speed reduction based on anchor dragging
        let speedMultiplier = 1.0; // Normal speed
        // EXTREME slowdown when dragging through a cable (5 seconds after cable cut)
        if (hud.lastCableCut && gameFrame - hud.lastCableTime < 300) {
            // Nearly stopped: 2-8% speed depending on cable difficulty
            const cableDifficulty = hud.lastCableCut.difficulty || 1;
            speedMultiplier = 0.02 + cableDifficulty * 0.012; // Harder cables = slightly more resistance
        } else if (this.chainLength > 0) {
            // Anchor is deployed - boat slows down
            if (this.chainLength >= hud.depth) {
                // Anchor is touching/dragging on seabed - dramatic slowdown
                const dragAmount = this.chainLength - hud.depth;
                const maxDrag = hud.depth * 4; // Max optimal range
                const dragRatio = Math.min(dragAmount / maxDrag, 1.0);
                // Speed reduces dramatically: 30% speed when just touching, down to 5% at max drag
                speedMultiplier = 0.3 - dragRatio * 0.25;
            } else {
                // Anchor deployed but not touching seabed - moderate slowdown based on chain length
                const deployRatio = Math.min(this.chainLength / hud.depth, 1.0);
                // Speed reduces from 100% to 50% as anchor gets closer to seabed
                speedMultiplier = 1.0 - deployRatio * 0.5;
            }
        }
        // Apply speed with drag resistance
        const effectiveSpeed = 100 / speedMultiplier;
        if (targetPosition.x != this.x) this.x -= dx / effectiveSpeed;
        if (targetPosition.y != this.y) this.y -= dy / effectiveSpeed;
        if (gameFrame % 5 == 0) {
            // Dynamic animation based on chain length relative to optimal range
            const minOptimal = hud.depth * 2;
            const maxOptimal = hud.depth * 4;
            const inSweetSpot = this.chainLength >= minOptimal && this.chainLength <= maxOptimal;
            if (this.chainLength < 10) {
                // No anchor deployed
                this.frameY = 0;
                this.frameX = 0;
            } else if (this.chainLength < minOptimal * 0.5) {
                // Light deployment (< half of min optimal)
                this.frameY = 1;
                this.frameX = 0;
            } else if (!inSweetSpot) {
                // Moderate deployment (approaching or past sweet spot)
                if (Math.random() <= 0.01) winch5.play().catch(()=>{});
                if (Math.random() <= 0.96) {
                    this.frameY = 0;
                    this.frameX = 1;
                } else {
                    this.frameY = 0;
                    this.frameX = 2;
                }
            } else // In sweet spot (2x-4x depth)
            if (Math.random() <= 0.8) {
                this.frameY = 0;
                this.frameX = 2;
            } else {
                this.frameY = 1;
                this.frameX = 2;
            }
            // Scraping and creaking sounds when anchor is dragging on seabed
            if (this.chainLength >= hud.depth) {
                const dragAmount = this.chainLength - hud.depth;
                const maxDrag = hud.depth * 4;
                const dragRatio = Math.min(dragAmount / maxDrag, 1.0);
                // More frequent sounds the more you drag: 5% base, up to 25% at max drag
                const soundChance = 0.05 + dragRatio * 0.20;
                if (Math.random() <= soundChance) {
                    // Random metal creaking sounds
                    const metalSounds = [
                        metal1,
                        metal2,
                        metal3,
                        metal4,
                        metal5
                    ];
                    const randomMetal = metalSounds[Math.floor(Math.random() * metalSounds.length)];
                    randomMetal.volume = 0.08 + dragRatio * 0.12; // Louder with more drag
                    randomMetal.play().catch(()=>{});
                    this.frameY = 1;
                    this.frameX = 2;
                }
                // Scraping sound at optimal dragging depth
                if (hud.isAnchorDown && Math.random() <= 0.08) {
                    scrape7.volume = 0.12 + dragRatio * 0.08;
                    scrape7.play().catch(()=>{});
                }
            }
        }
    }
    draw() {
        ctx.drawImage(tankerImage, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.spriteWidth, this.spriteHeight);
    }
}
const tanker = new Tanker();
const background = new Image();
background.src = (0, _bgPngDefault.default);
const BG = {
    x1: 0,
    x2: canvas.width,
    y: 0,
    width: canvas.width,
    height: canvas.height
};
function createBackground() {
    BG.x1 -= gameSpeed;
    BG.x2 -= gameSpeed;
    if (BG.x1 < -BG.width) BG.x1 = BG.x2 + BG.width; // Add new background when current moves out
    if (BG.x2 < -BG.width) BG.x2 = BG.x1 + BG.width; // Add new background when current moves out
    // Draw the background images on both sides
    ctx.drawImage(background, BG.x1, BG.y, BG.width, BG.height);
    ctx.drawImage(background, BG.x2, BG.y, BG.width, BG.height);
}
// Patrols
const patrolsArray = [];
const patrolImage = new Image();
patrolImage.src = (0, _patrolPngDefault.default);
class Patrol {
    constructor(){
        // Spawn patrols off-screen to the right with some randomness
        this.x = canvas.width + Math.random() * canvas.width * 0.5;
        // Y position varies slightly for visual interest
        this.y = canvas.height / 1.4 + (Math.random() * 40 - 20);
        this.frameX = 0;
        this.frameY = 0;
        this.distance;
        this.frame = 0;
        this.spriteWidth = 52;
        this.spriteHeight = 52;
        this.sound = Math.random() <= 0.5 ? 'alarm1' : 'alarm2';
        this.speed = 0.3 + Math.random() * 0.4; // Initial speed 0.3-0.7
    }
    update() {
        this.age++;
        this.x -= this.speed; // Move upward
    }
    setSpeed(speed) {
        this.speed = speed;
    }
    draw() {
        ctx.drawImage(patrolImage, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.spriteWidth, this.spriteHeight);
    }
}
function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// Particle system for water splash effects
class Particle {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 2; // Small horizontal velocity
        this.vy = Math.random() * -2 - 0.5; // Small upward velocity
        this.gravity = 0.15;
        this.life = 1.0;
        this.decay = 0.05; // Faster fade for brief splash
        this.size = Math.random() * 1.5 + 1; // Very small particles (1-2.5px)
        this.color = `rgba(255, 255, 255, ${this.life})`;
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity;
        this.life -= this.decay;
        const alpha = this.life * 0.6;
        this.color = `rgba(220, 240, 255, ${alpha})`;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
    isDead() {
        return this.life <= 0;
    }
}
const particlesArray = [];
function createSplashParticles(x, y, count = 15) {
    for(let i = 0; i < count; i++)particlesArray.push(new Particle(x, y));
}
function updateParticles() {
    for(let i = particlesArray.length - 1; i >= 0; i--){
        particlesArray[i].update();
        particlesArray[i].draw();
        if (particlesArray[i].isDead()) particlesArray.splice(i, 1);
    }
}
function createPatrols() {
    // Don't spawn patrols for the first 90 seconds (5400 frames) to give player time to learn
    const minimumStartDelay = 5400; // 90 seconds at 60 FPS
    // Spawn patrols very rarely: every 200-600 seconds / 3.3-10 minutes (at 60 FPS)
    if (gameFrame > minimumStartDelay && gameFrame % randomBetween(12000, 36000) === 0) patrolsArray.push(new Patrol());
    // Calculate detection risk ONLY if anchor is down
    detectionRisk = 0;
    for(let i = 0; i < patrolsArray.length; i++){
        // alarm1.play()
        patrolsArray[i].update();
        patrolsArray[i].draw();
        if (patrolsArray[i].x > 200 && patrolsArray[i].x < 700) {
            patrolsArray[i].setSpeed(0.5);
            // Only calculate risk if anchor is down
            if (tanker.chainLength > 0) {
                const distance = Math.abs(patrolsArray[i].x - (tanker.x + TANKER_IMAGE_WIDTH / 2));
                if (distance < 400) {
                    // Exponential decay: risk drops off quickly with distance
                    // At distance 0: 100%, at 200: ~14%, at 400: ~2%
                    const proximityRisk = 100 * Math.exp(-distance / 100);
                    detectionRisk = Math.max(detectionRisk, proximityRisk);
                }
            }
            if (patrolsArray[i].x > 400 && patrolsArray[i].x < 550) {
                if (tanker.chainLength != 0) {
                    // Accumulate warnings faster when in critical detection zone
                    warnings += 2;
                    detectionRisk = Math.max(detectionRisk, 85); // Very high risk in detection zone with anchor down
                }
                patrolsArray[i].setSpeed(0.3);
            }
        } else patrolsArray[i].setSpeed(1);
        if (patrolsArray[i].x < -52) {
            score++;
            patrolsArray.splice(i, 1);
            i--;
        }
    }
}
function createTanker() {
    tanker.update();
    tanker.draw();
    // Anchor position at the front right of the ship
    const anchorX = tanker.x + TANKER_IMAGE_WIDTH * 0.9; // Front right edge
    const anchorY = tanker.y + TANKER_IMAGE_HEIGHT; // At ship's bottom edge
    // Play warning alarm when entering critical depth (5x)
    // Actual anchor loss is handled by Hud.update()
    const anchorLossThreshold = hud.depth * 5;
    if (tanker.chainLength >= anchorLossThreshold) {
        if (previousChainLength < anchorLossThreshold) {
            // First time crossing threshold - play alarm
            alarm1.volume = 0.3;
            alarm1.play().catch(()=>{});
        }
    }
    // Check if anchor was just lost (from Hud.update())
    if (hud.anchorLost && gameFrame === hud.anchorLostTime) {
        createSplashParticles(anchorX, anchorY, 25); // Big splash
        splash.volume = 0.3;
        splash.play().catch(()=>{});
        // Add detection risk penalty
        detectionRisk = Math.min(100, detectionRisk + 20);
    }
    // Trigger small splash when anchor first deploys (0 -> 10+)
    if (tanker.chainLength >= 10 && previousChainLength === 0) {
        createSplashParticles(anchorX, anchorY, 10);
        splash.volume = 0.1;
        splash.play().catch(()=>{});
    }
    // Trigger splash when anchor is raised (10+ -> 0)
    // More particles if raising from deep deployment
    if (tanker.chainLength === 0 && previousChainLength >= 10) {
        const particleCount = Math.min(15, 8 + Math.floor(previousChainLength / 100));
        createSplashParticles(anchorX, anchorY, particleCount);
        splash.volume = Math.min(0.2, 0.1 + previousChainLength / 5000);
        splash.play().catch(()=>{});
    }
    previousChainLength = tanker.chainLength;
}
// Cable type definitions with gameplay properties
const CABLE_TYPES = {
    SCRAP: {
        name: 'Old Scrap Cable',
        color: '#8b8b7a',
        difficulty: 1,
        reward: 1,
        risk: 1,
        rarity: 0.35,
        riskIncrease: 0
    },
    RESEARCH: {
        name: 'Research Sensor Cable',
        color: '#5a8ca8',
        difficulty: 1,
        reward: 2,
        risk: 1,
        rarity: 0.30,
        riskIncrease: 5
    },
    FIBER: {
        name: 'Fiber Data Cable',
        color: '#a8f088',
        difficulty: 3,
        reward: 4,
        risk: 3,
        rarity: 0.25,
        riskIncrease: 15
    },
    MILITARY: {
        name: 'Military Surveillance Line',
        color: '#ff6b7a',
        difficulty: 5,
        reward: 4,
        risk: 5,
        rarity: 0.06,
        riskIncrease: 40
    },
    HVDC: {
        name: 'HVDC Power Cable',
        color: '#ffa940',
        difficulty: 5,
        reward: 5,
        risk: 5,
        rarity: 0.04,
        riskIncrease: 35
    }
};
class Hud {
    constructor(){
        this.depth = Math.floor(this.generateRealisticDepth());
        this.isAnchorDown = false;
        this.draggedInMeters = 0;
        this.cablesCut = 0; // Total cables severed
        this.cablesByType = {
            SCRAP: 0,
            RESEARCH: 0,
            FIBER: 0,
            MILITARY: 0,
            HVDC: 0
        };
        this.lastCableCut = null; // Store last cable cut info
        this.lastCableTime = 0; // When last cable was cut
        this.depthHistory = []; // Track past depths for graph
        this.futureDepths = []; // Track upcoming depths for graph
        this.maxHistoryLength = 30; // Keep 30 past readings (50% of graph)
        this.maxFutureLength = 30; // Keep 30 future readings (50% of graph)
        this.depthTrend = 0; // Tracks if we're in shallow basin or approaching deep depression
        this.optimalCenterDepth = 3.0; // Center of optimal range (varies between 2.5-3.5)
        this.optimalVariance = 0.3; // ±0.3 around center
        this.remainingAnchors = 2; // Ship has 2 anchors total
        this.anchorLost = false; // Track if anchor was just lost
        this.anchorLostTime = 0; // When anchor was lost
        this.anchorLossReason = ''; // Track reason: 'cable' or 'depth'
        this.anchorDangerStartTime = 0; // Track when anchor entered danger zone
        this.missionSuccess = false; // Track if mission succeeded
        this.successTime = 0; // When mission was completed
        // Pre-generate initial future depths
        this.generateFutureDepths();
    }
    // Select random cable type based on rarity
    selectCableType() {
        const roll = Math.random();
        let cumulative = 0;
        for (const [key, cable] of Object.entries(CABLE_TYPES)){
            cumulative += cable.rarity;
            if (roll < cumulative) return {
                type: key,
                ...cable
            };
        }
        return {
            type: 'SCRAP',
            ...CABLE_TYPES.SCRAP
        };
    }
    // Generate future depth predictions
    generateFutureDepths() {
        this.futureDepths = [];
        let lastDepth = this.depth;
        for(let i = 0; i < this.maxFutureLength; i++){
            // Use same gradual depth generation with smoothing
            if (Math.random() < 0.90) {
                // Very smooth transition (90% of the time)
                const targetDepth = this.generateRealisticDepth();
                lastDepth = Math.floor(lastDepth * 0.92 + targetDepth * 0.08);
            } else if (Math.random() < 0.97) {
                // Moderate change (7% of the time)
                const targetDepth = this.generateRealisticDepth();
                lastDepth = Math.floor(lastDepth * 0.75 + targetDepth * 0.25);
            } else // Sudden change (3% of the time)
            lastDepth = Math.floor(this.generateRealisticDepth());
            this.futureDepths.push(lastDepth);
        }
    }
    // Update optimal depth with variance (simulates cable depth variations)
    updateOptimalDepth() {
        // Slowly vary the optimal depth between 2.5-3.5x
        this.optimalCenterDepth += (Math.random() - 0.5) * 0.05; // Small random walk
        // Clamp between 2.5 and 3.5
        this.optimalCenterDepth = Math.max(2.5, Math.min(3.5, this.optimalCenterDepth));
    }
    // Generate realistic Baltic Sea depth with varied terrain
    generateRealisticDepth() {
        const rand = Math.random();
        // 70% shallow basin (20-80m) - typical Baltic Sea
        if (rand < 0.70) return randomBetween(20, 80);
        else if (rand < 0.90) return randomBetween(80, 150);
        else if (rand < 0.98) return randomBetween(150, 300);
        else return randomBetween(300, 459);
    }
    update() {
        // Less frequent depth changes: every 600 frames (10 seconds at 60 FPS)
        if (gameFrame % 600 == 0) {
            // Move current depth to history
            this.depthHistory.push(this.depth);
            if (this.depthHistory.length > this.maxHistoryLength) this.depthHistory.shift(); // Remove oldest
            // Move first future depth to current
            if (this.futureDepths.length > 0) this.depth = this.futureDepths.shift();
            // Generate one new future depth to maintain the array
            if (this.futureDepths.length > 0) {
                const lastFuture = this.futureDepths[this.futureDepths.length - 1];
                let newFutureDepth;
                // Much more gradual depth transitions
                if (Math.random() < 0.90) {
                    // Very smooth transition (90% of the time)
                    const targetDepth = this.generateRealisticDepth();
                    newFutureDepth = Math.floor(lastFuture * 0.92 + targetDepth * 0.08);
                } else if (Math.random() < 0.97) {
                    // Moderate change (7% of the time)
                    const targetDepth = this.generateRealisticDepth();
                    newFutureDepth = Math.floor(lastFuture * 0.75 + targetDepth * 0.25);
                } else // Sudden change (3% of the time)
                newFutureDepth = Math.floor(this.generateRealisticDepth());
                this.futureDepths.push(newFutureDepth);
            }
            // Update optimal cable depth variance
            this.updateOptimalDepth();
        }
        if (gameFrame % 30 == 0) {
            // Dynamic optimal range: center ±variance (e.g., 3.0 ±0.3 = 2.7-3.3x depth)
            const minOptimal = this.depth * (this.optimalCenterDepth - this.optimalVariance);
            const maxOptimal = this.depth * (this.optimalCenterDepth + this.optimalVariance);
            const perfectOptimal = this.depth * this.optimalCenterDepth; // Best depth (e.g., 3.0x)
            // Check if anchor is deployed deep enough to drag (min optimal or deeper)
            const anchorLossThreshold = this.depth * 5; // Critical depth
            const dangerZoneEnd = maxOptimal * 1.5;
            const inDangerZone = tanker.chainLength > maxOptimal && tanker.chainLength <= dangerZoneEnd;
            const inCriticalZone = tanker.chainLength >= anchorLossThreshold;
            // Allow cable cutting at any depth >= minOptimal (including danger zone)
            this.isAnchorDown = tanker.chainLength >= minOptimal && !inCriticalZone;
            if (this.isAnchorDown) {
                this.draggedInMeters += 10;
                // Cable encounter probability based on how close to perfect depth
                const depthDiff = Math.abs(tanker.chainLength - perfectOptimal);
                const maxDiff = perfectOptimal * this.optimalVariance;
                // Probability calculation
                let encounterChance;
                if (tanker.chainLength <= maxOptimal) // GREEN ZONE: 1.0 at perfect depth, decreases to 0.3 at edges
                encounterChance = 1.0 - depthDiff / maxDiff * 0.7;
                else if (inDangerZone) {
                    // DANGER ZONE (too deep): reduced efficiency (0.15 - 0.05)
                    const dangerDepth = (tanker.chainLength - maxOptimal) / (dangerZoneEnd - maxOptimal);
                    encounterChance = 0.15 - dangerDepth * 0.10;
                } else encounterChance = 0.05; // Very low outside zones
                // Extremely rare: 0.15% base chance per check
                if (Math.random() < encounterChance * 0.0015) {
                    // Select cable type
                    const cable = this.selectCableType();
                    // Difficulty check: harder cables need better depth accuracy
                    const difficultyThreshold = 1.0 - cable.difficulty * 0.15; // Difficulty 5 = 0.25 threshold
                    const passedCheck = encounterChance >= difficultyThreshold;
                    if (passedCheck) {
                        this.cablesCut++;
                        this.cablesByType[cable.type]++;
                        this.lastCableCut = cable;
                        this.lastCableTime = gameFrame;
                        // WIN CONDITION: Successfully cutting MILITARY or HVDC cable wins the mission!
                        if (cable.type === 'MILITARY' || cable.type === 'HVDC') {
                            this.missionSuccess = true;
                            this.successTime = gameFrame;
                        }
                        // Increase detection risk based on cable type
                        detectionRisk = Math.min(100, detectionRisk + cable.riskIncrease);
                        // Risk of losing anchor when cutting cable (higher for harder cables)
                        // SCRAP: 5%, RESEARCH: 10%, FIBER: 25%, MILITARY: 40%, HVDC: 50%
                        const anchorLossChance = cable.difficulty * 0.10;
                        if (Math.random() < anchorLossChance && this.remainingAnchors > 0) {
                            this.remainingAnchors--;
                            this.anchorLost = true;
                            this.anchorLostTime = gameFrame;
                            this.anchorLossReason = 'cable'; // Lost due to cable cutting
                            tanker.chainLength = 0; // Anchor is lost, chain goes to zero
                            // Play alarm sound
                            alarm1.volume = 0.3;
                            alarm1.play().catch(()=>{});
                            console.log(`Anchor lost from cable! Remaining: ${this.remainingAnchors}`);
                        }
                        // Play appropriate sound based on cable reward
                        if (cable.reward >= 4) {
                            // High value cables - louder, more distinct sound
                            metal3.volume = 0.25;
                            metal3.play().catch(()=>{});
                            setTimeout(()=>{
                                metal4.volume = 0.2;
                                metal4.play().catch(()=>{});
                            }, 100);
                        } else if (cable.reward >= 2) {
                            // Medium value
                            metal3.volume = 0.15;
                            metal3.play().catch(()=>{});
                        } else {
                            // Low value - subtle sound
                            metal1.volume = 0.1;
                            metal1.play().catch(()=>{});
                        }
                    }
                }
            }
            // Check if anchor is in critical danger zone (>5x depth) for too long
            // (anchorLossThreshold already defined above in cable cutting logic)
            if (tanker.chainLength >= this.depth * 5) {
                // Anchor is critically deep
                if (this.anchorDangerStartTime === 0) // Just entered danger zone
                this.anchorDangerStartTime = gameFrame;
                else if (gameFrame - this.anchorDangerStartTime > 300 && this.remainingAnchors > 0) {
                    // Been in danger zone for 5 seconds (300 frames) - lose anchor!
                    this.remainingAnchors--;
                    this.anchorLost = true;
                    this.anchorLostTime = gameFrame;
                    this.anchorLossReason = 'depth'; // Lost due to being too deep
                    tanker.chainLength = 0; // Anchor is lost
                    this.anchorDangerStartTime = 0; // Reset timer
                    // Play alarm sound
                    alarm1.volume = 0.3;
                    alarm1.play().catch(()=>{});
                    console.log(`Anchor lost from depth! Remaining: ${this.remainingAnchors}`);
                }
            } else // Not in danger zone, reset timer
            this.anchorDangerStartTime = 0;
        }
    }
}
const hud = new Hud();
function createHud() {
    hud.update();
}
function drawHUD() {
    // Set up HUD styling
    ctx.save();
    // Cable cut notification banner (center top)
    if (hud.lastCableCut && gameFrame - hud.lastCableTime < 1800) {
        const elapsed = gameFrame - hud.lastCableTime;
        const opacity = elapsed < 1740 ? 1.0 : (1800 - elapsed) / 60; // Fade out in last 1s
        const bannerWidth = 400;
        const bannerHeight = 70;
        const bannerX = (canvas.width - bannerWidth) / 2;
        const bannerY = 20;
        // Background
        ctx.globalAlpha = opacity * 0.95;
        ctx.fillStyle = 'rgba(10, 26, 36, 0.95)';
        ctx.fillRect(bannerX, bannerY, bannerWidth, bannerHeight);
        // Border with cable color
        ctx.strokeStyle = hud.lastCableCut.color;
        ctx.lineWidth = 3;
        ctx.strokeRect(bannerX, bannerY, bannerWidth, bannerHeight);
        // Title
        ctx.fillStyle = '#a8f088';
        ctx.font = 'bold 13px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText("\u2693 CABLE DAMAGED", bannerX + bannerWidth / 2, bannerY + 20);
        // Cable type name
        ctx.fillStyle = hud.lastCableCut.color;
        ctx.font = 'bold 16px sans-serif';
        ctx.fillText(hud.lastCableCut.name.toUpperCase(), bannerX + bannerWidth / 2, bannerY + 42);
        // Stats (Reward & Risk)
        ctx.font = '11px sans-serif';
        ctx.fillStyle = '#e8e8d8';
        const rewardStars = "\u2605".repeat(hud.lastCableCut.reward);
        const riskLevel = hud.lastCableCut.risk >= 4 ? 'HIGH RISK' : hud.lastCableCut.risk >= 3 ? 'MEDIUM' : 'LOW RISK';
        ctx.fillText(`Value: ${rewardStars} | ${riskLevel}`, bannerX + bannerWidth / 2, bannerY + 60);
        ctx.globalAlpha = 1.0;
        ctx.textAlign = 'left';
    }
    // Anchor lost notification banner (center top, below cable notification)
    if (hud.anchorLost && gameFrame - hud.anchorLostTime < 1800) {
        const elapsed = gameFrame - hud.anchorLostTime;
        const opacity = elapsed < 1740 ? 1.0 : (1800 - elapsed) / 60; // Fade out in last 1s
        const bannerWidth = 450;
        const bannerHeight = 80;
        const bannerX = (canvas.width - bannerWidth) / 2;
        const bannerY = 100; // Below cable notification
        // Background
        ctx.globalAlpha = opacity * 0.95;
        ctx.fillStyle = 'rgba(139, 0, 0, 0.95)'; // Dark red background
        ctx.fillRect(bannerX, bannerY, bannerWidth, bannerHeight);
        // Border
        ctx.strokeStyle = '#ff6b7a';
        ctx.lineWidth = 3;
        ctx.strokeRect(bannerX, bannerY, bannerWidth, bannerHeight);
        // Warning icon and title
        ctx.fillStyle = '#ff6b7a';
        ctx.font = 'bold 18px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText("\u26A0 ANCHOR LOST! \u26A0", bannerX + bannerWidth / 2, bannerY + 25);
        // Message (different based on loss reason)
        ctx.fillStyle = '#e8e8d8';
        ctx.font = 'bold 14px sans-serif';
        const lossMessage = hud.anchorLossReason === 'cable' ? 'Cable was too strong!' : 'Anchor stayed too deep!';
        ctx.fillText(lossMessage, bannerX + bannerWidth / 2, bannerY + 48);
        // Remaining anchors
        ctx.font = '12px sans-serif';
        const anchorText = hud.remainingAnchors > 0 ? `${hud.remainingAnchors} anchor${hud.remainingAnchors === 1 ? '' : 's'} remaining` : 'NO ANCHORS LEFT - MISSION FAILED!';
        ctx.fillStyle = hud.remainingAnchors > 0 ? '#fffa80' : '#ff6b7a';
        ctx.fillText(anchorText, bannerX + bannerWidth / 2, bannerY + 68);
        ctx.globalAlpha = 1.0;
        ctx.textAlign = 'left';
    }
    // Mission success notification banner (center, prominent)
    if (hud.missionSuccess && gameFrame - hud.successTime < 3600) {
        const elapsed = gameFrame - hud.successTime;
        const opacity = elapsed < 3540 ? 1.0 : (3600 - elapsed) / 60; // Fade out in last 1s
        const bannerWidth = 500;
        const bannerHeight = 100;
        const bannerX = (canvas.width - bannerWidth) / 2;
        const bannerY = 190; // Center of screen
        // Background with green glow
        ctx.globalAlpha = opacity * 0.98;
        ctx.fillStyle = 'rgba(42, 133, 149, 0.98)'; // Teal/cyan background
        ctx.fillRect(bannerX, bannerY, bannerWidth, bannerHeight);
        // Border
        ctx.strokeStyle = '#a8f088';
        ctx.lineWidth = 4;
        ctx.strokeRect(bannerX, bannerY, bannerWidth, bannerHeight);
        // Success icon and title
        ctx.fillStyle = '#a8f088';
        ctx.font = 'bold 24px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText("\u2605 MISSION SUCCESS! \u2605", bannerX + bannerWidth / 2, bannerY + 30);
        // Cable name
        ctx.fillStyle = hud.lastCableCut.color;
        ctx.font = 'bold 18px sans-serif';
        ctx.fillText(hud.lastCableCut.name.toUpperCase() + ' SEVERED', bannerX + bannerWidth / 2, bannerY + 56);
        // Message
        ctx.fillStyle = '#e8e8d8';
        ctx.font = 'bold 14px sans-serif';
        ctx.fillText('Critical infrastructure disrupted!', bannerX + bannerWidth / 2, bannerY + 80);
        ctx.globalAlpha = 1.0;
        ctx.textAlign = 'left';
    }
    // Left side - Mission stats (simplified)
    const leftX = 20;
    // Use dynamic optimal range
    const minOptimal = Math.floor(hud.depth * (hud.optimalCenterDepth - hud.optimalVariance));
    const maxOptimal = Math.floor(hud.depth * (hud.optimalCenterDepth + hud.optimalVariance));
    const anchorInSweetSpot = hud.isAnchorDown;
    // Danger zone calculations (shared across HUD elements)
    const anchorLossThreshold = hud.depth * 5;
    const dangerZoneEnd = hud.depth * 7; // Red zone extends to bottom of gauge
    const inDangerZone = tanker.chainLength > maxOptimal && tanker.chainLength <= dangerZoneEnd;
    // Display remaining anchors prominently
    ctx.fillStyle = '#e8e8d8';
    ctx.font = 'bold 14px sans-serif';
    const anchorDisplay = "\u2693".repeat(hud.remainingAnchors) + "\u2717".repeat(2 - hud.remainingAnchors);
    ctx.fillText(`Anchors: ${anchorDisplay} | Cables: ${hud.cablesCut}`, leftX, 30);
    // Debug: Log anchor count when it changes
    if (gameFrame % 60 === 0) console.log(`Frame ${gameFrame}: Anchors remaining = ${hud.remainingAnchors}, Display = ${anchorDisplay}`);
    // Anchor status with proper states
    ctx.font = 'bold 15px sans-serif';
    if (tanker.chainLength >= anchorLossThreshold) {
        // State 6: Critical danger - anchor too deep, about to be lost
        ctx.fillStyle = '#ff6b7a';
        ctx.fillText(`\u{26A0} ANCHOR DANGER`, leftX, 60);
        ctx.font = '12px sans-serif';
        // Show countdown timer if in danger zone
        if (hud.anchorDangerStartTime > 0) {
            const timeInDanger = gameFrame - hud.anchorDangerStartTime;
            const timeRemaining = Math.max(0, 300 - timeInDanger);
            const secondsRemaining = Math.ceil(timeRemaining / 60);
            ctx.fillText(`ANCHOR LOST IN ${secondsRemaining}s!`, leftX, 80);
        } else ctx.fillText(`TOO DEEP! Reel up now!`, leftX, 80);
    } else if (inDangerZone) {
        // State 5: Red zone - too deep, reduced cable cutting efficiency
        ctx.fillStyle = '#ffa940';
        ctx.fillText(`\u{26A0} TOO DEEP`, leftX, 60);
        ctx.font = '12px sans-serif';
        ctx.fillText(`Low efficiency - optimal: ${minOptimal}-${maxOptimal}m`, leftX, 80);
    } else if (tanker.chainLength === 0) {
        // State 1: Anchor up - not deployed
        ctx.fillStyle = '#5a8ca8';
        ctx.fillText(`ANCHOR UP`, leftX, 60);
        ctx.font = '12px sans-serif';
        ctx.fillText(`Deploy to drag seabed`, leftX, 80);
    } else if (tanker.chainLength < hud.depth) {
        // State 2: Anchor lowered - deployed but not touching seabed
        ctx.fillStyle = '#5a8ca8';
        ctx.fillText(`ANCHOR LOWERED`, leftX, 60);
        ctx.font = '12px sans-serif';
        ctx.fillText(`Need ${hud.depth - tanker.chainLength}m more`, leftX, 80);
    } else if (anchorInSweetSpot) {
        // State 4: Dragging at optimal depth (green zone)
        ctx.fillStyle = '#a8f088';
        ctx.fillText(`\u{2693} DRAGGING`, leftX, 60);
        ctx.font = '13px sans-serif';
        ctx.fillText(`${hud.cablesCut} cables | ${(hud.draggedInMeters / 1000).toFixed(1)}km`, leftX, 80);
    } else {
        // State 3: Dragging - touching seabed but not in optimal range
        ctx.fillStyle = '#fffa80';
        ctx.fillText(`\u{26A0} DRAGGING`, leftX, 60);
        ctx.font = '12px sans-serif';
        ctx.fillText(`Target: ${minOptimal}-${maxOptimal}m`, leftX, 80);
    }
    // Right side - Detection risk meter
    const meterWidth = 180;
    const meterHeight = 24;
    const meterX = canvas.width - meterWidth - 20;
    const meterY = 20;
    // Detection Risk Label
    ctx.font = 'bold 13px sans-serif';
    ctx.fillStyle = '#e8e8d8';
    ctx.fillText('DETECTION', meterX, meterY - 6);
    // Meter background
    ctx.fillStyle = 'rgba(21, 38, 47, 0.8)';
    ctx.fillRect(meterX, meterY, meterWidth, meterHeight);
    // Risk bar color based on level
    let riskColor;
    if (detectionRisk < 30) riskColor = '#a8f088'; // Green - safe
    else if (detectionRisk < 60) riskColor = '#fffa80'; // Yellow - caution
    else riskColor = '#ff6b7a'; // Red - danger
    // Fill risk meter
    const riskWidth = detectionRisk / 100 * meterWidth;
    ctx.fillStyle = riskColor;
    ctx.fillRect(meterX, meterY, riskWidth, meterHeight);
    // Meter border
    ctx.strokeStyle = '#5a8ca8';
    ctx.lineWidth = 2;
    ctx.strokeRect(meterX, meterY, meterWidth, meterHeight);
    // Risk percentage text
    ctx.font = 'bold 14px sans-serif';
    ctx.fillStyle = '#0a1a24';
    ctx.textAlign = 'center';
    if (detectionRisk > 15) ctx.fillText(`${Math.round(detectionRisk)}%`, meterX + meterWidth / 2, meterY + 18);
    ctx.textAlign = 'left';
    // Risk status text
    ctx.font = '11px sans-serif';
    ctx.fillStyle = riskColor;
    let statusText = 'CLEAR';
    if (detectionRisk >= 60) statusText = 'DANGER';
    else if (detectionRisk >= 30) statusText = 'CAUTION';
    ctx.textAlign = 'center';
    ctx.fillText(statusText, meterX + meterWidth / 2, meterY + meterHeight + 14);
    ctx.textAlign = 'left';
    // Chain depth gauge (right side, below detection meter)
    const gaugeX = canvas.width - 70;
    const gaugeY = 70;
    const gaugeHeight = 140;
    const gaugeWidth = 35;
    // Fixed scale based on seabed depth: always show 0 to 7x depth
    // This covers: seabed (1x ~14%), green zone (~38-47%), red danger zone (50-100%, lower half)
    const gaugeMaxValue = hud.depth * 7;
    // Label with current chain length
    ctx.font = 'bold 10px sans-serif';
    ctx.fillStyle = '#e8e8d8';
    ctx.textAlign = 'center';
    ctx.fillText('CHAIN', gaugeX + gaugeWidth / 2, gaugeY - 8);
    // Gauge background
    ctx.fillStyle = 'rgba(21, 38, 47, 0.8)';
    ctx.fillRect(gaugeX, gaugeY, gaugeWidth, gaugeHeight);
    // Seabed depth reference line
    const seabedPos = hud.depth / gaugeMaxValue * gaugeHeight;
    if (seabedPos <= gaugeHeight) {
        ctx.fillStyle = 'rgba(42, 133, 149, 0.4)';
        ctx.fillRect(gaugeX, gaugeY + seabedPos - 1, gaugeWidth, 2);
    }
    // Optimal cutting zone (green zone - dynamically calculated based on cable depth variance)
    // Typically ~2.7x-3.3x depth (center 3.0x ± 0.3x variance)
    const minOptimalPos = Math.min(minOptimal / gaugeMaxValue * gaugeHeight, gaugeHeight);
    const maxOptimalPos = Math.min(maxOptimal / gaugeMaxValue * gaugeHeight, gaugeHeight);
    // Orange transition zone (between green and red)
    const orangeZoneStart = maxOptimal; // Starts right after green zone ends (~3.3x)
    const orangeZoneEnd = hud.depth * 3.5; // Ends where red zone starts (3.5x)
    const orangeZoneStartPos = Math.min(orangeZoneStart / gaugeMaxValue * gaugeHeight, gaugeHeight);
    const orangeZoneEndPos = Math.min(orangeZoneEnd / gaugeMaxValue * gaugeHeight, gaugeHeight);
    // Danger zone (red zone in lower HALF of gauge - starts at 3.5x depth)
    // Gauge shows 0 to 7x depth, so 3.5x depth is exactly halfway
    const dangerZoneStart = hud.depth * 3.5; // Start red zone at halfway point
    const dangerZoneStartPos = Math.min(dangerZoneStart / gaugeMaxValue * gaugeHeight, gaugeHeight);
    const dangerZoneEndPos = gaugeHeight; // Red zone extends to bottom of gauge (7x depth)
    // Always draw green zone (reference zone for optimal cable cutting)
    if (maxOptimalPos > minOptimalPos) {
        ctx.fillStyle = 'rgba(168, 240, 136, 0.25)';
        ctx.fillRect(gaugeX, gaugeY + minOptimalPos, gaugeWidth, maxOptimalPos - minOptimalPos);
        // Draw zone boundaries
        ctx.fillStyle = '#a8f088';
        if (minOptimalPos < gaugeHeight) ctx.fillRect(gaugeX, gaugeY + minOptimalPos - 1, gaugeWidth, 2);
        if (maxOptimalPos < gaugeHeight) ctx.fillRect(gaugeX, gaugeY + maxOptimalPos - 1, gaugeWidth, 2);
    }
    // Draw orange transition zone (between green and red)
    if (orangeZoneEndPos > orangeZoneStartPos && orangeZoneStartPos < gaugeHeight) {
        const zoneHeight = orangeZoneEndPos - orangeZoneStartPos;
        ctx.fillStyle = 'rgba(255, 169, 64, 0.25)'; // Slight orange/amber
        ctx.fillRect(gaugeX, gaugeY + orangeZoneStartPos, gaugeWidth, zoneHeight);
        // Draw orange zone boundary at the top
        if (orangeZoneStartPos < gaugeHeight) {
            ctx.fillStyle = '#ffa940';
            ctx.fillRect(gaugeX, gaugeY + orangeZoneStartPos - 1, gaugeWidth, 2);
        }
    }
    // Always draw red danger zone (reference zone for too deep)
    if (dangerZoneEndPos > dangerZoneStartPos && dangerZoneStartPos < gaugeHeight) {
        const zoneHeight = dangerZoneEndPos - dangerZoneStartPos;
        ctx.fillStyle = 'rgba(255, 107, 122, 0.3)';
        ctx.fillRect(gaugeX, gaugeY + dangerZoneStartPos, gaugeWidth, zoneHeight);
        // Draw danger zone boundary at the top of red zone
        if (dangerZoneStartPos < gaugeHeight) {
            ctx.fillStyle = '#ff6b7a';
            ctx.fillRect(gaugeX, gaugeY + dangerZoneStartPos - 1, gaugeWidth, 2);
        }
    }
    // Current anchor position indicator (using inDangerZone from above)
    const anchorPos = Math.min(tanker.chainLength / gaugeMaxValue * gaugeHeight, gaugeHeight);
    ctx.beginPath();
    ctx.moveTo(gaugeX - 5, gaugeY + anchorPos);
    ctx.lineTo(gaugeX + gaugeWidth + 5, gaugeY + anchorPos);
    ctx.lineWidth = 3;
    // Red if in danger zone, green if in sweet spot, blue otherwise
    ctx.strokeStyle = inDangerZone ? '#ff6b7a' : anchorInSweetSpot ? '#a8f088' : '#5a8ca8';
    ctx.stroke();
    // Gauge border
    ctx.strokeStyle = '#5a8ca8';
    ctx.lineWidth = 2;
    ctx.strokeRect(gaugeX, gaugeY, gaugeWidth, gaugeHeight);
    // Current chain length below gauge
    ctx.font = '10px sans-serif';
    ctx.fillStyle = '#e8e8d8';
    ctx.fillText(`${tanker.chainLength}m`, gaugeX + gaugeWidth / 2, gaugeY + gaugeHeight + 12);
    // Seabed depth graph (bottom left) - 50% past, 50% future
    if (hud.depthHistory.length > 0 || hud.futureDepths.length > 0) {
        const graphWidth = 180;
        const graphHeight = 45;
        const graphX = 20;
        const graphY = canvas.height - graphHeight - 20;
        // Label
        ctx.font = 'bold 10px sans-serif';
        ctx.fillStyle = '#e8e8d8';
        ctx.textAlign = 'left';
        ctx.fillText('SEABED', graphX, graphY - 8);
        // Background
        ctx.fillStyle = 'rgba(21, 38, 47, 0.8)';
        ctx.fillRect(graphX, graphY, graphWidth, graphHeight);
        // Combine past, current, and future depths
        const allDepths = [
            ...hud.depthHistory,
            hud.depth,
            ...hud.futureDepths
        ];
        const totalPoints = allDepths.length;
        const shipIndex = hud.depthHistory.length; // Ship is right after history
        const maxDepth = Math.max(...allDepths, 470);
        const minDepth = Math.min(...allDepths, 20);
        const depthRange = maxDepth - minDepth || 100; // Avoid division by zero
        // Draw past depths (left half, dimmer)
        ctx.strokeStyle = 'rgba(42, 133, 149, 0.5)'; // Dimmer for past
        ctx.lineWidth = 2;
        ctx.beginPath();
        for(let i = 0; i < totalPoints; i++){
            const x = graphX + i / (totalPoints - 1) * graphWidth;
            const normalizedDepth = (allDepths[i] - minDepth) / depthRange;
            const y = graphY + graphHeight - normalizedDepth * graphHeight;
            // Change color at ship position
            if (i === shipIndex) {
                ctx.stroke(); // Finish past line
                ctx.strokeStyle = '#2a8595'; // Brighter for future
                ctx.beginPath();
                ctx.moveTo(x, y);
            } else if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();
        // Ship position indicator (vertical line at center)
        const shipX = graphX + shipIndex / (totalPoints - 1) * graphWidth;
        ctx.strokeStyle = 'rgba(255, 169, 64, 0.6)'; // Orange line for ship position
        ctx.lineWidth = 2;
        ctx.setLineDash([
            4,
            4
        ]); // Dashed line
        ctx.beginPath();
        ctx.moveTo(shipX, graphY);
        ctx.lineTo(shipX, graphY + graphHeight);
        ctx.stroke();
        ctx.setLineDash([]); // Reset to solid line
        // Current depth indicator (dot at ship position)
        const currentNormalized = (hud.depth - minDepth) / depthRange;
        const currentY = graphY + graphHeight - currentNormalized * graphHeight;
        ctx.fillStyle = '#ffa940'; // Orange dot
        ctx.beginPath();
        ctx.arc(shipX, currentY, 4, 0, Math.PI * 2);
        ctx.fill();
        // Outline for better visibility
        ctx.strokeStyle = '#e8e8d8';
        ctx.lineWidth = 1;
        ctx.stroke();
        // Border
        ctx.strokeStyle = '#5a8ca8';
        ctx.lineWidth = 2;
        ctx.strokeRect(graphX, graphY, graphWidth, graphHeight);
        // Current depth text
        ctx.font = '10px sans-serif';
        ctx.fillStyle = '#e8e8d8';
        ctx.textAlign = 'left';
        ctx.fillText(`Depth: ${hud.depth}m`, graphX, graphY + graphHeight + 12);
    }
    // Cable breakdown stats (bottom right)
    if (hud.cablesCut > 0) {
        const statsX = canvas.width - 200;
        const statsY = canvas.height - 130;
        const statsWidth = 180;
        const statsHeight = 110;
        // Background
        ctx.fillStyle = 'rgba(21, 38, 47, 0.8)';
        ctx.fillRect(statsX, statsY, statsWidth, statsHeight);
        // Border
        ctx.strokeStyle = '#5a8ca8';
        ctx.lineWidth = 2;
        ctx.strokeRect(statsX, statsY, statsWidth, statsHeight);
        // Title
        ctx.font = 'bold 10px sans-serif';
        ctx.fillStyle = '#e8e8d8';
        ctx.textAlign = 'left';
        ctx.fillText('CABLES DAMAGED', statsX + 10, statsY + 15);
        // Cable type breakdown
        ctx.font = '10px sans-serif';
        let yOffset = 30;
        const cableOrder = [
            'HVDC',
            'MILITARY',
            'FIBER',
            'RESEARCH',
            'SCRAP'
        ];
        cableOrder.forEach((type)=>{
            const count = hud.cablesByType[type];
            if (count > 0) {
                const cable = CABLE_TYPES[type];
                ctx.fillStyle = cable.color;
                ctx.fillText(`${count}\xd7 ${cable.name}`, statsX + 10, statsY + yOffset);
                yOffset += 14;
            }
        });
        // Total
        ctx.font = 'bold 11px sans-serif';
        ctx.fillStyle = '#a8f088';
        ctx.fillText(`Total: ${hud.cablesCut}`, statsX + 10, statsY + statsHeight - 10);
    }
    ctx.textAlign = 'left';
    ctx.restore();
}
let backgroundSoundsStarted = false;
function backgroundSounds() {
    if (backgroundSoundsStarted) return; // Only start once
    music.volume = 0.75;
    music.play().catch((err)=>console.log('Music play failed:', err));
    wind1.volume = 0.005;
    wind1.play().catch((err)=>console.log('Wind play failed:', err));
    waves.volume = 0.05;
    waves.play().catch((err)=>console.log('Waves play failed:', err));
    ship.volume = 0.01;
    ship.play().catch((err)=>console.log('Ship play failed:', err));
    backgroundSoundsStarted = true;
}
function randomCreaks() {
    if (gameFrame % randomBetween(2000, 6000) === 0) {
        const audioKey = `metal${randomBetween(1, 5)}`;
        const audio = audioElements[audioKey];
        if (audio) {
            audio.volume = 0.1;
            audio.play().catch(()=>{});
        }
    }
}
let animationId;
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!isPaused) {
        backgroundSounds();
        randomCreaks();
        createBackground();
        createHud();
        createTanker();
        createPatrols();
        updateParticles(); // Draw particle effects
        gameFrame++;
    } else {
        // Still draw static elements when paused
        createBackground();
        createTanker();
        createPatrols();
    }
    drawHUD(); // Always draw HUD
    // Win condition: Successfully cut a critical cable
    if (hud.missionSuccess) {
        // Set success message
        const successCable = document.getElementById('success-cable');
        if (hud.lastCableCut) successCable.textContent = `${hud.lastCableCut.name.toUpperCase()} SEVERED`;
        document.getElementById('success').style.display = 'flex';
        cancelAnimationFrame(animationId);
        return; // Stop the animation loop
    } else if (warnings > 1000 || detectionRisk >= 100 || hud.remainingAnchors <= 0) {
        // Set failure message based on cause
        const restartTitle = document.getElementById('restart-title');
        const restartMessage = document.getElementById('restart-message');
        if (hud.remainingAnchors <= 0) {
            restartTitle.textContent = "\u2693 NO ANCHORS LEFT";
            restartMessage.textContent = 'All anchors lost - Mission failed!';
        } else if (detectionRisk >= 100) {
            restartTitle.textContent = "\u26A0 MISSION COMPROMISED";
            restartMessage.textContent = 'You were detected by patrol vessels';
        } else {
            restartTitle.textContent = "\u26A0 MISSION FAILED";
            restartMessage.textContent = 'Too many warnings from patrols';
        }
        document.getElementById('restart').style.display = 'flex';
        cancelAnimationFrame(animationId);
        return; // Stop the animation loop
    }
    // Continue the animation loop only if game is not over
    animationId = requestAnimationFrame(animate);
}
// Wait for DOM to be fully loaded
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initGame);
else initGame();
function initGame() {
    console.log('=== Initializing game ===');
    // Initialize overlays
    const restartDiv = document.getElementById('restart');
    const successDiv = document.getElementById('success');
    const startDiv = document.getElementById('start');
    if (restartDiv) restartDiv.style.display = 'none';
    if (successDiv) successDiv.style.display = 'none';
    // Play button
    const playBtn = document.getElementById('play');
    if (playBtn) {
        console.log('Setting up play button');
        playBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Play button clicked - starting game');
            if (startDiv) startDiv.style.display = 'none';
            animate();
        }, true);
    } else console.error('Play button not found!');
    // Retry button
    const replayBtn = document.getElementById('replay');
    if (replayBtn) {
        console.log('Setting up replay button');
        replayBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Retry Mission button clicked - reloading');
            window.location.reload();
        }, true);
    } else console.error('Replay button not found!');
    // New Mission button
    const replaySuccessBtn = document.getElementById('replay-success');
    if (replaySuccessBtn) {
        console.log('Setting up replay-success button');
        replaySuccessBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('New Mission button clicked - reloading');
            window.location.reload();
        }, true);
        // Also add mousedown as backup
        replaySuccessBtn.addEventListener('mousedown', function(e) {
            console.log('New Mission mousedown event');
        }, true);
    } else console.error('Replay-success button not found!');
    console.log('Game initialization complete');
}
// Handle fullscreen canvas resizing
document.addEventListener('fullscreenchange', function() {
    if (document.fullscreenElement) {
        // Entering fullscreen - scale canvas while maintaining aspect ratio
        const aspectRatio = DEFAULT_WIDTH / DEFAULT_HEIGHT; // 1.6
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const viewportAspectRatio = viewportWidth / viewportHeight;
        let newWidth, newHeight;
        if (viewportAspectRatio > aspectRatio) {
            // Viewport is wider - scale by height
            newHeight = viewportHeight;
            newWidth = newHeight * aspectRatio;
        } else {
            // Viewport is taller - scale by width
            newWidth = viewportWidth;
            newHeight = newWidth / aspectRatio;
        }
        canvas.style.width = newWidth + 'px';
        canvas.style.height = newHeight + 'px';
        // Keep internal resolution the same
        canvas.width = DEFAULT_WIDTH;
        canvas.height = DEFAULT_HEIGHT;
    } else {
        // Exiting fullscreen - reset styles
        canvas.style.width = '800px';
        canvas.style.height = '500px';
        canvas.width = DEFAULT_WIDTH;
        canvas.height = DEFAULT_HEIGHT;
    }
    // Reset font size for text rendering
    ctx.font = '24px sans-serif';
});

},{"./images/bg.png":"9IdaS","./images/patrol.png":"eRlpm","./images/tanker-sprite-2.png":"7uRgA","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"9IdaS":[function(require,module,exports,__globalThis) {
module.exports = require("f6e8c0a917b8b69d").getBundleURL('6fFUs') + "bg.fd22e69c.png" + "?" + Date.now();

},{"f6e8c0a917b8b69d":"lgJ39"}],"lgJ39":[function(require,module,exports,__globalThis) {
"use strict";
var bundleURL = {};
function getBundleURLCached(id) {
    var value = bundleURL[id];
    if (!value) {
        value = getBundleURL();
        bundleURL[id] = value;
    }
    return value;
}
function getBundleURL() {
    try {
        throw new Error();
    } catch (err) {
        var matches = ('' + err.stack).match(/(https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/[^)\n]+/g);
        if (matches) // The first two stack frames will be this function and getBundleURLCached.
        // Use the 3rd one, which will be a runtime in the original bundle.
        return getBaseURL(matches[2]);
    }
    return '/';
}
function getBaseURL(url) {
    return ('' + url).replace(/^((?:https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}
// TODO: Replace uses with `new URL(url).origin` when ie11 is no longer supported.
function getOrigin(url) {
    var matches = ('' + url).match(/(https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/[^/]+/);
    if (!matches) throw new Error('Origin not found');
    return matches[0];
}
exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
exports.getOrigin = getOrigin;

},{}],"eRlpm":[function(require,module,exports,__globalThis) {
module.exports = require("f47c5db960c585d2").getBundleURL('6fFUs') + "patrol.dc4a5b23.png" + "?" + Date.now();

},{"f47c5db960c585d2":"lgJ39"}],"7uRgA":[function(require,module,exports,__globalThis) {
module.exports = require("825e4fe0fb475631").getBundleURL('6fFUs') + "tanker-sprite-2.a548ee57.png" + "?" + Date.now();

},{"825e4fe0fb475631":"lgJ39"}],"gkKU3":[function(require,module,exports,__globalThis) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}]},["b85s8","g9e9u"], "g9e9u", "parcelRequire94c2")

//# sourceMappingURL=index.c3fdd8eb.js.map
