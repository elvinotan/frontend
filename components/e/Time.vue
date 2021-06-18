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
          type="time"
          :maxlength="maxlength"
          :disabled="disabled"
          :required="required"
          class="field text-sm rounded-r p-1 px-1 w-full outline-none uppercase placeholder-blueGray-300 relative"
          :class="[_cssRounded, _cssInputBg, _cssInputText]"
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
  name: 'Time',
  props: {
    id: { type: String, required: true, default: null },
    label: { type: String, required: false, default: '' },
    required: { type: Boolean, required: false, default: false },
    disabled: { type: Boolean, required: false, default: false },
    show: { type: Boolean, required: false, default: true },
    vruntime: { type: Function, required: false, default: null },
    value: { type: String, required: false, default: null },
    minimum: { type: String, required: false, default: null },
    maximum: { type: String, required: false, default: null },
  },
  data() {
    return {
      maxlength: 5,
      state: 0,
      errors: [],
      lvalue: this.value,
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
      const minimum = this.minimum ? `Min:${this.minimum}` : ''
      const maximum = this.maximum ? `Max:${this.maximum}` : ''
      const minmax = minimum || maximum ? `(${minimum}  ${maximum})     ` : ''

      const charInfo = `${this.lvalue ? this.lvalue.length : 0} / ${
        this.maxlength
      } Char`
      return minmax + charInfo
    },
  },
  watch: {
    value(newVal, oldVal) {
      this.lvalue = newVal
    },
  },
  methods: {
    _input(event) {
      let value = event.target.value
      value = value || null

      this.$emit(event.type, value)
      this.$nextTick(this.validate)
    },
    _blur(event) {
      let value = event.target.value
      value = value || null

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
        // value null ada 2 alasan 1 krn kosong, dan 1 krn tgl yg di entry invalid
        // if (this.lvalue ===) this.errors.push(`${this.label} is invalid`)
        // else this.errors.push(`${this.label} is required`)
        // ini masih blm bisa yang di atas blm ada logicnya, untuk sementara di gabung antara invalid dan required
        this.errors.push(`${this.label} is required / invalid`)
      }
      if (this.value && this.value.length > this.maxlength) {
        this.errors.push(`${this.label} is exceeded`)
      }
      if (this.value && this.minimum && this.value < this.minimum) {
        this.errors.push(`${this.label} can not be less then ${this.minimum}`)
      }
      if (this.value && this.maximum && this.value > this.maximum) {
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
