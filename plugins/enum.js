export default function (plugin, inject) {
  const enumm = {
    LOCAL_STORAGE: {
      EXAMPLE: 'EXAMPLE',
      USER_LOGIN: '',
    },
    VUEX: {
      EXAMPLE: 'EXAMPLE',
      LOOKUP_PREFIX: 'LOOKUP_', // Ini adalah prefix untuk component Lookup
      POPUPPAGINATION_PREFIX: 'POPUPPAGINATION_', // Ini adalah prefix untuk componentn popupPagination
    },
  }

  inject('enum', enumm)
}
