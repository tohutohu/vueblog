<template>
  <header class="header">
    <div class="container info">
      <div class="nickname" @click="goIndex">{{ administrator.nickname }}</div>
      <div class="intro">{{ administrator.intro }}</div>
    </div>
    <nav class="container nav">
      <ul>
        <li v-for="(item,index) in links" :key="index">
          <router-link :to="item.path" v-t="item.name"></router-link>
        </li>
      </ul>
      <div class="search">
        <input type="search" name="search" placeholder="search" v-model="searchInfo" autofocus @keyup.enter="search">
      </div>
    </nav>
  </header>
</template>
<script>
export default {
  name: 'MyHeader',
  data () {
    return {
      links: [{
        name: 'headers.top',
        path: '/'
      }, {
        name: 'headers.publish',
        path: '/publish'
      }, {
        name: 'headers.admin',
        path: '/admin'
      }],
      searchInfo: ''
    }
  },
  computed: {
    administrator () {
      return this.$store.state.administrator
    }
  },
  methods: {
    search () {
      this.$router.push({
        name: 'search',
        params: {
          change: this.searchInfo
        }
      })
    },
    goIndex () {
      this.$router.push({name: 'index'})
    }
  }
}
</script>
