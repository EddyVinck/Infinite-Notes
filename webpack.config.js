const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // eslint-disable-linex

const config = {
  entry: ['./src/clientApp.jsx'],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/public/',
  },
  devtool: 'cheap-eval-source-map',
  devServer: {
    hot: true,
    inline: true,
    publicPath: '/public/',
    port: 3000,
    bonjour: true,
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
    ignored: /node_modules/,
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
      inject: false,
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};

module.exports = config;
