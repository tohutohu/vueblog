<template>
  <div class="article-list">
    <ul class="items">
      <li v-for="(item,index) in data" class="item" :key="index">
        <router-link class="title" :to="{name:'article',params:{id:item.date}}">{{item.title}}</router-link>
        <article class="content">{{item.content | markdownParse | cutString(200)}}</article>
      </li>
    </ul>
    <div class="tips" v-if="data.length === 0 && this.$route.name === 'search'">
      <p>{{$t('articleList.relatedArticle')}}<strong>{{ change }}</strong>{{$t('articleList.notFound')}}</p>
    </div>
    <div class="tips" v-if="data.length === 0 && this.$route.name !== 'search'">
      <p v-t="'articleList.noArticle'"></p>
    </div>
    <div class="page" v-show="maxPage > 1">
      <router-link v-if="page > 1" :to="{name:type,params:{change:change,page:page - 1}}" class="prev" v-t="'articleList.prevPage'"></router-link>
      <a v-else class="disabled prev" v-t="'articleList.prevPage'"></a>
      <router-link v-if="hasMore" :to="{name:type,params:{change:change,page:page + 1}}" class="next" v-t="'articleList.nextPage'"></router-link>
      <a v-else class="disabled next" v-t="'articleList.nextPage'"></a>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ArticleList',
  title () {
    return 'vueblog'
  },
  beforeMount () {
    if (this.$root._isMounted) {
      this.listPage()
    }
  },
  props: ['type'],
  computed: {
    data () {
      return this.$store.state.articleList
    },
    maxPage () {
      return Math.ceil(Number(this.$store.state.total) / 15)
    },
    change () {
      return this.$route.params.change
    },
    page () {
      return Number(this.$route.params.page) || 1
    },
    hasMore () {
      return this.page < this.maxPage
    }
  },
  watch: {
    $route (to, from) {
      this.listPage()
    }
  },
  methods: {
    // 点击分页后，重新获取数据
    listPage () {
      this.$bar.start()
      this.$store.dispatch('LIST_PAGE').then(() => {
        this.$bar.finish()
      })
    }
  }
}
</script>
