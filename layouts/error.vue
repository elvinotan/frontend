<template>
  <div>
    <ECenter>
      <div>Error Page</div>
    </ECenter>
    <ECenter>
      <div>{{ error.statusCode }}</div>
    </ECenter>
    <ECenter>
      <div>{{ error.message }}</div>
    </ECenter>
    <br />
    <ECenter>
      <div><nuxt-link to="/">Home</nuxt-link></div>
    </ECenter>
  </div>
</template>
<script>
export default {
  props: {
    error: {
      type: Object,
      required: false,
      default: () => {
        return {}
      },
    },
  },
}
</script>
