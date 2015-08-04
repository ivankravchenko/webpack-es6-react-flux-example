/* eslint-disable no-console, no-process-env */
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import React from 'react';
import routes from '../client/routes';
import Router from 'react-router';
import compression from 'compression';
// //import UAParser from 'ua-parser-js';

// CONFIG SETTINGS
const PORT = process.env.PORT || 8080;
const HOT_LOAD_PORT = process.env.HOT_LOAD_PORT || 8888;
const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';

// //const Head = React.createFactory(require('./components/Head'));
// //const ReactDocumentTitle = require('react-document-title');

// Setup the express server
const server = express();

// To accept POST requests
server.use(bodyParser.json());
// Gzip all the things
server.use(compression());

// Serve a static directory for the webpack-compiled Javascript and CSS. Only in production since the webpack dev server handles this otherwise.
if (isProduction) {
    server.use('/build', express.static(path.join(__dirname, '/build')));
}

// Serves up a static directory for images and other assets that we don't (yet) require via Webpack
server.use('/static', express.static(path.join(__dirname, '/static')));

// Cross-origin resource sharing
server.use(cors({
    origin: [
        `http://localhost:${PORT}`, 
        'http://localhost'
    ]
}));

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
    const scriptLocation = isDevelopment ?
        `http://localhost:${HOT_LOAD_PORT}/build/main.bundle.js` :
        `/build/client.js`;
    res.end(
        '<meta charset="UTF-8">' +
        `<body><div>${content}</div></body>` +
        `<script src="${scriptLocation}" defer></script>`);
});

server.listen(PORT);

if (isDevelopment) {
    console.log('server.js is listening on port ' + PORT);
}
