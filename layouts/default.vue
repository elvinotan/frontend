<template>
  <div>
    <EPageLoader id="layoutPageLoader" ref="layoutPageLoader" label="Main Page" :fetcher="layoutPageLoader">
      <Header />
      <div class="m-5">
        <EBreadcrumb />
        <br />
        <Nuxt />
      </div>
      <Footer />
    </EPageLoader>
  </div>
</template>
<script>
export default {
  methods: {
    async layoutPageLoader() {
      const { result, error } = await this.$rest.get('/cache/fetch')

      if (result) {
        if (result.LOOKUPGROUP) {
          for (const [key, value] of Object.entries(result.LOOKUPGROUP)) {
            this.$rest.setVuex(this.$enum.VUEX.LOOKUP_PREFIX + key, value)
          }
        }

        await this.$rest.delay(1500)
        return true
      }

      if (error) {
        this.$refs.layoutPageLoader.setInfo(error)
        return false
      }
    },
  },
}
</script>
<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
