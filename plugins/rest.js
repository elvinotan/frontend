import example from '~/plugins/json/example.json'

export default function ({ $axios, $config, $string }, inject) {
  const rest = {
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

  const rests = [example]
  rests.forEach((file) => {
    // Looping pada high level untuk mendapatkan key dan value nya, ini level File
    for (const [key, value] of Object.entries(file)) {
      // Looping pada method level, untuk mendapatkan key dan value nya, ini level Methods
      if (typeof value === 'object' && value !== null) {
        rest[key] = value

        for (const [methodKey, methodValue] of Object.entries(value)) {
          if (methodKey.startsWith('get')) {
            const header = methodValue[1]

            file.url = $string.replaceByProperty(file.url, $config)

            // Replace all parameter and header with enviroment variable if exist
            if (header) {
              for (const [hKey, hValue] of Object.entries(header)) {
                header[hKey] = $string.replaceByProperty(hValue, $config)
              }
            }

            value[methodKey + '_URL'] = file.url + methodValue[0]
            value[methodKey + '_HEADER'] = header
            value[methodKey] = function (body) {
              const newUrl = $string.replaceByProperty(
                value[methodKey + '_URL'],
                body
              )
              if (value[methodKey + '_HEADER']) {
                return $axios.$get(newUrl, {
                  headers: value[methodKey + '_HEADER'],
                })
              } else {
                return $axios.$get(newUrl)
              }
            }
          }
        }
      }

      console.log(rest)
    }
  })

  inject('rest', rest)
}
