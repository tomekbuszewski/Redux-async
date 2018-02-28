module.exports = {
  plugins: [
    require('autoprefixer')({ browsers: ['> 5%'] }),
    require('postcss-advanced-variables'),
    require('postcss-modules-values'),
    require('postcss-each'),
    require('postcss-for'),
    require('postcss-nested'),
  ]
};