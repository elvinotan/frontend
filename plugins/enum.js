export default function (plugin, inject) {
  const enumm = {
    SIZE: {
      MB: 1048576, // 1 MB TO BYTE
    },
    UPLOAD: {
      CONVERT: 'CONVERT', // Process convert from binary to base64
      ONUPLOAD: 'ONUPLOAD', // Process upload file dari ui ke server
      UPLOADED: 'UPLOADED', // Process upload telah selesai dan kembali ke client
      UPLOADFAILED: 'UPLOADFAILED', // Process upload file, gagal krn terjadi error
    },
    LOCAL_STORAGE: {
      EXAMPLE: 'EXAMPLE',
      APP_TOKEN: 'app_token',
    },
    VUEX: {
      EXAMPLE: 'EXAMPLE',
      LOOKUP_PREFIX: 'LOOKUP_', // Ini adalah prefix untuk component Lookup
      POPUPPAGINATION_PREFIX: 'POPUPPAGINATION_', // Ini adalah prefix untuk componentn popupPagination
    },
  }

  inject('enum', enumm)
}
