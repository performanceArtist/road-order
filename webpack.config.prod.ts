const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const config = {
  entry: {
    main: ['@babel/polyfill', path.join(__dirname, 'src/client/main.tsx')]
  },

  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@redux': path.resolve(__dirname, 'src/client/redux'),
      '@components': path.resolve(__dirname, 'src/client/components')
    }
  },
  output: {
    path: path.resolve(__dirname, 'dist/dist'),
    filename: '[name].js'
  },
  devServer: {
    port: 3000,
    open: true,
    historyApiFallback: true,
    publicPath: '/',
    proxy: {
      '/': 'http://localhost:5000'
    }
  },
  module: {
    rules: [
      {
        test: /\.(jsx?|tsx?)$/,
        exclude: /node_modules/,
        loader: ['babel-loader']
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader?url=false',
          {
            loader: 'sass-loader',
            options: {
              data: '@import "./globals";',
              includePaths: [path.join(__dirname, 'src')]
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ]
};

export default config;
