export default function ({ $axios, $config, $string, store }, inject) {
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
      return store.getters.getItem(key)
    },
    removeVuex(key) {
      store.commit('removeItem', key)
    },

    // Rest Call base on type
    async get(pUrl = '', pHeaders = {}) {
      const {
        forceUpdate,
        vuex,
        vuexFn,
        localStorage,
        localStorageFn,
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
        const result = await $axios.$get(url, { headers })
        // TODO PENTING harus handle code, bila code 400 dan 500, maka lempar ke error, harus ada standarisasi response

        if (result) {
          if (vuex) {
            const isSave = vuexFn ? vuexFn(result) : true
            if (isSave) {
              this.setVuex(vuex, result)
            }
          }
          if (localStorage) {
            const isSave = localStorageFn ? localStorageFn(result) : true
            if (isSave) {
              this.setLocalStorage(localStorage, JSON.stringify(result))
            }
          }
        }

        return { result }
      } catch (error) {
        return { error }
      }
    },

    async post(pUrl = '', payload = {}, pHeaders = {}) {
      const {
        forceUpdate,
        vuex,
        vuexFn,
        localStorage,
        localStorageFn,
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
        const result = await $axios.$post(url, payload, { headers })
        // TODO PENTING harus handle code, bila code 400 dan 500, maka lempar ke error, harus ada standarisasi response

        if (result) {
          if (vuex) {
            const isSave = vuexFn ? vuexFn(result) : true
            if (isSave) {
              this.setVuex(vuex, result)
            }
          }

          if (localStorage) {
            const isSave = localStorageFn ? localStorageFn(result) : true
            if (isSave) {
              this.setLocalStorage(localStorage, JSON.stringify(result))
            }
          }
        }

        return { result }
      } catch (error) {
        return { error }
      }
    },
  }

  inject('rest', rest)
}
