<template>
  <div>
    <slot />
  </div>
</template>
<script>
export default {
  name: 'Form',
  methods: {
    metaData() {
      return {
        name: this._name,
        type: 'container',
        show: false,
      }
    },
  },
}
</script>
