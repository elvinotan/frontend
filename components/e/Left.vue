<template>
  <div class="w-full flex flex-row justify-start" :class="[_col, _gapX, _gapY]">
    <slot />
  </div>
</template>
<script>
export default {
  name: 'ELeft',
  props: {
    gapX: { type: Number, required: false, default: 3 },
    gapY: { type: Number, required: false, default: 2 },
  },
  computed: {
    _col() {
      return `grid-cols-1`
    },
    _gapX() {
      return `gap-x-${this.gapX}`
    },
    _gapY() {
      return `gap-y-${this.gapY}`
    },
  },
  methods: {
    metaData() {
      return {
        name: this._name,
        type: 'container',
        show: true,
      }
    },
  },
}
</script>
