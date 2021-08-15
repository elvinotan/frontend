<template>
  <div>
    <ECenter :gap-x="10">
      <EButton id="biodata" label="Biodata" :disabled="false" @click="biodata" />
      <EButton id="component" label="Component" :disabled="false" @click="component" />
    </ECenter>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  created() {
    this.$nav.breadcrumb('BN000')
  },
  methods: {
    biodata() {
      this.$nav.to({ name: 'biodata-list' })
    },
    component() {
      this.$nav.to({ name: 'docs' })
    },
  },
}
</script>
