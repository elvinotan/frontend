<template>
  <div>
    <div v-if="show">
      <span class="flex text-xs rounded border-0 outline-none ring-2" :class="[_cssBorder]">
        <span v-if="label" class="font-bold rounded-l text-sm text-gray-800 w-auto p-1" :class="[_cssLabelBg]">
          {{ label ? label.replace(/\s/g, '&nbsp;') : '' }}
        </span>
        <span v-if="label && required" class="font-bold text-center text-sm text-red-800 w-auto p-1" :class="[_cssLabelBg]"> * </span>
        <input :id="id" v-model="lvalue" autocomplete="off" type="text" :placeholder="placeholder" :maxlength="maxlength" :disabled="disabled" :required="required" class="text-left field text-sm rounded-r p-1 px-1 w-full outline-none uppercase placeholder-blueGray-300 relative" :class="[_cssRounded, _cssInputBg, _cssInputText]" @keypress="_keypress" @input="_input" @blur="_blur" />
        <span v-if="!disabled" class="font-bold rounded-r text-sm text-center text-gray-800 w-7 p-1 cursor-pointer" :class="[_cssLabelBg]" @click="_clearInput"> X </span>
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
  name: 'EDecimal',
  props: {
    id: { type: String, required: true, default: null },
    label: { type: String, required: false, default: '' },
    placeholder: { type: String, required: false, default: '' },
    maxlength: { type: Number, required: false, default: 18 },
    required: { type: Boolean, required: false, default: false },
    disabled: { type: Boolean, required: false, default: false },
    show: { type: Boolean, required: false, default: true },
    vruntime: { type: Function, required: false, default: null },
    value: { type: Number, required: false, default: null },
    minimumFractionDigits: { type: Number, required: false, default: 0 },
    maximumFractionDigits: { type: Number, required: false, default: 2 },
    allowMinus: { type: Boolean, required: false, default: false },
    separator: { type: Boolean, required: false, default: false },
    minimum: { type: Number, required: false, default: null },
    maximum: { type: Number, required: false, default: null },
  },
  data() {
    return {
      separatorSign: ',',
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
      const css = this.disabled ? 'text-gray-500' : 'text-gray-800'
      return css
    },
    _info() {
      const minimum = this.minimum ? `Min:${this._format(this.minimum)}` : ''
      const maximum = this.maximum ? `Max:${this._format(this.maximum)}` : ''
      const minmax = minimum || maximum ? `(${minimum}  ${maximum})     ` : ''

      const charInfo = `${this.lvalue ? this.lvalue.toString().length : 0} / ${this.maxlength} Char`
      return minmax + charInfo
    },
  },
  watch: {
    value(newVal, oldVal) {
      this.lvalue = this._format(newVal)
      this.validate()
    },
    separator(newVal, oldVal) {
      this.lvalue = this._format(this.value)
    },
    minimumFractionDigits(newVal, oldVal) {
      this.lvalue = this._format(this.value)
    },
    maximumFractionDigits(newVal, oldVal) {
      this.lvalue = this._format(this.value)
    },
  },
  methods: {
    _clearInput() {
      this.lvalue = null
      this.$emit('input', this.lvalue)
      this.$nextTick(this.validate)
    },
    _format(value) {
      if (value && this.separator) {
        return this.$fmt.decimal(value, this.minimumFractionDigits, this.maximumFractionDigits)
      } else {
        return value
      }
    },
    _keypress(event) {
      // Keypress ke trigger sebelum ada rendering, sehingga bagus gax ada flicker
      const expression = this.allowMinus ? '-.0123456789' : '.0123456789'
      const cursorIdx = event.target.selectionStart
      const char = event.key
      const lvalue = this.lvalue ? this.lvalue.toString() : ''

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
      } else if (lvalue && lvalue.includes('.')) {
        // validasi kalo setalah . jumlah panjang tidak boleh lebih banyak dari maximumFractionDigits
        const splits = lvalue.split('.')

        if (splits[1].length >= this.maximumFractionDigits && cursorIdx > splits[0].length) {
          event.preventDefault()
        }
      }
    },
    _input(event) {
      const endWithPeriode = event.target.value.endsWith('.')
      let lvalue = event.target.value.replace(new RegExp(this.separatorSign, 'g'), '').toUpperCase()

      lvalue = lvalue === '' ? null : +lvalue
      lvalue = isNaN(lvalue) ? null : lvalue
      lvalue = isFinite(lvalue) ? lvalue : null
      this.$emit(event.type, lvalue)
      this.$nextTick(this.validate)
      if (lvalue && this.separator) {
        this.lvalue = this._format(lvalue)
        if (endWithPeriode) this.lvalue += '.'
      }

      // code ini untuk me-reposisikan kembali lokasi cursor yang caretnya sudah berubah krn ada perubahan format data
      const cursorIdx = event.target.selectionStart
      const count = this.lvalue.length - event.target.value.length
      this.$nextTick(() => {
        event.target.focus()
        event.target.setSelectionRange(cursorIdx + count, cursorIdx + count)
      })
    },
    _blur(event) {
      let lvalue = event.target.value.replace(new RegExp(this.separatorSign, 'g'), '').toUpperCase()

      lvalue = lvalue === '' ? null : +lvalue
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
    addError(errors = []) {
      this.clearError()
      const errs = this.$object.isString(errors) ? [errors] : errors

      this.state = -1
      this.errors = this.errors.concat(errs)
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
      if (this.value && this.minimum && this.value < this.minimum) {
        this.errors.push(`${this.label} can not be less then ${this._format(this.minimum)}`)
      }
      if (this.value && this.maximum && this.value > this.maximum) {
        this.errors.push(`${this.label} can not be more then ${this._format(this.maximum)}`)
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
