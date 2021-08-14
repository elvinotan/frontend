<template>
  <div>
    <div v-if="show">
      <div class="text-xs rounded border-0 outline-none ring-2" :class="[_cssBorder, _cssInputBg]">
        <div v-if="label" class="font-bold rounded-t text-sm text-gray-800 w-auto p-1 flex justify-start" :class="[_cssLabelBg]">
          {{ label ? label.replace(/\s/g, '&nbsp;') : '' }}
          <span v-if="label && required" class="font-bold text-center text-sm text-red-800 w-full flex justify-start" :class="[_cssLabelBg]"> * </span>
          <ERight>
            <span v-if="!disabled" class="font-bold text-right text-sm text-center text-gray-800 w-7 px-1 cursor-pointer" :class="[_cssLabelBg]" @click="_clearInput"> X </span>
          </ERight>
        </div>

        <textarea :id="id" autocomplete="off" type="text" :placeholder="placeholder" :value="value" :maxlength="maxlength" :disabled="disabled" :required="required" :cols="cols" :rows="rows" class="field text-sm rounded-r p-1 px-1 w-full outline-none uppercase placeholder-blueGray-300 relative" :class="[_cssRounded, _cssInputBg, _cssInputText]" @input="_input" @blur="_blur" />
      </div>
      <p v-if="hasError()" class="text-red-500 text-right text-xs italic">
        {{ errors[0] }}
      </p>
      <p v-else class="text-right text-xs italic">
        {{ _info }}
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ETextArea',
  props: {
    id: { type: String, required: true, default: null },
    label: { type: String, required: false, default: '' },
    placeholder: { type: String, required: false, default: '' },
    maxlength: { type: Number, required: false, default: 100 },
    cols: { type: Number, required: false, default: 50 },
    rows: { type: Number, required: false, default: 4 },
    required: { type: Boolean, required: false, default: false },
    disabled: { type: Boolean, required: false, default: false },
    show: { type: Boolean, required: false, default: true },
    value: { type: String, required: false, default: '' },
    vruntime: { type: Function, required: false, default: null },
  },
  data() {
    return {
      state: 0,
      errors: [],
    }
  },
  computed: {
    _cssRounded() {
      return this.label ? '' : 'rounded'
    },
    _cssBorder() {
      let css = 'ring-gray-500'
      if (this.state === 1) css = 'ring-green-500'
      if (this.state === -1) css = 'ring-red-500'
      return css
    },
    _cssLabelBg() {
      let css = 'bg-gray-300'
      if (this.state === 1) css = 'bg-green-300'
      if (this.state === -1) css = 'bg-red-300'
      return css
    },
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
    _clearInput() {
      this.$emit('input', null)
      this.$nextTick(this.validate)
    },
    _input(event) {
      const value = event.target.value.toUpperCase()
      this.$emit(event.type, value)
      this.$nextTick(this.validate)
    },
    _blur(event) {
      const value = event.target.value.toUpperCase().trim()
      this.$emit('input', value)
      this.$emit(event.type, value)
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
    addError(errors = []) {
      this.clearError()
      const errs = this.$object.isString(errors) ? [errors] : errors

      this.state = -1
      this.errors = this.errors.concat(errs)
    },
    validate() {
      this.clearError()

      // General validation base on props
      if (this.required && !this.value) {
        this.errors.push(`${this.label} is required`)
      }
      if (this.value && this.value.length > this.maxlength) {
        this.errors.push(`${this.label} is exceeded`)
      }

      // add business runtime validation
      if (this.vruntime) {
        const error = this.vruntime(this.value)
        if (error) this.errors.push(error)
      }
      const validation = { valid: !this.hasError(), error: this.errors }
      this.state = validation.valid ? 1 : -1
      return validation
    },
  },
}
</script>
