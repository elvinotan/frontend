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
          {{ label.replaceAll ? label.replaceAll(' ', '&nbsp;') : '' }}
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
          type="text"
          :placeholder="placeholder"
          :maxlength="maxlength"
          :disabled="disabled"
          :required="required"
          class="field text-sm text-gray-800 rounded-r p-1 px-1 text-sm w-full outline-none uppercase placeholder-blueGray-300 relative"
          :class="[_cssRounded, _cssInputBg, _cssInputText]"
          @keypress="_keypress"
          @input="_input"
          @blur="_blur"
        />
      </span>
      <p v-if="hasError()" class="text-red-500 text-right text-xs italic">
        {{ errors[0] }}
      </p>
      <p v-else class="text-right text-xs italic">
        {{ minimum || maximum ? '(' : '' }}
        {{ minimum ? `min:${minimum}, ` : '' }}
        {{ maximum ? `max:${maximum} ` : '' }}
        {{ minimum || maximum ? ')' : '' }}
        {{
          `${
            value && value.toString ? value.toString().length : 0
          } / ${maxlength}`
        }}
      </p>
    </div>
  </div>
</template>
<script>
/*
  Number ini hanya menerima angka 0123456789
  dan angka pertama tidak boleh 0 krn nanti akan di convert menjadi real number
 */
export default {
  name: 'Number',
  props: {
    id: { type: String, required: true, default: null },
    label: { type: String, required: false, default: '' },
    placeholder: { type: String, required: false, default: '' },
    maxlength: { type: Number, required: false, default: 10 },
    disabled: { type: Boolean, required: false, default: false },
    required: { type: Boolean, required: false, default: false },
    show: { type: Boolean, required: false, default: true },
    vruntime: { type: Function, required: false, default: null },
    value: { type: Number, required: false, default: null },
    allowMinus: { type: Boolean, required: false, default: false },
    minimum: { type: Number, required: false, default: null },
    maximum: { type: Number, required: false, default: null },
  },
  data() {
    return {
      lvalue: this.value,
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
      const css = this.disabled ? 'text-gray-50' : 'text-gray-700'
      return css
    },
  },
  methods: {
    _keypress(event) {
      // Keypress ke trigger sebelum ada rendering, sehingga bagus gax ada flicker
      const expression = this.allowMinus ? '-0123456789' : '0123456789'
      const cursorIdx = event.target.selectionStart
      const char = event.key

      if (!expression.includes(char)) {
        // Bila character tidak termasuk dalam expression maka di batalkan
        event.preventDefault()
      } else if (char === '-' && cursorIdx !== 0) {
        // Bila character minus tapi dia mau input tidak di awal, maka di batalkan
        event.preventDefault()
      }
    },
    _input(event) {
      let value = event.target.value.toUpperCase()
      value = value === '' ? null : +value
      this.$emit(event.type, value)
      this.$nextTick(this.validate)
    },
    _blur(event) {
      let value = event.target.value.toUpperCase().trim()
      value = value === '' ? null : +value
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
      if (this.required && !this.value && this.value !== 0) {
        this.errors.push(`${this.label} is required`)
      }
      if (this.value && this.value.length > this.maxlength) {
        this.errors.push(`${this.label} is exceeded`)
      }
      if (this.minimum) {
        if (this.value < this.minimum) {
          this.errors.push(`${this.label} can not be less then ${this.minimum}`)
        }
      }

      if (this.maximum) {
        if (this.value > this.maximum) {
          this.errors.push(`${this.label} can not be more then ${this.maximum}`)
        }
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
