const $ = require('jquery')

export default function (plugin, inject) {
  const wrapper = {
    jquery(selector) {
      return $(selector)
    },
    disabled: (datas = [], condition = false) => {
      if (!Array.isArray(datas)) datas = [datas]

      if (datas) {
        datas.forEach((data) => {
          for (const p in data) {
            data[p].disabled = condition
          }
        })
      } else {
        throw new Error('UnIdentified ui data parameter')
      }
    },
    show: (datas = [], condition = false) => {
      if (!Array.isArray(datas)) datas = [datas]

      if (datas) {
        datas.forEach((data) => {
          for (const p in data) {
            data[p].show = condition
          }
        })
      } else {
        throw new Error('UnIdentified ui data parameter')
      }
    },
    refs: (pref) => {
      let refs = []
      for (const ref of pref.$children) {
        if (ref.metaData) {
          const { type } = ref.metaData()
          if (type === 'container') {
            refs = refs.concat(plugin.$wrapper.refs(ref)) // Card, Form
          } else if (type === 'input') {
            refs.push(ref) // Button, Password, ShortText, MediumText, LongText, TextArea, Number, Decimal, Date, Time, Checkbox, Boolean, Select
          }
        } else {
          const externals = ['<VueGoodTable>']
          if (!externals.includes(ref._name)) throw new Error("Warning!!! some component dosen't have metaData !!!" + ref._name)
        }
      }
      return refs
    },
    clearError: (pref) => {
      for (const ref of plugin.$wrapper.refs(pref)) {
        if (ref.clearError) ref.clearError()
      }
    },
    validate: (pref) => {
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

  inject('wrapper', wrapper)
}
