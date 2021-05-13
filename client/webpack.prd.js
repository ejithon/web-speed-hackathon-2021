const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

/** @type {import('webpack').Configuration} */
const config = {
  mode: 'production',
};

module.exports = merge(common, config);
