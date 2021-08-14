<template>
  <div></div>
</template>
<script>
export default {
  data() {
    return {}
  },
  created() {
    this.$nav.breadcrumb('BN001')
  },
  methods: {
    list() {
      this.$nav.to({ path: '/biodata/list' })
    },
    entry() {
      this.$nav.to({ path: '/biodata/entry' })
    },
    approval() {
      this.$nav.to({ path: '/biodata/approval' })
    },
  },
}
</script>
