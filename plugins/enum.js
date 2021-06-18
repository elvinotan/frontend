export default function (plugin, inject) {
  const enumm = {
    LOCAL_STORAGE: {
      USER: 'USER',
    },
    VUEX: {
      LOOKUP_PREFIX: 'LOOKUP_', // Ini adalah prefix untuk component Lookup
    },
  }

  inject('enum', enumm)
}
