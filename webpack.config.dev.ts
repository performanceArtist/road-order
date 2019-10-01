const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
import baseConfig from './webpack.base.config';

module.exports = merge(baseConfig, {
  entry: {
    rhl: 'react-hot-loader/patch'
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/client/entries/user/index.html',
      filename: `user.html`,
      chunks: []
    }),
    new HtmlWebpackPlugin({
      template: 'src/client/entries/operator/index.html',
      filename: `index.html`,
      chunks: []
    })
  ]
});
