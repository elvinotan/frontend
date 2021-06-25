export default function ({ $axios, $config, $string, $number, store }, inject) {
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
        forceUpdate = false,
        vuex,
        localStorage,
        expired = 0,
        saveFn = () => {
          return true
        },
        ...headers
      } = pHeaders

      if (!forceUpdate && vuex) {
        // Apakah ada data di vuex, bila ada maka tidak perlu melakukan rest call, just return data
        const { expiredOn, ...result } = this.getVuex(vuex) || {}
        if (result && $number.lt(new Date().getTime(), expiredOn)) {
          return { result }
        }
      }

      if (!forceUpdate && localStorage) {
        // Apakah ada data di localStorage, bila ada maka tidak perlu melakukan rest call, just return data
        const { expiredOn, ...result } =
          this.getLocalStorage(localStorage) || {}
        if (result && $number.lt(new Date().getTime(), expiredOn)) {
          return { result }
        }
      }

      for (const [key, value] of Object.entries(headers)) {
        headers[key] = $string.replaceByProperty(value, $config)
      }

      try {
        const url = $string.replaceByProperty(pUrl, $config)
        const result = await $axios.$get(url, { headers })
        // TODO PENTING harus handle code, bila code 400 dan 500, maka lempar ke error, harus ada standarisasi response

        if (result) {
          const expiredOn = $number.add(new Date().getTime(), expired || 0)
          const isSave = saveFn(result)

          if (vuex && isSave) {
            this.setVuex(vuex, { expiredOn, result })
          }
          if (localStorage && isSave) {
            this.setLocalStorage(
              localStorage,
              JSON.stringify({ expiredOn, result })
            )
          }
        }

        return { result }
      } catch (error) {
        return { error }
      }
    },

    async post(pUrl = '', payload = {}, pHeaders = {}) {
      const {
        forceUpdate = false,
        vuex,
        localStorage,
        expired = 0,
        saveFn = () => {
          return true
        },
        ...headers
      } = pHeaders

      if (!forceUpdate && vuex) {
        // Apakah ada data di vuex, bila ada maka tidak perlu melakukan rest call, just return data
        const { expiredOn, ...result } = this.getVuex(vuex) || {}
        if (result && $number.lt(new Date().getTime(), expiredOn)) {
          return { result }
        }
      }

      if (!forceUpdate && localStorage) {
        // Apakah ada data di localStorage, bila ada maka tidak perlu melakukan rest call, just return data
        const { expiredOn, ...result } =
          this.getLocalStorage(localStorage) || {}
        if (result && $number.lt(new Date().getTime(), expiredOn)) {
          return { result }
        }
      }

      for (const [key, value] of Object.entries(headers)) {
        headers[key] = $string.replaceByProperty(value, $config)
      }

      try {
        const url = $string.replaceByProperty(pUrl, $config)
        const result = await $axios.$post(url, payload, { headers })
        // TODO PENTING harus handle code, bila code 400 dan 500, maka lempar ke error, harus ada standarisasi response

        if (result) {
          const expiredOn = $number.add(new Date().getTime(), expired || 0)
          const isSave = saveFn(result)

          if (vuex && isSave) {
            this.setVuex(vuex, { expiredOn, ...result })
          }

          if (localStorage && isSave) {
            this.setLocalStorage(
              localStorage,
              JSON.stringify({ expiredOn, ...result })
            )
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
