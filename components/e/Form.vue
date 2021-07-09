<template>
  <div v-show="show" :id="id">
    <slot />
  </div>
</template>
<script>
export default {
  name: 'EForm',
  props: {
    id: { type: String, required: true, default: null },
  },
  data() {
    return { show: true }
  },
  methods: {
    setShow(show) {
      this.show = show
    },
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
