const merge = require('webpack-merge');
import baseConfig from './webpack.base.config';

module.exports = merge(baseConfig, { module: {} });
