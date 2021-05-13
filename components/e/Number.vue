<template>
  <div>
    <label class="text-gray-600 text-sm font-bold" :for="id">
      {{ label }}
      <span class="text-red-500">{{ required ? ' *' : '' }}</span>
    </label>
    <input
      v-if="show"
      :id="id"
      :value="localValue"
      :placeholder="placeholder"
      type="text"
      :maxlength="maxlength"
      :disabled="disabled"
      :required="required"
      class="px-1 py-1 uppercase text-right placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-xs border-0 shadow outline-none focus:outline-none focus:ring-1 ring-gray-500 w-full"
      @keypress="_event"
      @input="_event"
      @blur="_event"
      @focus="_event"
    />

    <p class="text-red-500 text-right text-xs italic">
      {{ errors.length > 0 ? errors[0] : '' }}
    </p>
  </div>
</template>
<script>
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
  },
  data() {
    return {
      localValue: this.value ? this.value.toString() : '',
      errors: [],
    }
  },
  methods: {
    _event(evt) {
      if (evt.type === 'keypress' && !'0123456789'.includes(evt.key)) {
        // keypress hanya di gunakan untuk prevent entry saja, gax ada interaksinya dgn nilai input
        evt.preventDefault()
      } else if (evt.type === 'focus') {
        // this.$nextTick(() => {
        // Masih blm berfungsi
        const ctrl = document.getElementById(this.id)
        ctrl.focus()
        ctrl.setSelectionRange(this.localValue.length, this.localValue.length)
        // })
      } else {
        this.localValue = evt.target.value
        this.$emit(evt.type, this.localValue ? +this.localValue : null)
        this.validate()
      }
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
      if (this.required && !this.localValue) {
        this.errors.push(`${this.label} is required`)
      }
      if (this.localValue && this.localValue.length > this.maxlength) {
        this.errors.push(`${this.label} is exceeded`)
      }

      // add business runtime validation
      if (this.vruntime) {
        const error = this.vruntime(this.localValue)
        if (error) this.errors.push(error)
      }

      return { valid: !this.hasError(), errors: this.errors }
    },
  },
}
</script>
