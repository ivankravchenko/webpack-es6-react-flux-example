//test/__bootstrap.js 
//
// (it's important that this file is first alphabetically
// so that mocha process it first to bootstrap the rest of the tests)
// Via: https://github.com/adjavaherian/mocha-react/blob/master/tests/bootstrap.js

// globals
global.assert = require('assert');
global.babel = require('babel/register')({stage:0});
global.React = require('react/addons');
global.jsdom = require('jsdom').jsdom('<!doctype html><html><body></body></html>');
global.TestUtils = React.addons.TestUtils;
global.mockery = require('mockery');
global.document = jsdom;
global.window = document.parentWindow;
global.navigator = window.navigator;
global.reactStub = require('react').createClass({render:function(){return null;}});
global.reactStub = React.createClass({
                        displayName: 'StubClass',
                        render: function() {
                            return null;
                        }
                    });

// setup
before(function(){
    mockery.enable({
        warnOnUnregistered: false
    });
});
beforeEach(function(){

});

// teardown
afterEach(function() {
    mockery.deregisterAll();    // Deregister all Mockery mocks from node's module cache
});

after(function(){
    mockery.disable();
});
