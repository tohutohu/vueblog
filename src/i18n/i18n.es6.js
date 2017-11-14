import Vue from 'vue'
import VueI18n from 'vue-i18n'
import zh from './zh-CN.js'
import ja from './ja-JP.js'
import settings from '../../settings.js'

Vue.use(VueI18n)

export default new VueI18n({
  locale: settings.lang,
  messages: {
    zh,
    ja
  },
  missing: function (locale, key) {
    console.warn('missing:', locale, key)
  }
})
