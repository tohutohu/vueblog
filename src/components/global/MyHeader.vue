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
        <li v-for="(item,index) in adminLinks" v-if="isAdmin" :key="index">
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
import cookies from 'js-cookie'
export default {
  name: 'MyHeader',
  data () {
    return {
      links: [{
        name: 'headers.top',
        path: '/'
      }],
      adminLinks: [{
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
    },
    isAdmin () {
      return !!((cookies.get('token') || this.$store.state.cookies.token))
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
