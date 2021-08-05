<template>
  <div>
    <ECard label="Login" :disabled="false" :show="true">
      <EForm id="login" ref="login">
        <ECol>
          <EText id="username" ref="username" v-model="model.username" label="Username" type="short" :required="true" :disabled="ui.username.disabled" :show="true" />
          <EPassword id="password" ref="password" v-model="model.password" label="Password" :required="true" :disabled="ui.password.disabled" :show="true" />
        </ECol>
      </EForm>
      <EButton id="signIn" ref="signIn" label="Sign In" :disabled="ui.signIn.disabled" color="green" :show="true" @click="signIn" />
    </ECard>
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
  methods: {
    async signIn() {
      const { valid, errors } = this.$wrapper.validate(this.$refs.login)
      if (valid) {
        this.$wrapper.disabled([this.ui], true)
        const { result, error } = await this.$rest.post('/auth/login', this.model)
        this.$wrapper.disabled([this.ui], false)

        if (result) {
          this.$rest.setLocalStorage(this.$enum.LOCAL_STORAGE.APP_TOKEN, result)
          this.$router.push({ path: '/home' })
        }

        if (error) {
          this.$rest.removeLocalStorage(this.$enum.LOCAL_STORAGE.APP_TOKEN)
          this.$refs.message.error('Fail to login ', error)
        }
      }
      if (errors) {
        // do nothing krn error sudah show di component
      }
    },
  },
}
</script>
