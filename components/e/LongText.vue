<template>
  <div>
    <div v-if="show">
      <span
        class="flex text-xs rounded border-0 outline-none ring-1 ring-gray-500"
      >
        <span
          class="bg-gray-300 font-bold text-left rounded-l text-sm text-gray-800 w-auto p-1"
        >
          {{ label ? label.replaceAll(' ', '&nbsp;') : ''
          }}{{ required ? '&nbsp;*' : '' }}
        </span>
        <input
          :id="id"
          type="text"
          :placeholder="placeholder"
          :value="value"
          :maxlength="maxlength"
          :disabled="disabled"
          :required="required"
          class="field text-sm text-gray-600 rounded-r p-1 px-1 text-sm w-full outline-none uppercase placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white"
          @input="_input"
          @blur="_blur"
        />
      </span>
      <p v-if="hasError()" class="text-red-500 text-right text-xs italic">
        {{ errors[0] }}
      </p>
      <p v-else class="text-right text-xs italic">
        {{ `${value ? value.length : 0} / ${maxlength}` }}
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LongText',
  props: {
    id: { type: String, required: true, default: null },
    label: { type: String, required: false, default: '' },
    placeholder: { type: String, required: false, default: '' },
    maxlength: { type: Number, required: false, default: 10 },
    disabled: { type: Boolean, required: false, default: false },
    required: { type: Boolean, required: false, default: false },
    show: { type: Boolean, required: false, default: true },
    vruntime: { type: Function, required: false, default: null },
    value: { type: String, required: false, default: '' },
  },
  data() {
    return {
      errors: [],
    }
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

      return { valid: !this.hasError(), errors: this.errors }
    },
  },
}
</script>
