/* eslint-disable no-process-env */
// Delete the `BROWSER` env variable if it's present
// https://github.com/iam4x/isomorphic-flux-boilerplate/issues/16
// delete process.env.BROWSER;

// Tell `require` calls to look into `/app` also
// it will avoid `../../../../../` require strings
process.env.NODE_PATH = 'client';
require('module').Module._initPaths(); // eslint-disable-line

// Install `babel` hook for ES6
require('babel/register')({
    stage: 0//,
    //plugins: ['typecheck']
});


// Start the server
require('./server.js');
