import CryptoJS from 'crypto-js/crypto-js'

export default function (plugin, inject) {
  const crypto = {
    key: CryptoJS.enc.Utf8.parse('simiank3mb4ngul4'), // do logic randaom to result key
    iv: CryptoJS.enc.Utf8.parse('k3mb4ngul4simian'), // do logic randaom to result iv
    /**
     * AES Encryption: the string key iv returns base64
     */
    encrypt: (word) => {
      const key = crypto.key
      const iv = crypto.iv

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
      const key = crypto.key
      const iv = crypto.iv

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
