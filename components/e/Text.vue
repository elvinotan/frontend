<template>
  <div>
    <div v-if="show">
      <span
        class="flex text-xs rounded border-0 outline-none ring-2"
        :class="[_cssBorder]"
      >
        <span
          v-if="label"
          class="font-bold rounded-l text-sm text-gray-800 w-auto p-1"
          :class="[_cssLabelBg]"
        >
          {{ label ? label.replace(/\s/g, '&nbsp;') : '' }}
        </span>
        <span
          v-if="label && required"
          class="font-bold text-center text-sm text-red-800 w-auto p-1"
          :class="[_cssLabelBg]"
        >
          *
        </span>
        <input
          :id="id"
          v-model="lvalue"
          autocomplete="off"
          type="text"
          :placeholder="placeholder"
          :maxlength="maxlength"
          :disabled="disabled"
          :required="required"
          class="field text-sm rounded-r p-1 px-1 w-full outline-none uppercase placeholder-blueGray-300 relative"
          :class="[_cssRounded, _cssInputBg, _cssInputText]"
          @input="_input"
          @blur="_blur"
        />
        <span
          v-if="!disabled"
          class="font-bold rounded-r text-sm text-center text-gray-800 w-7 p-1 cursor-pointer"
          :class="[_cssLabelBg]"
          @click="_clearInput"
        >
          X
        </span>
      </span>

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
  name: 'Text',
  props: {
    id: { type: String, required: true, default: null },
    label: { type: String, required: false, default: '' },
    placeholder: { type: String, required: false, default: '' },
    type: { type: String, required: false, default: 'short' }, // short, medium, long, extralong
    required: { type: Boolean, required: false, default: false },
    disabled: { type: Boolean, required: false, default: false },
    show: { type: Boolean, required: false, default: true },
    value: { type: String, required: false, default: '' },
    vruntime: { type: Function, required: false, default: null },
  },
  data() {
    return {
      lvalue: this.value,
      state: 0,
      errors: [],
      maxlength: 0,
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
  watch: {
    type(newVal, oldVal) {
      this._maxlength()
    },
  },
  created() {
    this._maxlength()
  },
  methods: {
    _clearInput() {
      this.lvalue = null
      this.$emit('input', this.lvalue)
    },
    _maxlength() {
      this.maxlength =
        this.type === 'short'
          ? 16
          : this.type === 'medium'
          ? 32
          : this.type === 'long'
          ? 64
          : 128
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
      const validation = { valid: !this.hasError(), errors: this.errors }
      this.state = validation.valid ? 1 : -1
      return validation
    },
  },
}
</script>
