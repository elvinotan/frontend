export default function (plugin, inject) {
  const string = {
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
