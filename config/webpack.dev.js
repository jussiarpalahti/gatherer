var webpack = require('webpack');
var path = require('path');

var APP_DIR = path.join(__dirname, '..', 'src');

module.exports = {
  debug: true,
  devtool: 'eval',
  entry: ['webpack-hot-middleware/client', './src/index.tsx'],
  module: {
    loaders: [{
      test: /\.tsx?$/,
      loaders: ['babel', 'ts'],
      include: APP_DIR
    },
    {
      test: /\.js?$/,
      loaders: ['babel'],
      include: APP_DIR
    }]
  },
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '..', 'dist'),
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    root: [path.resolve('../src')],
    extensions: ['', '.jsx', '.js', '.tsx', '.ts']
  }
};
