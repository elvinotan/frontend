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
              width: '1000px',
              tooltip: 'Ini adalah dafar nama',
            },
            {
              label: 'Umur',
              field: 'age',
              sortable: true,
              type: 'text',
              width: '500px',
            },
          ])
        }, 5000)
      })
    },
    getData() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({
            totalRows: 35,
            rows: [
              {
                id: 1,
                name: 'Adam',
                age: 232323.5656,
                createdAt: new Date(),
                score: 231.03343,
                merried: true,
              },
              {
                id: 2,
                name: 'Cellox',
                age: 123123.8989,
                createdAt: new Date(),
                score: 0.03343,
                merried: false,
              },
              {
                id: 3,
                name: 'Budi',
                age: 789998.234234,
                createdAt: new Date(),
                score: 0.03343,
                merried: true,
              },
              {
                id: 3,
                name: 'Budi',
                age: 789998.234234,
                createdAt: new Date(),
                score: 0.03343,
                merried: true,
              },
              {
                id: 3,
                name: 'Budi',
                age: 789998.234234,
                createdAt: new Date(),
                score: 0.03343,
                merried: true,
              },
              {
                id: 3,
                name: 'Budi',
                age: 789998.234234,
                createdAt: new Date(),
                score: 0.03343,
                merried: true,
              },
              {
                id: 3,
                name: 'Budi',
                age: 789998.234234,
                createdAt: new Date(),
                score: 0.03343,
                merried: true,
              },
              {
                id: 3,
                name: 'Budi',
                age: 789998.234234,
                createdAt: new Date(),
                score: 0.03343,
                merried: true,
              },
              {
                id: 3,
                name: 'Budi',
                age: 789998.234234,
                createdAt: new Date(),
                score: 0.03343,
                merried: true,
              },
              {
                id: 3,
                name: 'Budi',
                age: 789998.234234,
                createdAt: new Date(),
                score: 0.03343,
                merried: true,
              },
            ],
          })
        }, 5000)
      })
    },
  }
  // Math Operational
  //

  inject('rest', rest)
}
