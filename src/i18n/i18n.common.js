const Vue = require('vue')
const VueI18n = require('vue-i18n')
const zh = require('./zh-CN.js')
const ja = require('./ja-JP.js')
const settings = require('../../settings.js')

Vue.use(VueI18n)

module.exports = new VueI18n({
  locale: settings.lang,
  messages: {
    zh,
    ja
  },
  missing: function (locale, key) {
    console.warn('missing:', locale, key)
  }
})
