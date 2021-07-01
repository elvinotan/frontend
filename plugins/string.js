export default function (plugin, inject) {
  const string = {
    empty: (str) => {
      return str === '' || str === null
    },
    split: (str, delimter) => {
      return str.split(delimter)
    },
    upperCase: (str) => {
      if (this.empty(str)) return str
      return str.toUpperCase()
    },
    lowerCase: (str) => {
      if (this.empty(str)) return str
      return str.toLowerCase()
    },
    // ini khsusu untuk rest plugin
    replaceByProperty: (string, object) => {
      let temp = string
      if (temp.includes('[')) {
        for (const [key, value] of Object.entries(object)) {
          if (typeof value !== 'object') {
            temp = temp.replace('[' + key + ']', value)
          }
        }
      }
      return temp
    },
  }

  inject('string', string)
}
