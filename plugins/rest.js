export default function (plugin, inject) {
  const rest = {
    getPicker(picker) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([
            {
              label: 'Name',
              field: 'name',
              sortable: true,
              width: '750px',
              tooltip: 'Column Name',
              type: 'text',
            },
            {
              label: 'Bith Date',
              field: 'birthDate',
              sortable: false,
              width: '200px',
              tooltip: 'Tanggal Lahir Customer',
              type: 'date',
            },
            {
              label: 'Age',
              field: 'age',
              sortable: true,
              width: '100px',
              tooltip: 'Umur Customer ',
              type: 'number',
            },
            {
              label: 'Saving ($)',
              field: 'saving',
              sortable: true,
              width: '200px',
              tooltip: 'Simpanan Dalam mata uang dollar',
              type: 'decimal',
            },
            {
              label: 'Loan Alocate',
              field: 'loanPct',
              sortable: true,
              width: '150px',
              tooltip: 'Alokasi jatah pinjaman',
              type: 'percentage',
            },
            {
              label: 'Merried',
              field: 'merried',
              sortable: true,
              width: '100px',
              tooltip: 'Sudah menikah atau belum',
              type: 'boolean',
            },
          ])
        }, 1000)
      })
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
  // Math Operational
  //

  inject('rest', rest)
}
