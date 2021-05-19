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
        type: 'input',
        show: true,
      }
    },
    children(pRef) {
      pRef = pRef || this
      let refs = []
      for (const ref of pRef.$children) {
        if (ref.metaData) {
          const { type, show } = ref.metaData()
          if (type === 'action' && show) {
            console.log('looping')
            refs.push(ref) // Button
          }
          if (type === 'input' && show) {
            console.log('looping')
            refs.push(ref) // ShortText, MediumText ...
          }
          if (type === 'container' && show) {
            console.log('looping')
            refs = refs.concat(this.children(ref)) // Card
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
      // return this
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
    disabled(disabled) {
      // Masih masalah saat ambil children
      console.log('disabled', this.children(this).length)
      for (const ref of this.children(this)) {
        if (ref.disabled) {
          ref.disabled(disabled)
        }
      }
      // return this
    },
    to(id) {
      console.log('to', this.children(this).length)
      for (const ref of this.children(this)) {
        ref.disabled(id)
      }
    },
  },
}
</script>
