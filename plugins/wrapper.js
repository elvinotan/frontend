export default function (plugin, inject) {
  const wrapper = {
    disabled: (data, condition) => {
      if (data) {
        for (const p in data) {
          data[p].disabled = condition
        }
      } else {
        throw new Error('Undefined ui data parameter')
      }
    },
    refs(pref) {
      let refs = [pref]
      for (const ref of pref.$children) {
        if (ref.metaData) {
          const { type } = ref.metaData()
          if (type === 'container') {
            refs = refs.concat(plugin.$wrapper.refs(ref)) // Card, Form
          } else {
            refs.push(ref) // Button, Password, ShortText, MediumText, LongText, TextArea, Number, Decimal, Date, Time, Checkbox, Boolean, Select
          }
        } else {
          const externals = ['<VueGoodTable>']
          if (!externals.includes(ref._name))
            throw new Error(
              'Warning!!! some component dose not have metaData !!!' + ref._name
            )
        }
      }
      return refs
    },
    clearError(pref) {
      for (const ref of plugin.$wrapper.refs(pref)) {
        if (ref.clearError) ref.clearError()
      }
    },
    validate(pref) {
      let allValid = true
      const allErrors = []
      for (const ref of plugin.$wrapper.refs(pref)) {
        if (ref.validate) {
          const { valid, errors } = ref.validate()
          allValid = allValid && valid
          if (errors) allErrors.push(...errors)
        }
      }
      return { valid: allValid, errors: allErrors }
    },
  }
  // Math Operational
  //

  inject('wrapper', wrapper)
}
