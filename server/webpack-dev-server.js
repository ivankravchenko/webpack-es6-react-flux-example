// This little dev server is basically a wrapped express server that
// 'hot loads' our javascript for super fast live reload in development
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('../webpack.config');
var host = process.env.HOST || 'localhost';
var port = process.env.HOT_LOAD_PORT || 8888;

new WebpackDevServer(webpack(config), {
  contentBase: 'http://' + host + ':' + port,
  publicPath: config.output.publicPath,
  noInfo: true,
  hot: true,
  inline: true,
  lazy: false,
  headers: {"Access-Control-Allow-Origin": "*"},
  stats: {
    colors: true
  }
}).listen(port, host, function (err, result) {
  if (err) {
    console.log(err);
  }

  console.log('Hot load server listening at ' + host + ':' + port);
});