var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'none',
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './source/index.js'
  ],
  output: {
    filename: 'index.js',
    publicPath: 'http://localhost:3000/',
    path: path.resolve(__dirname, 'public'),
    hotUpdateChunkFilename: 'hot/hot-update.js',
    hotUpdateMainFilename: 'hot/hot-update.json'
  },
  module: {
    rules: [
      { // CSS
        test: /\.css$|scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { modules: true, localIdentName: '[path][name]_[local]--[hash:base64:8]' } },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader', options: { includePaths: [path.resolve(__dirname, 'source', 'sass')] }},
          { loader: 'resolve-url-loader' }
        ]
      },
      { // JavaScript
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [
          { loader: 'babel-loader', options: {
            "presets": [["es2015", { "modules": false }], "react" , "stage-0"],
            "plugins": [ "react-css-modules" ]
          } }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      styles: path.join(__dirname, 'source/sass')
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
  devServer: {
    host: 'localhost',
    port: 3000,
    contentBase: 'public/',
    historyApiFallback: true,
    hot: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
  }
};