const merge = require('webpack-merge');
import baseConfig from './webpack.base.config';
import { makeHTMLPages } from './webpack.utils';

module.exports = merge(baseConfig, {
  devServer: {
    port: 3000,
    open: true,
    publicPath: '/',
    historyApiFallback: true,
    proxy: {
      '/': 'http://localhost:5000'
    },
    disableHostCheck: true
  },
  entry: {
    rhl: 'react-hot-loader/patch'
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  plugins: makeHTMLPages(['driver', 'operator'], 'src/client/entries')
});
