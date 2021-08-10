<template>
  <div>
    <div v-if="show">
      {{ $data.file }}
      <input :ref="id + 'File'" type="file" style="display: none" @change="_change" />
      <span class="flex text-xs rounded border-0 outline-none ring-2" :class="[_cssBorder]">
        <span v-if="label" class="font-bold rounded-l text-sm text-gray-800 w-auto p-1" :class="[_cssLabelBg]">
          {{ label ? label.replace(/\s/g, '&nbsp;') : '' }}
        </span>
        <span v-if="label && required" class="font-bold text-center text-sm text-red-800 w-auto p-1" :class="[_cssLabelBg]"> * </span>
        <span class="text-left w-full text-sm w-auto p-1 border-l-2" :class="[_cssBorderBox, _cssLabelBg, _cssInputText]"> Keternan file name </span>
        <span class="font-bold text-center text-sm w-100 p-1 border-l-2 border-r-2" :class="[_cssBorderBox, _cssLabelBg, _cssCursor, _cssInputText]" @click="_browse"> Browse </span>
        <span v-if="!disabled" class="font-bold rounded-r text-sm text-center text-gray-800 w-7 p-1 cursor-pointer" :class="[_cssLabelBg]" @click="_clearInput"> X </span>
      </span>
      <p v-if="hasError()" class="text-red-500 text-right text-xs italic">
        {{ errors[0] }}
      </p>
      <p v-else class="text-right text-xs italic">
        {{ _info }}
      </p>
      <table>
        <thead>
          <tr>
            <td>Name</td>
            <td>Size</td>
            <td>Type</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="file of files" :key="file.name">
            <td>{{ file.name }}</td>
            <td>{{ file.size }}</td>
            <td>{{ file.type }}</td>
            <td>Delete | Download | Preview</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  name: 'EUpload',
  props: {
    id: { type: String, required: true, default: null },
    label: { type: String, required: false, default: '' },
    placeholder: { type: String, required: false, default: '' },
    maxSize: { type: Number, required: false, default: 5 },
    required: { type: Boolean, required: false, default: false },
    disabled: { type: Boolean, required: false, default: true },
    show: { type: Boolean, required: false, default: true },
    value: { type: String, required: false, default: '' },
    vruntime: { type: Function, required: false, default: null },
  },
  data() {
    return {
      lvalue: this.value,
      state: 0,
      errors: [],
      files: [],
    }
  },
  computed: {
    _cssBorderBox() {
      let css = 'border-gray-500'
      if (this.state === 1) css = 'border-green-500'
      if (this.state === -1) css = 'border-red-500'
      return css
    },
    _cssCursor() {
      const css = this.disabled ? 'cursor-not-allowed' : 'cursor-pointer'
      return css
    },
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
      return `${this.value ? this.value.length : 0} / ${this.maxSize} MB`
    },
  },
  watch: {
    value(newVal, oldVal) {
      this.lvalue = newVal
      this.validate()
    },
  },
  methods: {
    _browse() {
      this.$refs[this.id + 'File'].click()
    },
    _change(event) {
      const selectedFile = event.target.files[0]
      this._createBase64Image(selectedFile)
    },
    _createBase64Image(fileObject) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const file = {
          name: fileObject.name,
          size: fileObject.size,
          type: fileObject.type,
          lastModifiedDate: fileObject.lastModifiedDate,
          content: e.target.result,
          reference: new Date().getTime(),
        }
        const { content, lastModifiedDate, ...other } = file
        this.files.push(other)

        this.$rest.post('/upload/file', file).then(({ result, error }) => {
          console.log('result ', result)
          console.log('error ', error)
        })
      }
      reader.readAsDataURL(fileObject)
    },

    _clearInput() {
      this.lvalue = null
      this.$emit('input', this.lvalue)
      this.$nextTick(this.validate)
    },
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
        this.errors.push(`${this.label} is required`)
      }

      // TODO validate untuk maxSize
      // if (this.value && this.value.length > this.maxlength) {
      //   this.errors.push(`${this.label} is exceeded`)
      // }

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
