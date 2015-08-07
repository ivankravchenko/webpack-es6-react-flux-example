/* eslint-disable no-console, no-process-env */
import fs from 'fs';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import React from 'react';
import routes from './routes';
import Router from 'react-router';
import compression from 'compression';
import indexView from './views/index.hbs';
// //import UAParser from 'ua-parser-js';


// //const Head = React.createFactory(require('./components/Head'));
// //const ReactDocumentTitle = require('react-document-title');

// Setup the express server
const server = express();

let assets = {};

if (!__DEV__) {
  fs.readFile(path.join(__dirname, 'webpack-assets.json'), 'utf-8', function(err, data) {
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
        jsBundle: assets.js || `http://${process.env.HOST}:${process.env.HMR_PORT}/bundle.js`,
        cssBundle: assets.css || '',
        inlineCss: ''//inlineCss || ''
    });

    res.end(ssrPayload);
});

server.listen(process.env.PORT, process.env.HOST, function() {
    console.log(` => Server Listening on ${process.env.HOST}:${process.env.PORT}`);
});
