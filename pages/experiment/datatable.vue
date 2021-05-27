<template>
  <div>
    <ELocalPagination label="Customer List" :columns="columns" :rows="rows" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      columns: [
        {
          label: 'Name',
          field: 'name',
          sortable: false,
        },
        {
          label: 'Age',
          field: 'age',
          type: 'decimal',
        },
        {
          label: 'Created On',
          field: 'createdAt',
          type: 'date',
        },
        {
          label: 'Percent',
          field: 'score',
          type: 'percentage',
        },
        {
          label: 'Nikah',
          field: 'merried',
          type: 'boolean',
        },
      ],
      rows: [
        {
          id: 1,
          name: 'John Cena',
          age: 232323.5656,
          createdAt: new Date(),
          score: 231.03343,
          merried: true,
        },
        {
          id: 2,
          name: 'Jane Doe',
          age: 123123.8989,
          createdAt: new Date(),
          score: 0.03343,
          merried: false,
        },
        {
          id: 3,
          name: 'Elvino Tan ',
          age: 789998.234234,
          createdAt: new Date(),
          score: 0.03343,
          merried: true,
        },
        {
          id: 4,
          name: 'Chris',
          age: 234.77,
          createdAt: new Date(),
          score: 0.03343,
          merried: false,
        },
        {
          id: 5,
          name: 'Dan',
          age: 234567.23545,
          createdAt: new Date(),
          score: 12.03343,
          merried: true,
        },
        {
          id: 6,
          name: 'John',
          age: 234.879,
          createdAt: new Date(),
          score: 78.03343,
          merried: true,
        },
      ],
    }
  },
}
</script>
