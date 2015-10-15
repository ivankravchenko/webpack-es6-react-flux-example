/* eslint-disable no-process-env */
import WebpackErrorNotificationPlugin from 'webpack-error-notification';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import AssetsPlugin from 'assets-webpack-plugin';
import webpack from 'webpack';
import path from 'path';

const DEBUG = !process.argv.includes('--release');
const GLOBALS = {
    'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
    __DEV__: DEBUG,
    'process.env.PORT': process.env.PORT || 8080,
    'process.env.HMR_PORT': process.env.HMR_PORT || 8888,
    'process.env.HOST': process.env.HOST || '"localhost"'
};

const CSS_LOADER = DEBUG ? 'css?sourceMap' : 'css?sourceMap&minimize';
//const CSS_LOADER_PARAMS = `modules&localIdentName=${DEBUG ? '[dir]--[local]--[sourceHash:5]' : '[sourceHash]&minimize'}`;
const SASS_LOADER = 'sass?sourceMap&includePaths[]=' + path.resolve(__dirname, './src/styles');

// Common configuration for both client-side and server-side bundles
const config = {
    cache: DEBUG,
    debug: DEBUG,

    stats: {
        colors: true,
        reasons: DEBUG
    },

    plugins: [
        new WebpackErrorNotificationPlugin()
    ].concat(DEBUG ? [] : [
        new ExtractTextPlugin('styles.[contenthash].css'),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin()
    ]),

    resolve: {
        extensions: ['', '.js', '.jsx'],
        modulesDirectories: [
            'src',
            'node_modules'
        ]
    },

    module: {
        // preLoaders: [{
        //   test: /\.jsx?$/,
        //   exclude: /node_modules/,
        //   loader: 'eslint'
        // }],

        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'react-hot!babel?stage=0&cacheDirectory'
        }, {
            test: /\.json$/,
            loader: 'json'
        }, {
            test: /\.(jpe?g|png|gif|svg)$/,
            loader: 'url?limit=10000!img'
        }, {
            test: /\.ttf$/,
            loader: 'url'
        }]
    }
};

// Configuration for the client-side bundle (app.js)
const appConfig = Object.assign({}, config, {
    entry: './src/app.js',

    output: {
        path: '/dist/public',
        publicPath: DEBUG ? `http://${GLOBALS['process.env.HOST'].replace(/\"/g, '')}:${GLOBALS['process.env.HMR_PORT']}/` : '',
        filename: DEBUG ? 'bundle.js' : 'bundle.[hash].js'
    },

    devtool: DEBUG ? 'cheap-module-eval-source-map' : false,
    plugins: config.plugins.concat(
        new webpack.DefinePlugin(Object.assign({}, GLOBALS, {
            __SERVER__: false
        })),
        new AssetsPlugin({
            path: path.join(__dirname, 'dist')
        })
        // Disabled until it's compatible with React 0.13.3 zilverline/react-tap-event-plugin/issues/22
        //new webpack.BannerPlugin('require("react-tap-event-plugin")();', { raw: true, entryOnly: false })
    ),

    module: Object.assign({}, config.module, {
        loaders: config.module.loaders.concat([{
            test: /\.css$/,
            loader: DEBUG ? `style!${CSS_LOADER}` 
                    : ExtractTextPlugin.extract('style', CSS_LOADER)
        }, {
            test: /\.scss$/,
            loader: DEBUG ? `style!${CSS_LOADER}!autoprefixer!${SASS_LOADER}`
                        : ExtractTextPlugin.extract('style', `${CSS_LOADER}!autoprefixer!${SASS_LOADER}`)
        }])
    })
});

// Configuration for the server-side bundle (server.js)
const serverConfig = Object.assign({}, config, {
    entry: './src/server.js',

    output: {
        path: './dist',
        filename: 'server.js',
        libraryTarget: 'commonjs2'
    },

    node: {
        console: false,
        global: false,
        process: false,
        Buffer: false,
        __filename: false,
        __dirname: false
    },

    target: 'node',
    externals: /^[a-z0-9\-]+$/,
    devtool: 'source-map',

    plugins: config.plugins.concat(
        new webpack.DefinePlugin(Object.assign({}, GLOBALS, {
            __SERVER__: true
        })),
        //new webpack.BannerPlugin('require("source-map-support").install();', { raw: true, entryOnly: false })
    ),

    module: Object.assign({}, config.module, {
        loaders: config.module.loaders.concat([{
            test: /\.css$/,
            loader: CSS_LOADER
        }, {
            test: /\.scss$/,
            loader: `css/locals?sourceMap!autoprefixer!${SASS_LOADER}`
        }, {
            test: /\.hbs$/,
            loader: 'handlebars'
        }])
    })
});

export default {
    appConfig,
    serverConfig
};
