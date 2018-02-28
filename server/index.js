const sass = require('node-sass');
const path = require('path');

require('css-modules-require-hook')({
  generateScopedName: '[path][name]_[local]--[hash:base64:8]',
  extensions: [ '.scss', '.css' ],
  preprocessCss: (data, filename) => sass.renderSync({
    data,
    file: filename,
    includePaths: [path.resolve(__dirname, '..', 'source', 'sass')]
  }).css});
require('babel-register');
require('./server');
