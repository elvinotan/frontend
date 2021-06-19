const express = require('express')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const datas = [
  {
    id: 541,
    code: 'JAHF',
    name: 'John Mecan',
    codeDescription: 'John Mecan',
    birthDate: new Date(),
    age: 15,
    saving: 158.514,
    loanPct: 15.68,
    merried: true,
  },
  {
    id: 542,
    code: 'IYHF',
    name: 'Agus sulisanto',
    codeDescription: 'Agus sulisanto',
    birthDate: new Date(),
    age: 54,
    saving: 9816.55,
    loanPct: 45.98145,
    merried: false,
  },
  {
    id: 543,
    code: 'UYHB',
    name: 'Hero ranto',
    codeDescription: 'Hero ranto',
    birthDate: new Date(),
    age: 26,
    saving: 9845.54,
    loanPct: 65.7945,
    merried: false,
  },
  {
    id: 544,
    code: 'RBVC',
    name: 'Elvino Tan',
    codeDescription: 'Elvino Tan',
    birthDate: new Date(),
    age: 42,
    saving: 158.95,
    loanPct: 25.87984,
    merried: true,
  },
  {
    code: 'IKKH',
    name: 'Carinnia Untoro',
    codeDescription: 'Carinnia Untoro',
    birthDate: new Date(),
    age: 41,
    saving: 9444.112,
    loanPct: 89.745,
    merried: true,
  },
  {
    code: 'LBVF',
    name: 'Constantine Davin Ethan',
    codeDescription: 'Constantine Davin Ethan',
    birthDate: new Date(),
    age: 15,
    saving: 9841618.564198,
    loanPct: 15.745,
    merried: false,
  },
  {
    id: 547,
    code: 'RNVF',
    name: 'Yanto ono',
    codeDescription: 'Yanto ono',
    birthDate: new Date(),
    age: 74,
    saving: 581458.8841894,
    loanPct: 98.158,
    merried: true,
  },
  {
    id: 548,
    code: 'YNBV',
    name: 'Cristina ',
    codeDescription: 'Cristina ',
    birthDate: new Date(),
    age: 45,
    saving: 7545775.755,
    loanPct: 48.75,
    merried: false,
  },
  {
    id: 549,
    code: 'YNBV',
    name: 'Urika ikada',
    codeDescription: 'Urika ikada',
    birthDate: new Date(),
    age: 56,
    saving: 5873.85636,
    loanPct: 74.75,
    merried: true,
  },
  {
    id: 550,
    code: 'KHDN',
    name: 'Sulitaianto Aryo',
    codeDescription: 'Sulitaianto Aryo',
    birthDate: new Date(),
    age: 54,
    saving: 8852.44,
    loanPct: 94.75,
    merried: true,
  },
  {
    id: 551,
    code: 'PKDK',
    name: 'Brima doa',
    codeDescription: 'Brima doa',
    birthDate: new Date(),
    age: 95,
    saving: 8638.77418,
    loanPct: 47.75,
    merried: true,
  },
  {
    id: 551,
    code: 'ODKD',
    name: 'Ibna uban',
    codeDescription: 'Ibna uban',
    birthDate: new Date(),
    age: 74,
    saving: 2356.258,
    loanPct: 35.75,
    merried: true,
  },
]

app.get('/example/biodata/:id', function (req, res) {
  console.log('Get ', req.params.id)
  res.json({ id: 1, name: 'yanto', as: 'developer' })
})

app.post('/example/biodata', function (req, res) {
  console.log('Post ', req.body)
  res.json(req.body)
})

app.post('/general/pagination/popup', function (req, res) {
  console.log('Post ', req.body)
  const { code, picker } = req.body
  // Lakukan query bila code berhasil di dapat dan berhasil di dapat 1, maka return ini
  const filtered = datas.filter((e) => {
    return e.code === code
  })
  res.json(filtered)
})

app.post('/general/pagination/page', function (req, res) {
  console.log('Body.Pagination ', req.body)

  const { page, perPage, search } = req.body

  if (search) {
    const filtered = datas.filter((e) => {
      return e.code.includes(search)
    })
    res.json({
      totalRows: filtered.length,
      rows: filtered,
    })
  } else {
    const begin = (page - 1) * perPage
    const end = begin + perPage
    res.json({
      totalRows: 12,
      rows: datas.slice(begin, end),
    })
  }
})

app.get('/general/lookup/:group', function (req, res) {
  const group = req.params.group
  if (group === 'SEX') {
    res.json([
      { value: 'M', description: 'Male' },
      { value: 'F', description: 'Female' },
      { value: 'X', description: 'Unknown' },
    ])
  }
  if (group === 'EDUCATION') {
    res.json([
      { value: 'SD', description: 'SD' },
      { value: 'SMP', description: 'SMP' },
      { value: 'SMA', description: 'SMA' },
    ])
  }
  if (group === 'EXP') {
    res.json([
      { value: 1, description: '1 Th' },
      { value: 2, description: '2 Th' },
      { value: 3, description: '3 Th' },
    ])
  }
})

export default {
  path: '/api',
  handler: app,
}
