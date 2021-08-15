<template>
  <div>
    <EButton id="logout" ref="logout" label="Logout" color="red" @click="logout" />
    <EMessage id="message" ref="message" />
  </div>
</template>
<script>
export default {
  methods: {
    async logout() {
      const { result, error } = await this.$rest.get('/server/logout')
      if (result) {
        this.$rest.removeLocalStorage(this.$enum.LOCAL_STORAGE.APP_TOKEN)
        this.$nav.to({ name: 'index' })
      }
      if (error) {
        this.$refs.message.error('Fail to logout ', error)
      }
    },
  },
}
</script>
