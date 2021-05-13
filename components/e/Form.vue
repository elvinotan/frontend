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
    children() {
      const refs = []
      for (const ref of this.$children) {
        if (ref.metaData) {
          const { type, show } = ref.metaData()
          if (type === 'input' && show) {
            refs.push(ref)
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
      for (const ref of this.children()) {
        ref.clearError()
      }
    },
    validate() {
      let allValid = true
      const allErrors = []
      for (const ref of this.children()) {
        const { valid, errors } = ref.validate()
        allValid = allValid && valid
        if (errors) allErrors.push(...errors)
      }
      return { valid: allValid, errors: allErrors }
    },
  },
}
</script>
