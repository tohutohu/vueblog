<template>
  <div class="login">
    <h4 class="title" v-t="'login.title'"></h4>
    <div class="form">
      <input type="text" :placeholder="$t('login.user')" name="user" v-model="user">
      <input type="password" :placeholder="$t('login.pass')" name="pass" v-model="pass" @keyup.enter="login">
      <button type="button" @click="login" v-t="'login.login'"></button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data () {
    return {
      user: '',
      pass: ''
    }
  },
  methods: {
    login () {
      this.axios.post('/login', {
        'user': this.user,
        'pass': this.pass
      }).then((result) => {
        if (result.data.code === 200) {
          this.$router.push({
            name: 'publish'
          })
        } else {
          this.$toast(result.data.message)
        }
      })
    }
  }
}
</script>
