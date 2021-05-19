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
            refs.push(ref) // Button
          }
          if (type === 'input' && show) {
            refs.push(ref) // ShortText, MediumText ...
          }
          if (type === 'container' && show) {
            refs = refs.concat(this.children(ref)) // Card
          }
        } else {
          throw new Error(
            'Warning!!! this component dose not have metaData !!!',
            ref
          )
        }
      }
      return refs
    },
    clearError() {
      for (const ref of this.children(this)) {
        if (ref.clearError) ref.clearError()
      }
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
      for (const ref of this.children(this)) {
        if (ref.disabled) {
          ref.disabled(disabled)
        }
      }
    },
  },
}
</script>
