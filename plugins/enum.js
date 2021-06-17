export default function (plugin, inject) {
  const enumm = {
    LOCAL_STORAGE: {},
    VUEX: {},
  }

  inject('enum', enumm)
}
