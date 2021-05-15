<template>
  <div>
    <div v-if="show">
      <button
        :id="id"
        type="button"
        :disabled="disabled"
        class="text-white font-bold py-1 px-2 rounded border-0 focus:outline-white outline-none ring-2 ring-gray-500 text-xs shadow-lg"
        :class="[_cssBorder, _cssLabelBg]"
        @click="_event"
      >
        {{ label }}
      </button>
    </div>
    <button
      v-if="show"
      :id="id"
      type="button"
      :disabled="disabled"
      class="hover:bg-blue-700 text-white font-bold py-1 px-1 border border-blue-700 rounded text-xs"
      :class="[
        ...(disabled
          ? ['bg-blue-700 opacity-50 cursor-not-allowed']
          : ['bg-blue-700']),
      ]"
      @click="_event"
    >
      {{ label }}
    </button>
  </div>
</template>
<script>
export default {
  name: 'Button',
  props: {
    id: { type: String, required: true },
    label: { type: String, required: false, default: '' },
    disabled: { type: Boolean, required: false, default: false },
    show: { type: Boolean, required: false, default: true },
    color: { type: String, required: true },
  },
  computed: {
    _cssBorder() {
      const color = this.color ? this.color : 'gray'
      return `ring-${color}-800 focus:ring-${color}-600`
    },
    _cssLabelBg() {
      const color = this.color ? this.color : 'gray'
      const disabledClass = this.disabled
        ? ' opacity-50 cursor-not-allowed '
        : ''
      return `bg-${color}-500 ${disabledClass}`
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
