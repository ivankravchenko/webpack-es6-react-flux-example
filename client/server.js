/* eslint-disable no-console, no-process-env */
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import React from 'react';
import routes from './routes';
import Router from 'react-router';
import compression from 'compression';
import indexView from './views/index.hbs';

import fs from 'fs';
// //import UAParser from 'ua-parser-js';

// CONFIG SETTINGS
const PORT = process.env.PORT || 8080;
const HOT_LOAD_PORT = process.env.HOT_LOAD_PORT || 8888;
const HOST_NAME = process.env.HOST_NAME || 'localhost';

console.log('!!!! PORT', PORT, ' HOT_LOAD_PORT', HOT_LOAD_PORT, ' HOST_NAME', HOST_NAME);

// //const Head = React.createFactory(require('./components/Head'));
// //const ReactDocumentTitle = require('react-document-title');

// Setup the express server
const server = express();

let assets = {};

if (!__DEV__) {
    let assetPath = path.join(__dirname, 'webpack-assets.json');
  console.log('reading asset names', assetPath);
  fs.readFile(assetPath, 'utf-8', function(err, data) {
    if (err) {
      return console.error('ERROR: ', err);
    }

    assets = JSON.parse(data).main;
    console.log("Assets", assets);
  });
}

// To accept POST requests
server.use(bodyParser.json());
// Gzip all the things
server.use(compression());

// Serve a static directory for the webpack-compiled Javascript and CSS. 
// Depending on production or dev, we'll include the appropriate path
const publicPath = __DEV__ ? './public' : './dist/public';
console.log(`serving static from ${publicPath}`);
server.use(express.static(publicPath));

// Cross-origin resource sharing
// server.use(cors({
//     origin: [
//         `http://${HOST_NAME}:${PORT}`, 
//         `http://${HOST_NAME}`
//     ]
// }));

// should use express router
// but also need to inspect how react-router and express router can interact
server.use('/auth', (req, res) => {
    if (req.method === 'POST') {
        res.json({username: req.body.username});
    } else {
        res.status(409).json({error: 'invalid credentials'});
    }
});

// Our handler for all incoming requests
server.use(function(req, res, next) { // eslint-disable-line

    // In order to handle "media queries" server-side (preventing FOUT), we parse the user agent string,
    // and pass a string down through the router that lets components style and render themselves
    // For the correct viewport. Client.js uses window width, which resolves any problems with
    // browser sniffing.
    /* JG: This is useful but we don't need it now.
    var parser = new UAParser();
    var ua = parser.setUA(req.headers['user-agent']).getResult();
    var deviceType = "";
    if (ua.device.type === undefined) {
    deviceType = "desktop";
    } else {
    deviceType = ua.device.type;
    }*/
    const deviceType = 'desktop'; // JG: For now

    // We customize the onAbort method in order to handle redirects
    const router = Router.create({
        routes: routes,
        location: req.path,
        onAbort: function defaultAbortHandler(abortReason/*, location*/) {
            if (abortReason && abortReason.to) {
                res.redirect(301, abortReason.to);
            } else {
                res.redirect(404, '404');
            }
        }
    });

    let content = '';

    // Run the router, and render the result to string
    router.run(function (Handler, state) {
        content = React.renderToString(React.createElement(Handler, {
            routerState: state,
            deviceType: deviceType,
            environment: 'server'
        }), null);
    });

    // Resets the document title on each request
    // See https://github.com/gaearon/react-document-title#server-usage
    // //var title = ReactDocumentTitle.rewind();

    // Render <head> to string
    // //var head = React.renderToStaticMarkup(Head({title: title}));

    // Write the response
    // TODO: Get from Handlebars template
    res.set('Content-Type', 'text/html');


    const ssrPayload = indexView({
        body: content,
        script: '//dehydrated state would go here',
        title: 'MYACC-REACT',
        showPreloader: false, //this.path && this.path === '/',
        jsBundle: assets.js || `http://${HOST_NAME}:${HOT_LOAD_PORT}/bundle.js`,
        cssBundle: assets.css || '',
        inlineCss: ''//inlineCss || ''
    });

    res.end(ssrPayload);


    // const scriptLocation = isDevelopment ?
    //     `http://localhost:${HOT_LOAD_PORT}/build/main.bundle.js` :
    //     `/build/client.js`;
    // res.end(
    //     '<meta charset="UTF-8">' +
    //     `<body><div>${content}</div></body>` +
    //     `<script src="${scriptLocation}" defer></script>`);
});

server.listen(PORT, HOST_NAME, function() {
    console.log(` => Server Listening on ${HOST_NAME}:${PORT}`);
});
