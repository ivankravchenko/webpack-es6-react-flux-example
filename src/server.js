/* eslint-disable no-console, no-process-env */
/*global __DEV__*/

// general imports
import fs from 'fs';
import path from 'path';

// server specific imports
import express from 'express';
import bodyParser from 'body-parser';
//import cors from 'cors';
import compression from 'compression';

// React imports
import React from 'react';
import ReactDOMServer from 'react-dom/server';

// react-router imports
import {match, RoutingContext} from 'react-router';

// redux imports
import {Provider} from 'react-redux';

// App imports
import routes from './routes';
import configureStore from './store/configureStore';
import indexTemplate from './templates/index.hbs';

// //import UAParser from 'ua-parser-js';

// //const Head = React.createFactory(require('./components/Head'));
// //const ReactDocumentTitle = require('react-document-title');

// Setup the express server
const server = express();
let assets = {};

if (!__DEV__) {
    fs.readFile(path.join(__dirname, 'webpack-assets.json'), 'utf-8', (err, data) => {
        if (err) {
            return console.error('ERROR: ', err);
        }

        assets = JSON.parse(data).main;
    });
}

const generateSSRPayload = function (bodyContent, initialState, inlineCss) {
    return indexTemplate({
        body: bodyContent,
        script: `window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};`,
        title: 'SEG-REACT',
        showPreloader: false, //this.path && this.path === '/',
        jsBundle: assets.js || `http://${process.env.HOST}:${process.env.HMR_PORT}/bundle.js`,
        cssBundle: assets.css || '',
        inlineCss: inlineCss || ''
    });
};

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
        res.json({
            username: req.body.username
        });
    } else {
        res.status(409).json({
            error: 'invalid credentials'
        });
    }
});

// Our handler for all incoming requests
server.use(function(req, res, next) { // eslint-disable-line
    const store = configureStore({todos:[]}); // for now

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
    //const deviceType = 'desktop'; // JG: For now

    // Resets the document title on each request
    // See https://github.com/gaearon/react-document-title#server-usage
    // //var title = ReactDocumentTitle.rewind();

    // Render <head> to string
    // //var head = React.renderToStaticMarkup(Head({title: title}));

    // Write the response
    // TODO: Get from Handlebars template
    res.set('Content-Type', 'text/html');

    // match the requested URL using react-router routes
    match({routes, location: req.url}, (error, redirectLocation, renderProps) => {
        if (error) {
            res.status(500).send(error.message);
        } else if (redirectLocation) {
            res.redirect(302, redirectLocation.pathname + redirectLocation.search);
        } else if (renderProps) {
            const initialComponent = (
                <Provider store={store}>
                    <RoutingContext {...renderProps} />
                </Provider>
            );
            const content = ReactDOMServer.renderToString(initialComponent);
            res.status(200).end(generateSSRPayload(content, store.getState()));
        } else {
            res.status(404).send('Not Found. Sorry.');
        }
    });
});

server.listen(process.env.PORT, () => {
    console.log(` => Server Listening on PORT ${process.env.PORT}`);
});
