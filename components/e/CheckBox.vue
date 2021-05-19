<template>
  <div>
    <div v-if="show">
      <label class="inline-flex items-center mt-3">
        <input
          :id="id"
          v-model="lvalue"
          type="checkbox"
          :disabled="ldisabled"
          class="h-4 w-4 field relative"
          :class="[_cssInputBg]"
          @input="_input"
          @blur="_blur"
        />
        <span :for="id" class="text-sm px-1" :class="[_cssInputText]">{{
          label
        }}</span>
      </label>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CheckBox',
  props: {
    id: { type: String, required: true, default: null },
    label: { type: String, required: false, default: '' },
    show: { type: Boolean, required: false, default: true },
    vruntime: { type: Function, required: false, default: null },
    value: { type: [String, Boolean, Number], required: false, default: null },
    selected: {
      type: [String, Number, Boolean],
      required: false,
      default: true,
    },
    unselected: {
      type: [String, Number, Boolean],
      required: false,
      default: false,
    },
  },
  data() {
    return {
      lvalue: this.value,
      state: 0,
      errors: [],
      ldisabled: false,
    }
  },
  computed: {
    _cssInputBg() {
      const css = this.ldisabled ? 'bg-gray-200' : 'bg-white'
      return css
    },
    _cssInputText() {
      const css = this.ldisabled ? 'text-gray-500' : 'text-gray-800'
      return css
    },
  },
  watch: {
    value(newVal, oldVal) {
      this.lvalue = newVal
    },
  },
  methods: {
    _input(event) {
      const value = event.target.checked
      const cvalue = value ? this.selected : this.unselected
      this.$emit(event.type, cvalue)
    },
    _blur(event) {
      const value = event.target.checked
      const cvalue = value ? this.selected : this.unselected
      this.$emit(event.type, cvalue)
    },
    metaData() {
      return {
        name: this._name,
        type: 'input',
        show: this.show,
      }
    },
    disabled(ldisabled) {
      this.ldisabled = ldisabled
    },
  },
}
</script>
