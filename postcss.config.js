module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-nested'),
    require('autoprefixer'),
    process.env.NODE_ENV === 'production' ? require('cssnano') : null
  ].filter(Boolean)
}
