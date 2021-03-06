<template>
  <div>
    <div v-if="show">
      <span class="flex text-xs rounded border-0 outline-none ring-2" :class="[_cssBorder]">
        <span v-if="label" class="font-bold rounded-l text-sm text-gray-800 w-auto p-1" :class="[_cssLabelBg]">
          {{ label ? label.replace(/\s/g, '&nbsp;') : '' }}
        </span>
        <span v-if="label && required" class="font-bold text-center text-sm text-red-800 w-auto p-1" :class="[_cssLabelBg]"> * </span>
        <input :id="id" v-model="lvalue" autocomplete="off" type="date" :maxlength="maxlength" :disabled="disabled" :required="required" class="field text-sm rounded-r p-1 px-1 w-full outline-none uppercase placeholder-blueGray-300 relative" :class="[_cssRounded, _cssInputBg, _cssInputText]" @input="_input" @blur="_blur" />
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
  name: 'EDate',
  props: {
    id: { type: String, required: true, default: null },
    label: { type: String, required: false, default: '' },
    required: { type: Boolean, required: false, default: false },
    disabled: { type: Boolean, required: false, default: false },
    show: { type: Boolean, required: false, default: true },
    vruntime: { type: Function, required: false, default: null },
    value: { type: [Date, String], required: false, default: null },
    minimum: { type: Date, required: false, default: null },
    maximum: { type: Date, required: false, default: null },
  },
  data() {
    return {
      locale: 'id-ID',
      maxlength: 10,
      state: 0,
      errors: [],
      lvalue: this._format(this._parseInput(this.value), 'YYYY-MM-DD'), // Masukan dari component adalah YYYY-MM-DD, meski dari component menampilkan DD/MM/YYYY
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
      const min = this._format(this.minimum, 'DD/MM/YYYY')
      const max = this._format(this.maximum, 'DD/MM/YYYY')
      const minimum = this.minimum ? `Min:${min}` : ''
      const maximum = this.maximum ? `Max:${max}` : ''
      const minmax = minimum || maximum ? `(${minimum}  ${maximum})     ` : ''

      const charInfo = `${this.lvalue ? this.lvalue.length : 0} / ${this.maxlength} Char`
      return minmax + charInfo
    },
  },
  watch: {
    value(newVal, oldVal) {
      // newVal dan oldVal kadang bisa berupa beda tipe antara data dan string, jadi harus ada pengecekan perbedaan tambahan

      let newValstr = newVal
      if (newValstr instanceof Date) {
        newValstr = this._format(newValstr, 'YYYY-MM-DD')
      }

      let oldValstr = oldVal
      if (oldValstr instanceof Date) {
        oldValstr = this._format(oldValstr, 'YYYY-MM-DD')
      }

      if (newValstr !== oldValstr) {
        this.lvalue = this._format(this._parseInput(newVal), 'YYYY-MM-DD')
        this.validate()
      }
    },
  },
  methods: {
    _parseInput(value) {
      if (!value) return value

      if (value instanceof Date) {
        return value
      } else {
        const dateValue = new Date(value)
        this.$emit('input', dateValue)
        return dateValue
      }
    },
    _clearInput() {
      this.lvalue = null
      this.$emit('input', this.lvalue)
      this.$nextTick(this.validate)
    },
    _format(value, pattern) {
      if (!value) return value
      if (value && pattern) {
        return this.$fmt.date(value, pattern)
      } else {
        return value
      }
    },
    _input(event) {
      let value = event.target.value
      value = value ? new Date(value) : null

      this.$emit(event.type, value)
      this.$nextTick(this.validate)
    },
    _blur(event) {
      let value = event.target.value
      value = value ? new Date(value) : null

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
        // value null ada 2 alasan 1 krn kosong, dan 1 krn tgl yg di entry invalid
        // if (this.lvalue ===) this.errors.push(`${this.label} is invalid`)
        // else this.errors.push(`${this.label} is required`)
        // ini masih blm bisa yang di atas blm ada logicnya, untuk sementara di gabung antara invalid dan required
        this.errors.push(`${this.label} is required / invalid`)
      }
      if (this.value && this.value.length > this.maxlength) {
        this.errors.push(`${this.label} is exceeded`)
      }
      if (this.value && this.minimum && this.value.getTime() < this.minimum.getTime()) {
        const min = this._format(this.minimum, 'DD/MM/YYYY')
        this.errors.push(`${this.label} can not be less then ${min}`)
      }
      if (this.value && this.maximum && this.value.getTime() > this.maximum.getTime()) {
        const max = this._format(this.maximum, 'DD/MM/YYYY')
        this.errors.push(`${this.label} can not be more then ${max}`)
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
