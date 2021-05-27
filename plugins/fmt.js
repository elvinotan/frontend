export default function (plugin, inject) {
  const fmt = {
    date: (value = null, pattern = 'DD/MM/YYYY') => {
      if (value && pattern) {
        // Must return YYYY-MM-DD, krn format ini yang di terima oleh input tag dgn tipe date
        const year = value.getFullYear()
        const month =
          value.getMonth().toString().length === 1
            ? `0${value.getMonth() + 1}`
            : value.getMonth()
        const date =
          value.getDate().toString().length === 1
            ? `0${value.getDate() + 1}`
            : value.getDate()

        return pattern
          .replace(/YYYY/g, year)
          .replace(/MM/g, month)
          .replace(/DD/g, date)
      } else {
        return value
      }
    },
    number(value = null) {
      if (value) {
        return new Intl.NumberFormat('en-US', {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(value)
      } else {
        return value
      }
    },
    decimal(
      value = null,
      minimumFractionDigits = 0,
      maximumFractionDigits = 2
    ) {
      if (value) {
        return new Intl.NumberFormat('en-US', {
          minimumFractionDigits,
          maximumFractionDigits,
        }).format(value)
      } else {
        return value
      }
    },
  }

  inject('fmt', fmt)
}
