<template>
  <div v-if="show">
    <div
      class="text-xs rounded border-0 outline-none ring-2"
      :class="[_cssBorder]"
    >
      <div
        v-if="label"
        class="font-bold rounded-t text-sm text-gray-800 w-auto p-1"
        :class="[_cssLabelBg]"
      >
        {{ label.replaceAll ? label.replaceAll(' ', '&nbsp;') : '' }}
        <span
          v-if="label && required"
          class="font-bold text-center text-sm text-red-800 w-auto p-1"
          :class="[_cssLabelBg]"
        >
          *
        </span>
      </div>

      <textarea
        :id="id"
        type="text"
        :placeholder="placeholder"
        :value="value"
        :maxlength="maxlength"
        :disabled="disabled"
        :required="required"
        :cols="cols"
        :rows="rows"
        class="field text-sm text-gray-800 rounded-b p-1 px-1 text-sm w-full outline-none uppercase placeholder-blueGray-300 text-blueGray-600 relative bg-white"
        :class="[_cssLabel]"
        @input="_input"
        @blur="_blur"
      />
    </div>
    <p v-if="hasError()" class="text-red-500 text-right text-xs italic">
      {{ errors[0] }}
    </p>
    <p v-else class="text-right text-xs italic">
      {{ `${value ? value.length : 0} / ${maxlength}` }}
    </p>
  </div>
</template>
<script>
export default {
  name: 'TextArea',
  props: {
    id: { type: String, required: true, default: null },
    label: { type: String, required: false, default: '' },
    placeholder: { type: String, required: false, default: '' },
    maxlength: { type: Number, required: false, default: 10 },
    cols: { type: Number, required: false, default: 50 },
    rows: { type: Number, required: false, default: 4 },
    disabled: { type: Boolean, required: false, default: false },
    required: { type: Boolean, required: false, default: false },
    show: { type: Boolean, required: false, default: true },
    vruntime: { type: Function, required: false, default: null },
    value: { type: String, required: false, default: '' },
  },
  data() {
    return {
      state: 0,
      errors: [],
    }
  },
  computed: {
    _cssLabel() {
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
  },
  methods: {
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
