export default function ({ $axios, $config, $string, $crypto, store }, inject) {
  const rest = {
    // Local Storage
    setLocalStorage(key, object) {
      window.localStorage.setItem(key, JSON.stringify(object))
    },
    getLocalStorage(key) {
      return JSON.parse(window.localStorage.getItem(key))
    },
    removeLocalStorage(key) {
      window.localStorage.removeItem(key)
    },

    // Vuex
    setVuex(key, object) {
      store.commit('setItem', { key, object })
    },
    getVuex(key) {
      const obj = store.getters.getItem(key)
      return obj ? JSON.parse(JSON.stringify(obj)) : obj
    },
    removeVuex(key) {
      store.commit('removeItem', key)
    },
    delay(delay = 0) {
      return new Promise((resolve, reject) => {
        setTimeout(() => resolve(), delay)
      })
    },

    // Rest Call base on type
    async get(pUrl = '', param, pHeaders = {}) {
      const {
        encode = true,
        forceUpdate = false,
        vuex,
        localStorage,
        saveFn = () => {
          return true
        },
        ...headers
      } = pHeaders

      if (!forceUpdate && vuex) {
        // Apakah ada data di vuex, bila ada maka tidak perlu melakukan rest call, just return data
        const result = this.getVuex(vuex)
        if (result) return { result }
      }

      if (!forceUpdate && localStorage) {
        // Apakah ada data di localStorage, bila ada maka tidak perlu melakukan rest call, just return data
        const result = this.getLocalStorage(localStorage)
        if (result) return { result }
      }

      for (const [key, value] of Object.entries(headers)) {
        headers[key] = $string.replaceByProperty(value, $config)
      }

      try {
        const paramEncrypt = param ? '/' + (encode ? $crypto.encode(param) : param) : ''
        const url = $string.replaceByProperty(pUrl + paramEncrypt, $config)
        const host = `https://${$config.API_HOST}:${$config.API_PORT}${$config.API_PREFIX}`
        const { data } = await $axios.$get(host + url, { headers })
        const { result, error } = JSON.parse($crypto.decrypt(data))
        // TODO PENTING harus handle code, bila code 400 dan 500, maka lempar ke error, harus ada standarisasi response

        if (!result && !error) throw new Error('DEVELOPER WARNING !!!!, Fail to execute GET operation, result and error must not both null')

        if (result) {
          const isSave = saveFn(result)

          if (vuex && isSave) {
            this.setVuex(vuex, result)
          }
          if (localStorage && isSave) {
            this.setLocalStorage(localStorage, JSON.stringify(result))
          }
        }

        return { result, error }
      } catch (ex) {
        console.error('Rest.Get.Error ', ex)
        const error = [{ type: 'GLOBAL', field: undefined, code: ex.code || 'EXCEPTION', message: ex.message || undefined }]
        return { error }
      }
    },

    async post(pUrl = '', payload = {}, pHeaders = {}) {
      const {
        forceUpdate = false,
        vuex,
        localStorage,
        saveFn = () => {
          return true
        },
        ...headers
      } = pHeaders

      if (!forceUpdate && vuex) {
        // Apakah ada data di vuex, bila ada maka tidak perlu melakukan rest call, just return data
        const result = this.getVuex(vuex)
        if (result) return { result }
      }

      if (!forceUpdate && localStorage) {
        // Apakah ada data di localStorage, bila ada maka tidak perlu melakukan rest call, just return data
        const result = this.getLocalStorage(localStorage)
        if (result) return { result }
      }

      for (const [key, value] of Object.entries(headers)) {
        headers[key] = $string.replaceByProperty(value, $config)
      }

      try {
        const url = $string.replaceByProperty(pUrl, $config)
        const host = `https://${$config.API_HOST}:${$config.API_PORT}${$config.API_PREFIX}`
        const jsonPayload = JSON.stringify(payload)
        const jsonPaylodEncrypt = $crypto.encrypt(jsonPayload)
        const { data } = await $axios.$post(host + url, { data: jsonPaylodEncrypt }, { headers })
        const { result, error } = JSON.parse($crypto.decrypt(data))
        // TODO PENTING harus handle code, bila code 400 dan 500, maka lempar ke error, harus ada standarisasi response

        if (!result && !error) throw new Error('DEVELOPER WARNING !!!!, Fail to execute POST operation, result and error must not both null')

        if (result) {
          const isSave = saveFn(result)

          if (vuex && isSave) {
            this.setVuex(vuex, result)
          }

          if (localStorage && isSave) {
            this.setLocalStorage(localStorage, JSON.stringify(result))
          }
        }

        return { result, error }
      } catch (ex) {
        console.error('Rest.Post.Error ', ex)
        const error = [{ type: 'GLOBAL', field: undefined, code: ex.code || 'EXCEPTION', message: ex.message || undefined }]
        return { error }
      }
    },
  }

  inject('rest', rest)
}
