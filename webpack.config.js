const webpack = require("webpack")

const PORT = process.env.PORT || 3000;

module.exports = {
	context: __dirname + "/client",
	entry: [
		"webpack-dev-server/client?http://localhost:" + PORT,
		"webpack/hot/only-dev-server",
		"./app"
	],
	output: {
		path: __dirname + "/public",
		publicPath: "/",
		filename: "[name].bundle.js",
		sourceMapFilename: "[file].map",
		chunkFilename: "[id].bundle.js"
	},
	devServer: {
		// https: true,
		port: PORT,
		hot: true,
		historyApiFallback: true,
		contentBase: 'public'
	},
	devtool: "cheap-module-eval-source-map",
	plugins: [
		// new webpack.optimize.UglifyJsPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	],
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				loaders: ['react-hot', 'babel?stage=0']
			},
			{
				test: /\.css$/,
				loaders: ["style", "css"]
			}
		]
	},
	externals: {
		// 'react': 'React'
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	}
}