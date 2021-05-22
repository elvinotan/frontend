export default function ({ app }, inject) {
  const wrapper = {
    disabled: (data, condition) => {
      if (data) {
        for (const p in data) {
          data[p].disabled = condition
        }
      } else {
        throw new Error('Undefined data parameter')
      }
    },
  }

  inject('wrapper', wrapper)
}
