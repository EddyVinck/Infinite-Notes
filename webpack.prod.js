const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // eslint-disable-line

const config = {
  entry: ['./src/clientApp.jsx'],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/public/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: '/node_modules/',
      },
      {
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        exclude: '/node_modules/',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Infinite Notes',
      filename: 'index.html',
      template: './index.html',
    }),
    new UglifyJsPlugin(),
  ],
};

module.exports = config;
