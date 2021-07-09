const express = require('express')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const datas = [
  {
    id: 541,
    popupCode: 'JAHF',
    name: 'John Mecan',
    popupDescription: 'John Mecan',
    birthDate: new Date(),
    age: 15,
    saving: 158.514,
    loanPct: 15.68,
    merried: true,
  },
  {
    id: 542,
    popupCode: 'IYHF',
    name: 'Agus sulisanto',
    popupDescription: 'Agus sulisanto',
    birthDate: new Date(),
    age: 54,
    saving: 9816.55,
    loanPct: 45.98145,
    merried: false,
  },
  {
    id: 543,
    popupCode: 'UYHB',
    name: 'Hero ranto',
    popupDescription: 'Hero ranto',
    birthDate: new Date(),
    age: 26,
    saving: 9845.54,
    loanPct: 65.7945,
    merried: false,
  },
  {
    id: 544,
    popupCode: 'RBVC',
    name: 'Elvino Tan',
    popupDescription: 'Elvino Tan',
    birthDate: new Date(),
    age: 42,
    saving: 158.95,
    loanPct: 25.87984,
    merried: true,
  },
  {
    popupCode: 'IKKH',
    name: 'Carinnia Untoro',
    popupDescription: 'Carinnia Untoro',
    birthDate: new Date(),
    age: 41,
    saving: 9444.112,
    loanPct: 89.745,
    merried: true,
  },
  {
    popupCode: 'LBVF',
    name: 'Constantine Davin Ethan',
    popupDescription: 'Constantine Davin Ethan',
    birthDate: new Date(),
    age: 15,
    saving: 9841618.564198,
    loanPct: 15.745,
    merried: false,
  },
  {
    id: 547,
    popupCode: 'RNVF',
    name: 'Yanto ono',
    popupDescription: 'Yanto ono',
    birthDate: new Date(),
    age: 74,
    saving: 581458.8841894,
    loanPct: 98.158,
    merried: true,
  },
  {
    id: 548,
    popupCode: 'YNBV',
    name: 'Cristina ',
    popupDescription: 'Cristina ',
    birthDate: new Date(),
    age: 45,
    saving: 7545775.755,
    loanPct: 48.75,
    merried: false,
  },
  {
    id: 549,
    popupCode: 'YNBV',
    name: 'Urika ikada',
    popupDescription: 'Urika ikada',
    birthDate: new Date(),
    age: 56,
    saving: 5873.85636,
    loanPct: 74.75,
    merried: true,
  },
  {
    id: 550,
    popupCode: 'KHDN',
    name: 'Sulitaianto Aryo',
    popupDescription: 'Sulitaianto Aryo',
    birthDate: new Date(),
    age: 54,
    saving: 8852.44,
    loanPct: 94.75,
    merried: true,
  },
  {
    id: 551,
    popupCode: 'PKDK',
    name: 'Brima doa',
    popupDescription: 'Brima doa',
    birthDate: new Date(),
    age: 95,
    saving: 8638.77418,
    loanPct: 47.75,
    merried: true,
  },
  {
    id: 551,
    popupCode: 'ODKD',
    name: 'Ibna uban',
    popupDescription: 'Ibna uban',
    birthDate: new Date(),
    age: 74,
    saving: 2356.258,
    loanPct: 35.75,
    merried: true,
  },
]

app.get('/example/biodata/:id', function (req, res) {
  console.log('Get ', req.params.id)
  res.json({ result: { id: 1, name: 'yanto', as: 'developer' }, error: null })
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
    return e.popupCode === code
  })
  res.json({ result: filtered, error: null })
})

app.post('/general/pagination/page', function (req, res) {
  console.log('Body.Pagination ', req.body)

  const { page, perPage, search } = req.body

  if (search) {
    const filtered = datas.filter((e) => {
      return e.popupCode.includes(search)
    })
    res.json({
      result: {
        totalRows: filtered.length,
        rows: filtered,
      },
      error: null,
    })
  } else {
    const begin = (page - 1) * perPage
    const end = begin + perPage
    res.json({
      result: {
        totalRows: 12,
        rows: datas.slice(begin, end),
      },
      error: null,
    })
  }
})
app.get('/general/lookups', function (req, res) {
  res.json({
    result: {
      SEX: [
        { value: 'M', description: 'Male' },
        { value: 'F', description: 'Female' },
        { value: 'X', description: 'Unknown' },
      ],
      EDUCATION: [
        { value: 'SD', description: 'SD' },
        { value: 'SMP', description: 'SMP' },
        { value: 'SMA', description: 'SMA' },
        { value: 'S1', description: 'S1' },
        { value: 'S2', description: 'S2' },
      ],
      RELIGION: [
        { value: 'ISLAM', description: 'ISLAM' },
        { value: 'KATOLIK', description: 'KATOLIK' },
        { value: 'KRISTEN', description: 'KRISTEN' },
        { value: 'BUDHA', description: 'BUDHA' },
        { value: 'HINDU', description: 'HINDU' },
        { value: 'KONGHUCU', description: 'KONGHUCU' },
      ],
      EXP: [
        { value: 1, description: '1 Th' },
        { value: 2, description: '2 Th' },
        { value: 3, description: '3 Th' },
      ],
      JOB: [
        { value: 1, description: 'Karyawan' },
        { value: 2, description: 'Ibu Rumah Tangga' },
        { value: 3, description: 'Penganguran' },
      ],
    },
    error: null,
  })
})
app.get('/general/lookup/:group', function (req, res) {
  const group = req.params.group
  if (group === 'SEX') {
    res.json({
      result: [
        { value: 'M', description: 'Male' },
        { value: 'F', description: 'Female' },
        { value: 'X', description: 'Unknown' },
      ],
      error: null,
    })
  }
  if (group === 'EDUCATION') {
    res.json({
      result: [
        { value: 'SD', description: 'SD' },
        { value: 'SMP', description: 'SMP' },
        { value: 'SMA', description: 'SMA' },
        { value: 'S1', description: 'S1' },
        { value: 'S2', description: 'S2' },
      ],
      error: null,
    })
  }
  if (group === 'RELIGION') {
    res.json({
      result: [
        { value: 'ISLAM', description: 'ISLAM' },
        { value: 'KATOLIK', description: 'KATOLIK' },
        { value: 'KRISTEN', description: 'KRISTEN' },
        { value: 'BUDHA', description: 'BUDHA' },
        { value: 'HINDU', description: 'HINDU' },
        { value: 'KONGHUCU', description: 'KONGHUCU' },
      ],
      error: null,
    })
  }
  if (group === 'EXP') {
    res.json({
      result: [
        { value: 1, description: '1 Th' },
        { value: 2, description: '2 Th' },
        { value: 3, description: '3 Th' },
      ],
      error: null,
    })
  }
  if (group === 'JOB') {
    res.json({
      result: [
        { value: 1, description: 'Karyawan' },
        { value: 2, description: 'Ibu Rumah Tangga' },
        { value: 3, description: 'Penganguran' },
      ],
      error: null,
    })
  }
})

export default {
  path: '/api',
  handler: app,
}
