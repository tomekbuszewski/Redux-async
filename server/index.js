require('css-modules-require-hook')({
  generateScopedName: '[path][name]_[local]--[hash:base64:8]'
});
require('babel-register');
require('./server');
