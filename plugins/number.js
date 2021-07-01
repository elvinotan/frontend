export default function (plugin, inject) {
  const number = {
    addition(obj1, obj2) {
      return obj1 + obj2
    },
    subtract(obj1, obj2) {
      return obj1 - obj2
    },
    multiply(obj1, obj2) {
      return obj1 * obj2
    },
    division(obj1, obj2) {
      return obj1 / obj2
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
