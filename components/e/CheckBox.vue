<template>
  <div>
    {{ $data }}
    <div v-if="show">
      <label class="inline-flex items-center mt-3">
        <input
          :id="id"
          v-model="lvalue"
          type="checkbox"
          :disabled="disabled"
          class="h-4 w-4 field relative"
          :class="[_cssInputBg]"
          @input="_input"
          @blur="_blur"
        />
        <span :for="id" class="text-sm px-1" :class="[_cssInputText]">{{
          option.description
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
    disabled: { type: Boolean, required: false, default: false },
    show: { type: Boolean, required: false, default: true },
    vruntime: { type: Function, required: false, default: null },
    value: { type: [String, Boolean], required: false, default: null },
    as: { type: String, required: false, default: 'boolean' }, // as boolean, string, number
    option: {
      type: Object,
      required: false,
      default: () => {},
    },
  },
  data() {
    return {
      lvalue: this.value,
      state: 0,
      errors: [],
    }
  },
  computed: {
    _cssInputBg() {
      const css = this.disabled ? 'bg-gray-200' : 'bg-white'
      return css
    },
    _cssInputText() {
      const css = this.disabled ? 'text-gray-500' : 'text-gray-800'
      return css
    },
    _info() {
      return `${this.value ? this.value.length : 0} / ${this.maxlength} Char`
    },
  },
  methods: {
    _input(event) {
      const value = event.target.checked
      const cvalue = value ? this.option.selected : this.option.unselected
      this.$emit(event.type, cvalue)
      this.$nextTick(this.validate)
    },
    _blur(event) {
      const value = event.target.checked
      const cvalue = value ? this.option.selected : this.option.unselected
      this.$emit(event.type, cvalue)
      this.$nextTick(this.validate)
    },
    metaData() {
      return {
        name: this._name,
        type: 'input',
        show: this.show,
      }
    },
    clearError() {
      this.state = 0
      this.errors = []
    },
    hasError() {
      return this.errors.length > 0
    },
    validate() {
      // this.clearError()
      // // General validation base on props
      // if (this.required && !this.value) {
      //   this.errors.push(`${this.label} is required`)
      // }
      // if (this.value && this.value.length > this.maxlength) {
      //   this.errors.push(`${this.label} is exceeded`)
      // }
      // // add business runtime validation
      // if (this.vruntime) {
      //   const error = this.vruntime(this.value)
      //   if (error) this.errors.push(error)
      // }
      // const validation = { valid: !this.hasError(), errors: this.errors }
      // this.state = validation.valid ? 1 : -1
      // return validation
    },
  },
}
</script>
