<template>
  <div>
    <button
      v-if="show"
      :id="id"
      type="text"
      :disabled="disabled"
      class="hover:bg-blue-700 text-white font-bold py-1 px-1 border border-blue-700 rounded text-sm"
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
    id: { type: String, required: true, default: null },
    label: { type: String, required: false, default: '' },
    disabled: { type: Boolean, required: false, default: false },
    show: { type: Boolean, required: false, default: true },
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
