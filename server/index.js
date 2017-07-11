const sass = require('node-sass');
require('css-modules-require-hook')({
  generateScopedName: '[path][name]_[local]--[hash:base64:8]',
  extensions: [ '.scss', '.css' ],
  preprocessCss: data => sass.renderSync({
    data
  }).css
});
require('babel-register');
require('./server');
