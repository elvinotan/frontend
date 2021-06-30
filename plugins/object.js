export default function (plugin, inject) {
  const object = {
    clone: (object) => {
      const json = JSON.stringify(object)
      return JSON.parse(json)
    },
  }

  inject('object', object)
}
