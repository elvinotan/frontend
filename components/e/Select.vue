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
        <select
          :id="id"
          v-model="lvalue"
          :disabled="ldisabled"
          :required="required"
          class="field text-sm rounded-r p-1 px-1 w-full outline-none uppercase placeholder-blueGray-300 relative"
          :class="[_cssRounded, _cssInputBg, _cssInputText]"
          @input="_input"
          @blur="_blur"
        >
          <option
            v-for="option of _options"
            :key="option.value"
            class="text-sm text-gray-800 p-1 px-1"
            :value="option.value"
          >
            {{ option.description }}
          </option>
        </select>
      </span>
      <p v-if="hasError()" class="text-red-500 text-right text-xs italic">
        {{ errors[0] }}
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Select',
  props: {
    id: { type: String, required: true, default: null },
    label: { type: String, required: false, default: '' },
    placeholder: { type: String, required: false, default: '' },
    required: { type: Boolean, required: false, default: false },
    show: { type: Boolean, required: false, default: true },
    as: { type: String, required: false, default: 'string' }, // opsi yang tersedia [string, number]
    vruntime: { type: Function, required: false, default: null },
    value: { type: [String, Number], required: false, default: null },
    options: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  data() {
    return {
      state: 0,
      errors: [],
      lvalue: this.value,
      ldisabled: false,
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
      const css = this.ldisabled ? 'bg-gray-200' : 'bg-white'
      return css
    },
    _cssInputText() {
      const css = this.ldisabled ? 'text-gray-500' : 'text-gray-800'
      return css
    },
    _options() {
      const options = [{ value: '', description: '' }, ...this.options]
      return options
    },
  },
  watch: {
    value(newVal, oldVal) {
      this.lvalue = newVal
    },
  },
  methods: {
    _input(event) {
      let lvalue = event.target.value
      lvalue = lvalue || null
      if (lvalue && this.as === 'string') lvalue = lvalue.toString()
      if (lvalue && this.as === 'number') lvalue = +lvalue
      this.$emit(event.type, lvalue)
      this.$nextTick(this.validate)
    },
    _blur(event) {
      let lvalue = event.target.value
      lvalue = lvalue || null
      if (lvalue && this.as === 'string') lvalue = lvalue.toString()
      if (lvalue && this.as === 'number') lvalue = +lvalue
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
    disabled(ldisabled) {
      this.ldisabled = ldisabled
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
