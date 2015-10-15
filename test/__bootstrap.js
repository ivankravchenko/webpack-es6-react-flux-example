
import jsdom from 'jsdom';
import assert from 'assert';

console.log('(Bootstrapping Mocha Tests)');

function setupFakeDOM() {
    if (typeof document !== 'undefined') {
        console.log('document is undefined');
        // if the fake DOM has already been set up, or
        // if running in a real browser, do nothing
        return;
    }

    // setup the fake DOM environment.
    //
    // Note that we use the synchronous jsdom.jsdom() API
    // instead of jsdom.env() because the 'document' and 'window'
    // objects must be available when React is require()-d for
    // the first time.
    //
    // For any async setup in tests, use
    // the before() and beforeEach() hooks.
    global.document = jsdom.jsdom('<html><body></body></html>');
    global.window = document.defaultView; // document.parentWindow;
    global.navigator = window.navigator;
}

function registerCompilers() {
    var babel = require('babel-core');
    var fs = require('fs');

    // borrowed from https://github.com/babel/babel-jest/blob/master/index.js
    require.extensions['.jsx'] = function (module, filename) {
      var src = fs.readFileSync(filename, 'utf8');
      // Allow the stage to be configured by an environment
      // variable, but use Babel's default stage (2) if
      // no environment variable is specified.
      var stage = process.env.BABEL_JEST_STAGE || 2;

      // Ignore all files within node_modules
      if (filename.indexOf('node_modules') === -1 && babel.canCompile(filename)) {
        var compiled = babel.transform(src, { filename: filename, stage: stage }).code;
        return module._compile(compiled, filename);
      }
      return module;
    };

    // Don't process (S)CSS files
    require.extensions['.css'] = require.extensions['.scss'] = function () {
      return null;
    };
};

function setupGlobals() {
    global.React = require('react');
    global.TestUtils = require('react-addons-test-utils');
    global.assert = require('assert');
    //global.jsdom = require('jsdom').jsdom('<!doctype html><html><body></body></html>');
    global.mockery = require('mockery');
};

// To make test include paths relative to /src
process.env.NODE_PATH = 'src';
require('module').Module._initPaths();

setupFakeDOM();
registerCompilers();
setupGlobals();

