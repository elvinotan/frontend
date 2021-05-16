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
          class="text-right field text-sm text-gray-800 rounded-r p-1 px-1 text-sm w-full outline-none uppercase placeholder-blueGray-300 relative"
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
        {{ _info }}
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Decimal',
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
    maximumFractionDigits: { type: Number, required: false, default: 2 },
    allowMinus: { type: Boolean, required: false, default: false },
    separator: { type: Boolean, required: false, default: false },
    minimum: { type: Number, required: false, default: null },
    maximum: { type: Number, required: false, default: null },
  },
  data() {
    return {
      separatorSign: ',',
      locale: 'en-US',
      lvalue: this._format(this.value),
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
    _info() {
      const minimum = this.minimum ? `Min:${this._format(this.minimum)}` : ''
      const maximum = this.maximum ? `Max:${this._format(this.maximum)}` : ''
      const minmax = minimum || maximum ? `(${minimum}  ${maximum})     ` : ''

      const charInfo = `${this.lvalue ? this.lvalue.length : 0} / ${
        this.maxlength
      } Char`
      return minmax + charInfo
    },
  },
  methods: {
    _format(value) {
      if (value && this.separator) {
        return new Intl.NumberFormat(this.locale, {
          minimumFractionDigits: 0,
          maximumFractionDigits: this.maximumFractionDigits,
        }).format(value)
      } else {
        return value
      }
    },
    _keypress(event) {
      // Keypress ke trigger sebelum ada rendering, sehingga bagus gax ada flicker
      const expression = this.allowMinus ? '-.0123456789' : '.0123456789'
      const cursorIdx = event.target.selectionStart
      const char = event.key
      const lvalue = this.lvalue

      if (!expression.includes(event.key)) {
        // Bila character tidak termasuk dalam expression maka di batalkan
        event.preventDefault()
      } else if (char === '-' && cursorIdx !== 0) {
        // Bila character minus tapi dia mau input tidak di awal, maka di batalkan
        event.preventDefault()
      } else if (char === '.' && cursorIdx === 0) {
        // bila mencoba untuk entry . di bagian depan, maka di batalkan
        event.preventDefault()
      } else if (char === '.' && lvalue.includes('.')) {
        // bila mencoba untuk entry . tapi 2 kali atau lebih, maka di batalkan
        event.preventDefault()
      } else if (char === '.' && lvalue === '-') {
        // bila mencoba untuk entry . tapi di depan hanya ada minus jadi '-.', maka di batalkan
        event.preventDefault()
      } else if (lvalue && lvalue.includes && lvalue.includes('.')) {
        // validasi kalo setalah . jumlah panjang tidak boleh lebih banyak dari maximumFractionDigits
        const splits = lvalue.split('.')

        if (
          splits[1].length >= this.maximumFractionDigits &&
          cursorIdx > splits[0].length
        ) {
          event.preventDefault()
        }
      }
    },
    _input(event) {
      const endWithPeriode = event.target.value.endsWith('.')
      let lvalue = event.target.value
        .replaceAll(this.separatorSign, '')
        .toUpperCase()

      lvalue = lvalue === '' ? null : +lvalue
      this.$emit(event.type, lvalue)
      this.$nextTick(this.validate)
      if (lvalue && this.separator) {
        this.lvalue = this._format(lvalue)
        if (endWithPeriode) this.lvalue += '.'
      }
    },
    _blur(event) {
      let lvalue = event.target.value
        .trim()
        .replaceAll(this.separatorSign, '')
        .toUpperCase()

      lvalue = lvalue === '' ? null : +lvalue
      this.$emit('input', lvalue)
      this.$emit(event.type, lvalue)
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
      if (this.minimum && this.value < this.minimum) {
        this.errors.push(`${this.label} can not be less then ${this.minimum}`)
      }
      if (this.maximum && this.value > this.maximum) {
        this.errors.push(`${this.label} can not be more then ${this.maximum}`)
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
