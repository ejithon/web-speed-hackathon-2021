const path = require('path');

const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const PUBLIC_PATH = path.resolve(__dirname, '../public');
const UPLOAD_PATH = path.resolve(__dirname, '../upload');

/** @type {import('webpack').Configuration} */
const config = {
  devServer: {
    contentBase: [PUBLIC_PATH, UPLOAD_PATH],
    historyApiFallback: true,
    host: '0.0.0.0',
    port: 8080,
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
  devtool: 'eval',
  mode: 'development',
};

module.exports = merge(common, config);
