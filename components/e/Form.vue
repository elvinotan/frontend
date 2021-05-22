<template>
  <div>
    <slot />
  </div>
</template>
<script>
export default {
  name: 'Form',
  methods: {
    metaData() {
      return {
        name: this._name,
        type: 'container',
        show: true,
      }
    },
    children(pRef) {
      pRef = pRef || this
      let refs = []
      for (const ref of pRef.$children) {
        if (ref.metaData) {
          const { type } = ref.metaData()
          if (type === 'action') {
            refs.push(ref) // Button
          }
          if (type === 'input') {
            refs.push(ref) // Password, ShortText, MediumText, LongText, TextArea, Number, Decimal, Date, Time, Checkbox, Boolean, Select
          }
          if (type === 'container') {
            refs = refs.concat(this.children(ref)) // Card, Form
          }
        } else {
          throw new Error(
            'Warning!!! this component dose not have metaData !!!'
          )
        }
      }
      return refs
    },
    clearError() {
      for (const ref of this.children(this)) {
        if (ref.clearError) ref.clearError()
      }
      return this
    },
    validate() {
      let allValid = true
      const allErrors = []
      for (const ref of this.children(this)) {
        if (ref.validate) {
          const { valid, errors } = ref.validate()
          allValid = allValid && valid
          if (errors) allErrors.push(...errors)
        }
      }
      return { valid: allValid, errors: allErrors }
    },
  },
}
</script>
