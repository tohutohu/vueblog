<template>
  <div class="admin">
    <admin-aside></admin-aside>
    <div class="admin-content">
      <div class="essay">
        <div class="form">
          <div class="title">
            <input type="text" v-model="title" :placeholder="$t('publish.articleTitle')" autofocus>
          </div>
          <div class="content">
            <top-editor v-model="content" :upload="upload" :options="options"></top-editor>
          </div>
          <div class="bottom">
            <div class="tag">
              <input type="text" v-model="tag" :placeholder="$t('publish.tagInput')">
            </div>
            <div class="btn">
              <button type="button" @click="publish" v-t="'publish.publish'"></button>
              <button type="button" @click="draft" v-t="'publish.draft'"></button>
            </div>
          </div>
          <div class="tags">
            <span v-t="'publish.selectTags'"></span>
            <span v-for="(item,index) in tags" :key="index" @click="chooseTag(item)"><a>{{item.tag}}</a></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AdminAside from '../../components/admin/AdminAside.vue'
import hljs from 'highlight.js'
export default {
  name: 'Publish',
  data () {
    return {
      title: '',
      content: '',
      tag: '',
      date: '',
      articleID: this.$route.params.id,
      upload: {
        url: '/api/upload'
      },
      options: {
        linkify: true,
        highlight (str, lang) {
          lang = lang || 'javascript'
          if (hljs.getLanguage(lang)) {
            try {
              return hljs.highlight(lang, str).value
            } catch (__) {}
          }
          return ''
        }
      }
    }
  },

  mounted () {
    if (this.articleID) {
      this.axios.get(`/article?id=${this.articleID}`).then((data) => {
        let result = data.data.result[0]
        this.title = result.title
        this.content = result.content
        let tag = result.tag
        this.tag = tag.join(',') + ','
        this.date = result.date
      })
    }
  },
  methods: {
    // 发布文章
    publish () {
      if (!this.title) {
        this.$toast(this.$t('publish.emptyTitle'))
        return
      }
      if (!this.content) {
        this.$toast(this.$t('publish.emptyBody'))
        return
      }

      this.axios.post('/article', {
        'title': this.title,
        'content': this.content,
        'tag': this.trim(this.tag),
        'state': 'publish',
        'date': Number(this.date) || Date.now()
      }).then((result) => {
        this.$router.push({
          name: 'admin'
        })
      })
    },

    // 保存为草稿
    draft () {
      this.axios.post('/article', {
        'title': this.title,
        'content': this.content,
        'tag': this.trim(this.tag),
        'state': 'draft',
        'date': Number(this.date) || Date.now()
      }).then((result) => {
        this.$router.push({
          name: 'admin'
        })
      })
    },

    // 把多个标签分割成数组
    trim (str) {
      return str.replace(/(^\s*)|(\s*$)|(,$)/g, '').split(',')
    },

    // 选择已有标签
    chooseTag (item) {
      this.tag = this.tag + item.tag + ','
    }
  },
  components: {
    AdminAside
  },
  computed: {
    tags () {
      return this.$store.state.tags
    }
  },
  asyncData ({
    store,
    route
  }) {
    return store.dispatch('TAGS')
  }
}
</script>
<style>
@import '~highlight.js/styles/github.css';
</style>
