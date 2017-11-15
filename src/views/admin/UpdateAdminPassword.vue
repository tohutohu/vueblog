<template>
  <div class="admin">
    <admin-aside></admin-aside>
    <div class="admin-content">
      <div class="edit">
        <div class="my-input">
          <input type="text" v-model="oldPass" :placeholder="$t('updateAdminPassword.oldPass')">
        </div>
        <div class="my-input">
          <input type="password" v-model="pass" :placeholder="$t('updateAdminPassword.pass')">
        </div>
        <div class="my-input">
          <input type="password" v-model="verifyPass" :placeholder="$t('updateAdminPassword.verifyPass')">
        </div>
        <button type="button" @click="updateAdminPassword" v-t="'updateAdminPassword.confirm'"></button>
      </div>
    </div>
  </div>
</template>
<script>
import AdminAside from '../../components/admin/AdminAside.vue'
export default {
  name: 'UpdateAdminPassword',
  data () {
    return {
      oldPass: '',
      pass: '',
      verifyPass: ''
    }
  },
  methods: {
    // 修改密码
    updateAdminPassword () {
      if (this.pass !== this.verifyPass) {
        this.$toast(this.$t('updateAdminPassword.toastMessage'))
        return
      }
      this.axios.put('/password', {
        oldPass: this.oldPass,
        pass: this.pass
      }).then((result) => {
        if (result.data.code === 200) {
          this.$router.push({ name: 'login' })
        } else {
          this.$toast(result.data.message)
        }
      })
    }
  },
  components: {
    AdminAside
  }
}
</script>
