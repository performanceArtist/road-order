const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const config = {
  entry: {
    driver: [
      '@babel/polyfill',
      path.join(__dirname, 'src/client/entries/driver/index.tsx')
    ],
    operator: [
      '@babel/polyfill',
      path.join(__dirname, 'src/client/entries/operator/index.tsx')
    ],
    login: [
      '@babel/polyfill',
      path.join(__dirname, 'src/client/entries/public/index.tsx')
    ],
    admin: [
      '@babel/polyfill',
      path.join(__dirname, 'src/client/entries/admin/index.tsx')
    ]
  },
  resolve: {
    modules: ['node_modules', 'client'],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
      '@root': path.resolve(__dirname, 'src'),
      '@client': path.resolve(__dirname, 'src/client'),
      '@redux': path.resolve(__dirname, 'src/client/redux'),
      '@components': path.resolve(__dirname, 'src/client/components'),
      '@features': path.resolve(__dirname, 'src/client/features'),
      '@elements': path.resolve(__dirname, 'src/client/elements'),
      '@shared': path.resolve(__dirname, 'src/client/shared')
    }
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 2,
          minSize: 0
        }
      }
    }
  },
  output: {
    path: path.resolve(__dirname, 'dist/dist'),
    filename: '[name].js',
    chunkFilename: '[name].js'
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
            loader: 'style-loader'
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
