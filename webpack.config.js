const webpack = require('webpack');

const port = process.env.HOT_LOAD_PORT || 8888; // eslint-disable-line no-process-env

module.exports = {
    context: __dirname + '/client',
    entry: {
        main: [
            'webpack-dev-server/client?http://localhost:' + port, // WebpackDevServer host and port
            'webpack/hot/only-dev-server',
            './app.js' // app entry point
        ]
    },
    output: {
        path: __dirname + '/build',
        publicPath: 'http://localhost:' + port + '/build/',
        filename: '[name].bundle.js',
        sourceMapFilename: '[file].map',
        chunkFilename: '[id].bundle.js'
    },
    devtool: 'cheap-module-eval-source-map',
    plugins: [
        // new webpack.optimize.UglifyJsPlugin()
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    progress: true,
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loaders: ['react-hot', 'babel?stage=0']
            },
            {
                test: /\.css$/,
                loaders: ['style', 'css']
            }
        ]
    },
    externals: {
        // 'react': 'React'
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        modulesDirectories: [
            "client",
            "node_modules"
        ]
    }
    // historyApiFallback: true
};
