<template>
  <aside class="aside">
    <my-profile />
    <div class="tags">
      <div class="title" v-t="'myAside.tags'"></div>
      <div class="list">
        <ul>
          <li v-for="(item,index) in tags" :key="index">
            <router-link :to="{name:'category',params:{change:item.tag}}">{{item.tag}} ({{item.count}})</router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="archives">
      <div class="title" v-t="'myAside.archives'"></div>
      <div class="list">
        <ul>
          <li v-for="(item,index) in archives" :key="index">
            <router-link :to="{name:'archive',params:{change:item.date}}">{{item.date | formatArchive }} ({{item.count}})</router-link>
          </li>
        </ul>
      </div>
    </div>
  </aside>
</template>
<script>
import Profile from './Profile.vue'
export default {
  name: 'MyAside',
  computed: {
    tags () {
      return this.$store.state.tags
    },
    archives () {
      return this.$store.state.archives
    }
  },
  components: {
    'my-profile': Profile
  }
}
</script>
