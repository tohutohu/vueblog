const Vue = require('vue')
const VueI18n = require('vue-i18n')
const i18n = require('../src/i18n/i18n.common.js')

Vue.use(VueI18n)

module.exports = {
  compilerModules: [
    require('vue-i18n-extensions').module(i18n)
  ],
  loaders: {
    extractCSS: process.env.NODE_ENV === 'production',
    preserveWhitespace: false,
    postcss: [
      require('autoprefixer')({
        browsers: ['last 3 versions']
      })
    ]
  }
}
