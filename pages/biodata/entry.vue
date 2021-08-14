<template>
  <div>
    <detail />
    <nuxt-link to="/home">Home</nuxt-link>
    This is entry.vue
  </div>
</template>
<script>
import detail from './detail.vue'
export default {
  components: { detail },
  data() {
    return {}
  },
}
</script>
