<template>
  <div>
    <div v-if="show">
      <button
        :id="id"
        type="button"
        :disabled="disabled"
        class="text-sm font-bold py-1 px-2 rounded border-0 focus:outline-none outline-none ring-2 ring-gray-500"
        :class="[_cssBorder, _cssLabelBg, _cssInputText]"
        @click="_event"
      >
        {{ label }}
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Button',
  props: {
    id: { type: String, required: true },
    label: { type: String, required: false, default: '' },
    show: { type: Boolean, required: false, default: true },
    disabled: { type: Boolean, required: false, default: false },
    color: { type: String, required: false, default: 'gray' },
  },
  computed: {
    _cssBorder() {
      const color = this.color ? this.color : 'gray'
      return `ring-${color}-600 focus:ring-${color}-100`
    },
    _cssLabelBg() {
      const color = this.color ? this.color : 'gray'
      const disabledClass = this.disabled
        ? ' opacity-50 cursor-not-allowed '
        : ''
      return `bg-${color}-500 ${disabledClass}`
    },
    _cssInputText() {
      const css = this.disabled ? 'text-gray-200' : 'text-white'
      return css
    },
  },
  methods: {
    _event(evt) {
      this.$emit(evt.type)
    },
    metaData() {
      return {
        name: this._name,
        type: 'action',
        show: this.show,
      }
    },
  },
}
</script>
