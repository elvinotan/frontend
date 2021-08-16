import CryptoJS from 'crypto-js/crypto-js'

export default function (plugin, inject) {
  const crypto = {
    /**
     * AES Encryption: the string key iv returns base64
     */
    encrypt: (word) => {
      const key = CryptoJS.enc.Utf8.parse('1234567890123456')
      const iv = CryptoJS.enc.Utf8.parse('1234567890123456')

      const srcs = CryptoJS.enc.Utf8.parse(word)
      const encrypted = CryptoJS.AES.encrypt(srcs, key, {
        iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding,
      })
      // console.log("-=-=-=-", encrypted.ciphertext)
      return CryptoJS.enc.Base64.stringify(encrypted.ciphertext)
    },

    /**
     * AES Decryption: the string key iv returns base64
     *
     */
    decrypt: (word) => {
      const key = CryptoJS.enc.Utf8.parse('1234567890123456')
      const iv = CryptoJS.enc.Utf8.parse('1234567890123456')

      const base64 = CryptoJS.enc.Base64.parse(word)
      const src = CryptoJS.enc.Base64.stringify(base64)

      const decrypt = CryptoJS.AES.decrypt(src, key, {
        iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding,
      })

      const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
      return decryptedStr.toString()
    },
  }
  inject('crypto', crypto)
}
