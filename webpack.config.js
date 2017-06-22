var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

var extractScss = new ExtractTextPlugin({ filename: '[name].css' });
var browserSync = new BrowserSyncPlugin({
  proxy: {
    target: "http://localhost:1199",
    ws: true
  }
});

module.exports = {
  devtool: 'source-map',
  entry: './source/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'public')
  },
  module: {
    rules: [
      { // SCSS
        test: /\.scss$/,
        use: extractScss.extract({
          use: [
            { loader: 'css-loader', options: { sourceMap: true, minimize: true } },
            { loader: 'sass-loader', options: { sourceMap: true, includePaths: ['./source/sass'] }},
            { loader: 'resolve-url-loader' }
          ],
          fallback: 'style-loader'
        })
      },
      { // JavaScript
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [
          { loader: 'babel-loader', options: {
            "presets": [["es2015", { "modules": false }], "react" , "stage-0"]
          } }
        ]
      }
    ]
  },
  plugins: [
    extractScss,
    browserSync
  ]
};
