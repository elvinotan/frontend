export default function (plugin, inject) {
  const enumm = {
    LOCAL_STORAGE: {
      EXAMPLE: 'EXAMPLE',
    },
    VUEX: {
      EXAMPLE: 'EXAMPLE',
      LOOKUP_PREFIX: 'LOOKUP_', // Ini adalah prefix untuk component Lookup
    },
  }

  inject('enum', enumm)
}
