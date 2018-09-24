const webpack = require('webpack');
const path = require('path');

const config = {
  entry: [
    // 'react-hot-loader/patch',
    // 'webpack-dev-server/client?http://localhost:3000',
    // 'webpack/hot/only-dev-server',
    './src/clientApp.jsx',
  ],
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
  plugins: [new webpack.HotModuleReplacementPlugin()],
};

module.exports = config;
