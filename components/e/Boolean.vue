<template>
  <div>
    <div v-if="show">
      <span class="flex text-xs rounded border-0 outline-none ring-2" :class="[_cssBorder]">
        <span v-if="label" class="font-bold rounded-l text-sm text-gray-800 w-auto p-1" :class="[_cssLabelBg]">
          {{ label ? label.replace(/\s/g, '&nbsp;') : '' }}
        </span>
        <span v-if="label && required" class="font-bold text-center text-sm text-red-800 w-auto p-1" :class="[_cssLabelBg]"> * </span>
        <select :id="id" v-model="lvalue" :disabled="disabled" :required="required" class="field text-sm rounded-r p-1 px-1 w-full outline-none uppercase placeholder-blueGray-300 relative" :class="[_cssRounded, _cssInputBg, _cssInputText]" @input="_input" @blur="_blur">
          <option v-for="option of _options" :key="option.value" class="text-sm text-gray-800 p-1 px-1" :value="option.value">
            {{ option.description }}
          </option>
        </select>
        <span v-if="!disabled" class="font-bold rounded-r text-sm text-center text-gray-800 w-7 p-1 cursor-pointer" :class="[_cssLabelBg]" @click="_clearInput"> X </span>
      </span>
      <p v-if="hasError()" class="text-red-500 text-right text-xs italic">
        {{ errors[0] }}
      </p>
      <p v-else class="">&nbsp;</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'EBoolean',
  props: {
    id: { type: String, required: true, default: null },
    label: { type: String, required: false, default: '' },
    placeholder: { type: String, required: false, default: '' },
    required: { type: Boolean, required: false, default: false },
    disabled: { type: Boolean, required: false, default: false },
    show: { type: Boolean, required: false, default: true },
    vruntime: { type: Function, required: false, default: null },
    value: { type: Boolean, required: false, default: false },
    type: { type: String, required: false, default: 'TrueFalse' }, // TrueFalse, YesNo, ActiveInActive
  },
  data() {
    return {
      state: 0,
      errors: [],
      lvalue: this.value === null ? '0' : this.value === true ? '1' : '-1',
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
    _options() {
      const options = [
        {
          value: '0',
          description: this.placeholder,
        },
        {
          value: '1',
          description: '',
        },
        {
          value: '-1',
          description: '',
        },
      ]
      if (this.type === 'TrueFalse') {
        options[1].description = 'True'
        options[2].description = 'False'
      } else if (this.type === 'YesNo') {
        options[1].description = 'Yes'
        options[2].description = 'No'
      } else if (this.type === 'ActiveInActive') {
        options[1].description = 'Active'
        options[2].description = 'InActive'
      }

      return options
    },
  },
  watch: {
    value(newVal, oldVal) {
      this.lvalue = newVal === null ? '0' : newVal === true ? '1' : '-1'
      this.validate()
    },
  },
  methods: {
    _clearInput() {
      this.lvalue = 0
      this.$emit('input', null)
      this.$nextTick(this.validate)
    },
    _input(event) {
      let lvalue = event.target.value
      if (lvalue) {
        if (lvalue === '0') lvalue = null
        if (lvalue === '1') lvalue = true
        if (lvalue === '-1') lvalue = false
      }
      this.$emit(event.type, lvalue)
      this.$nextTick(this.validate)
    },
    _blur(event) {
      let lvalue = event.target.value
      if (lvalue) {
        if (lvalue === '0') lvalue = null
        if (lvalue === '1') lvalue = true
        if (lvalue === '-1') lvalue = false
      }
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
    addError(errors = []) {
      this.clearError()
      const errs = this.$object.isString(errors) ? [errors] : errors

      this.state = -1
      this.errors = this.errors.concat(errs)
    },
    validate() {
      this.clearError()

      // General validation base on props
      if (this.required && this.value === null) {
        this.errors.push(`${this.label} is required`)
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
