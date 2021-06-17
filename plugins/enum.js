export default function (plugin, inject) {
  const enumm = {
    LOCAL_STORAGE: {
      USER: 'USER',
    },
    VUEX: {
      USER: 'USER',
    },
  }

  inject('enum', enumm)
}
