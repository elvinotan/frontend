export default function (plugin, inject) {
  const object = {
    isString(value) {
      return typeof value === 'string' || value instanceof String
    },
    isNumber(value) {
      return typeof value === 'number' || value instanceof Number
    },
    isBoolean(value) {
      return typeof value === 'boolean' || value instanceof Boolean
    },
    isObject(value) {
      return typeof value === 'object' || value instanceof Object
    },
    isArray(str) {
      return Array.isArray(str)
    },
    clone: (object) => {
      const json = JSON.stringify(object)
      return JSON.parse(json)
    },
  }

  inject('object', object)
}
