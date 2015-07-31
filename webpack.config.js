const webpack = require('webpack');
const path = require('path');

var port = process.env.HOT_LOAD_PORT || 8888;

module.exports = {
	cache: true,
	context: __dirname + "/client",
	entry: [
		'webpack-dev-server/client?http://localhost:12345', // WebpackDevServer host and port
		'webpack/hot/only-dev-server',
		'./app' // app entry point
	],
	output: {
		path: __dirname + "/build/",
		publicPath: "http://localhost:" + port + "/build/",
		filename: "[name].bundle.js",
		sourceMapFilename: "[file].map",
		chunkFilename: "[id].bundle.js"
	},
	devtool: "eval",
	plugins: [
		// new webpack.optimize.UglifyJsPlugin()
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	],
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				loaders: ['react-hot', 'babel-loader?stage=0'],
				include: path.join(__dirname, '/client')
			},
			{
				test: /\.css$/
				loaders: ["style", "css"]
			},
		]
	},
	externals: {
		// 'react': 'React'
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	}
	// historyApiFallback: true
}