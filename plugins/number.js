export default function (plugin, inject) {
  const number = {
    add(obj1, obj2) {
      return obj1 + obj2
    },
    gt(obj1, obj2) {
      return obj1 > obj2
    },
    gte(obj1, obj2) {
      return obj1 >= obj2
    },
    lt(obj1, obj2) {
      return obj1 < obj2
    },
    lte(obj1, obj2) {
      return obj1 <= obj2
    },
  }

  inject('number', number)
}
