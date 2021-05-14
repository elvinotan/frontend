<template>
  <div>
    <label class="text-gray-600 text-sm font-bold" :for="id">
      {{ label }}
      <span class="text-red-500">{{ required ? ' *' : '' }}</span>
    </label>
    <input
      v-if="show"
      :id="id"
      :placeholder="placeholder"
      type="text"
      :value="value"
      :maxlength="maxlength"
      :disabled="disabled"
      :required="required"
      class="px-1 py-1 uppercase placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-xs border-0 shadow outline-none focus:outline-none focus:ring-1 ring-gray-500 w-full"
      @input="_event"
      @blur="_event"
    />
    <p class="text-red-500 text-right text-xs italic">
      {{ errors.length > 0 ? errors[0] : '' }}
    </p>
  </div>
</template>
<script>
export default {
  name: 'ShortText',
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
      lvalue: this.value,
      errors: [],
    }
  },
  methods: {
    _event(evt) {
      this.lvalue = evt.target.value.toUpperCase()
      if (evt.type === 'blur') {
        // Blur melakukan trimming yang artinya ubah data, maka infoin juga input
        this.lvalue = this.lvalue.trim()
        this.$emit('input', this.lvalue)
      }
      this.$emit(evt.type, this.lvalue)
      this.validate()
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
      if (this.required && !this.lvalue) {
        this.errors.push(`${this.label} is required`)
      }
      if (this.lvalue && this.lvalue.length > this.maxlength) {
        this.errors.push(`${this.label} is exceeded`)
      }

      // add business runtime validation
      if (this.vruntime) {
        const error = this.vruntime(this.lvalue)
        if (error) this.errors.push(error)
      }

      return { valid: !this.hasError(), errors: this.errors }
    },
  },
}
</script>
