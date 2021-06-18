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
      const { forceUpdate, vuex, localStorage, ...headers } = pHeaders

      if (!forceUpdate && vuex) {
        // Apakah ada data di vuex, bila ada maka tidak perlu melakukan rest call, just return data
        const result = this.getVuex(vuex)
        if (result) return result
      }

      if (!forceUpdate && localStorage) {
        // Apakah ada data di localStorage, bila ada maka tidak perlu melakukan rest call, just return data
        const result = this.getLocalStorage(localStorage)
        if (result) return result
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
            this.setVuex(vuex, result)
          }
          if (localStorage) {
            this.setLocalStorage(localStorage, JSON.stringify(result))
          }
        }

        return { result }
      } catch (error) {
        return { error }
      }
    },

    async post(pUrl = '', payload = {}, pHeaders = {}) {
      const { forceUpdate, vuex, localStorage, ...headers } = pHeaders

      if (!forceUpdate && vuex) {
        // Apakah ada data di vuex, bila ada maka tidak perlu melakukan rest call, just return data
        const result = this.getVuex(vuex)
        if (result) return result
      }

      if (!forceUpdate && localStorage) {
        // Apakah ada data di localStorage, bila ada maka tidak perlu melakukan rest call, just return data
        const result = this.getLocalStorage(localStorage)
        if (result) return result
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
            this.setVuex(vuex, result)
          }
          if (localStorage) {
            this.setLocalStorage(localStorage, JSON.stringify(result))
          }
        }

        return { result }
      } catch (error) {
        return { error }
      }
    },

    getLookup(lookupGroup) {
      if (lookupGroup === 'SEX') {
        return [
          { value: 'M', description: 'Male' },
          { value: 'F', description: 'Female' },
          { value: 'X', description: 'Unknown' },
        ]
      }
      if (lookupGroup === 'EDUCATION') {
        return [
          { value: 'SD', description: 'SD' },
          { value: 'SMP', description: 'SMP' },
          { value: 'SMA', description: 'SMA' },
        ]
      }
      if (lookupGroup === 'EXP') {
        return [
          { value: 1, description: '1 Th' },
          { value: 2, description: '2 Th' },
          { value: 3, description: '3 Th' },
        ]
      }
    },

    getPaginationData(params) {
      console.log('params ', params)
      const datas = [
        {
          id: 541,
          name: 'John Mecan',
          birthDate: new Date(),
          age: 15,
          saving: 158.514,
          loanPct: 15.68,
          merried: true,
        },
        {
          id: 542,
          name: 'Agus sulisanto',
          birthDate: new Date(),
          age: 54,
          saving: 9816.55,
          loanPct: 45.98145,
          merried: false,
        },
        {
          id: 543,
          name: 'Hero ranto',
          birthDate: new Date(),
          age: 26,
          saving: 9845.54,
          loanPct: 65.7945,
          merried: false,
        },
        {
          id: 544,
          name: 'Elvino Tan',
          birthDate: new Date(),
          age: 42,
          saving: 158.95,
          loanPct: 25.87984,
          merried: true,
        },
        {
          name: 'Carinnia Untoro',
          birthDate: new Date(),
          age: 41,
          saving: 9444.112,
          loanPct: 89.745,
          merried: true,
        },
        {
          name: 'Constantine Davin Ethan',
          birthDate: new Date(),
          age: 15,
          saving: 9841618.564198,
          loanPct: 15.745,
          merried: false,
        },
        {
          id: 547,
          name: 'Yanto ono',
          birthDate: new Date(),
          age: 74,
          saving: 581458.8841894,
          loanPct: 98.158,
          merried: true,
        },
        {
          id: 548,
          name: 'Cristina ',
          birthDate: new Date(),
          age: 45,
          saving: 7545775.755,
          loanPct: 48.75,
          merried: false,
        },
        {
          id: 549,
          name: 'Urika ikada',
          birthDate: new Date(),
          age: 56,
          saving: 5873.85636,
          loanPct: 74.75,
          merried: true,
        },
        {
          id: 550,
          name: 'Sulitaianto Aryo',
          birthDate: new Date(),
          age: 54,
          saving: 8852.44,
          loanPct: 94.75,
          merried: true,
        },
        {
          id: 551,
          name: 'Brima doa',
          birthDate: new Date(),
          age: 95,
          saving: 8638.77418,
          loanPct: 47.75,
          merried: true,
        },
        {
          id: 551,
          name: 'Ibna uban',
          birthDate: new Date(),
          age: 74,
          saving: 2356.258,
          loanPct: 35.75,
          merried: true,
        },
      ]
      const begin = (params.page - 1) * params.perPage
      const end = begin + params.perPage
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({
            totalRows: 12,
            rows: datas.slice(begin, end),
          })
        }, 1000)
      })
    },
  }

  inject('rest', rest)
}
