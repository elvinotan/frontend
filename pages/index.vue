<template>
  <div>
    <ECol :col="3">
      <EBlank />
      <ECard label="Login" :disabled="false" :show="true">
        <EForm id="login" ref="login">
          <EText id="username" ref="username" v-model="model.username" label="Username" type="short" :required="true" :disabled="ui.username.disabled" :show="true" />
          <EPassword id="password" ref="password" v-model="model.password" label="Password" :required="true" :disabled="ui.password.disabled" :show="true" />
        </EForm>
        <EButton id="signIn" ref="signIn" label="Sign In" :disabled="ui.signIn.disabled" color="green" :show="true" @click="signIn" />
      </ECard>
      <EBlank />
    </ECol>
    <EMessage id="message" ref="message" />
  </div>
</template>
<script>
export default {
  layout: 'login',
  data() {
    return {
      ui: {
        username: { disabled: false },
        password: { disabled: false },
        signIn: { disabled: false },
      },
      model: {
        username: '',
        password: '',
      },
    }
  },
  mounted() {
    // setiap tampilan login muncul, lakukan remove localstorage semuanya
    this.$rest.removeLocalStorage(this.$enum.LOCAL_STORAGE.APP_TOKEN)
  },
  methods: {
    async signIn() {
      const { valid } = this.$wrapper.validate(this.$refs.login)
      if (valid) {
        this.$wrapper.disabled([this.ui], true)
        const { result, error } = await this.$rest.post('/auth/login', this.model)
        this.$wrapper.disabled([this.ui], false)

        if (result) {
          this.$rest.setLocalStorage(this.$enum.LOCAL_STORAGE.APP_TOKEN, result)
          this.$nav.to({ name: 'home' })
        }

        if (error) {
          this.$refs.message.error('Fail to login ', error)
        }
      }
    },
  },
}
</script>
