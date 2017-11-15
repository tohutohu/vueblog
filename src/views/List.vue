<template>
  <div class="list">
    <my-header></my-header>
    <div class="container wrap">
      <article-list></article-list>
      <my-aside></my-aside>
    </div>
    <my-footer></my-footer>
  </div>
</template>
<script>
import MyHeader from '../components/global/MyHeader.vue'
import MyAside from '../components/global/MyAside.vue'
import ArticleList from '../components/global/ArticleList.vue'
import MyFooter from '../components/global/MyFooter.vue'
export default {
  name: 'List',
  components: {
    MyHeader,
    MyAside,
    ArticleList,
    MyFooter
  },
  metaInfo () {
    return {
      meta: [
        {charset: 'utf-8'},
        {vmid: 'og:title', property: 'og:title', content: 'test'},
        {vmid: 'og:type', property: 'og:type', content: 'blog'},
        {vmid: 'og:url', property: 'og:url', content: 'https://to-hutohu.com'},
        {vmid: 'og:image', property: 'og:image', content: ''},
        {vmid: 'og:site_name', property: 'og:site_name', content: 'とーふとふのブログ'},
        {vmid: 'og:description', property: 'og:description', content: 'ブログです'},
        {vmid: 'twitter:site', property: 'twitter:site', content: '@to_hutohu'},
        {vmid: 'twitter:card', property: 'twitter:card', content: 'summary'}
      ]
    }
  }
}
</script>
