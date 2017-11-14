<template>
  <aside class="admin-aside">
    <ul class="menu">
      <li>
        <h3 @click="goIndex">VueBlog</h3>
      </li>
      <li v-for="item in menu">
        <router-link :to="{path:item.path}" :title="$t(item.name)" v-t="item.name"></router-link>
      </li>
      <li><a @click="logout" v-t="'logout'"></a></li>
    </ul>
  </aside>
</template>
<script>
export default {
  name: 'AdminAside',
  data () {
    return {
      menu: [{
        name: 'adminAside.admin',
        path: '/admin'
      }, {
        name: 'adminAside.publish',
        path: '/publish'
      }, {
        name: 'adminAside.updateAdminInfo',
        path: '/updateAdminInfo'
      }, {
        name: 'adminAside.updateAdminPassword',
        path: '/updateAdminPassword'
      }]
    }
  },
  methods: {
    logout () {
      this.axios.post('/logout').then((data) => {
        if (data.data.code === 200) {
          this.$router.push({ name: 'index' })
          this.$router.go(0)
        }
      })
    },
    goIndex () {
      this.$router.push({name: 'index'})
    }
  }
}
</script>
