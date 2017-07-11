var path = require('path');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var browserSync = new BrowserSyncPlugin({
  proxy: {
    target: "http://localhost:1199",
    ws: true
  }
});

module.exports = {
  devtool: 'none',
  entry: './source/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'public')
  },
  module: {
    rules: [
      { // CSS
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { modules: true, localIdentName: '[path][name]_[local]--[hash:base64:8]' } },
          { loader: 'postcss-loader' },
          { loader: 'resolve-url-loader' },
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
  plugins: [
    browserSync
  ]
};