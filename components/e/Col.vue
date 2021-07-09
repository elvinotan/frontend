<template>
  <div class="grid w-full flex content-start" :class="[_col, _gapX, _gapY]">
    <slot />
  </div>
</template>
<script>
export default {
  name: 'ECol',
  props: {
    col: { type: Number, required: false, default: 1 },
    gapX: { type: Number, required: false, default: 3 },
    gapY: { type: Number, required: false, default: 2 },
  },
  computed: {
    _col() {
      return `grid-cols-${this.col}`
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
