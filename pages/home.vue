<template>
  <div>
    <div>
      <nuxt-link to="/docs">Document</nuxt-link>

      <EButton id="list" ref="list" label="Biodata List" :disabled="false" @click="list" />
      <EButton id="entry" ref="entry" label="Biodata Entry" :disabled="false" @click="entry" />
      <EButton id="approval" ref="approval" label="Biodata Approval" :disabled="false" @click="approval" />
    </div>
  </div>
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
      this.$nav.to({ name: 'biodata-list' })
    },
    entry() {
      this.$nav.to({ name: 'biodata-entry' })
    },
    approval() {
      this.$nav.to({ name: 'biodata-approval' })
    },
  },
}
</script>
