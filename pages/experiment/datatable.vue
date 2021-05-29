<template>
  <div class="px-10 py-1">
    <EServerPagination
      id="Customer"
      :disabled="false"
      label="Customer List"
      :actions="actions"
      :buttons="buttons"
      :disabled-action="disabledAction"
      :add-new-data="addNewData"
      :initial-sort-by="[{ field: 'name', type: 'desc' }]"
      :save-state="
        (props) => {
          return props.row.id
        }
      "
      picker="pagingCustomer"
      @Edit="editRow"
      @Delete="deleteRow"
      @Process="process"
      @Generate="generate"
    />
    <ELocalPagination
      id="Customer"
      :disabled="false"
      label="Customer List"
      :columns="columns"
      :rows="rows"
      :actions="actions"
      :buttons="buttons"
      :disabled-action="disabledAction"
      :add-new-data="addNewData"
      :initial-sort-by="[{ field: 'name', type: 'desc' }]"
      :save-state="
        (props) => {
          return props.row.id
        }
      "
      @Edit="editRow"
      @Delete="deleteRow"
      @Process="process"
      @Generate="generate"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      actions: [
        {
          label: 'Edit',
        },
        {
          label: 'Delete',
        },
      ],
      buttons: [
        {
          label: 'Process',
          color: 'green',
        },
        {
          label: 'Generate',
          color: 'yellow',
        },
      ],
      columns: [
        {
          label: 'Name',
          field: 'name',
          sortable: false,
          width: '1000px',
          tooltip: 'Ini adalah dafar nama',
        },
        {
          label: 'Umur',
          field: 'age',
          sortable: false,
          type: 'number',
          width: '500px',
          formatFn: (value) => {
            return 'Rp' + value
          },
        },
      ],
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
      ],
    }
  },
  methods: {
    onRowClick(params) {
      console.log('onRowClick ', params)
    },
    addNewData() {
      this.rows.push({
        name: 'Elvino Tan',
        age: 40.5,
        createdAt: new Date(),
        score: 150,
        merried: true,
      })
      console.log('Add New Data Triggered')
    },
    process(selectedRow) {
      console.log('Process Triggered')
      for (const row of selectedRow) {
        console.log('Row', row)
      }
    },
    generate(selectedRow) {
      console.log('Generate Triggered')
      for (const row of selectedRow) {
        console.log('Row', row)
      }
    },
    disabledAction(action, prop) {
      if (action.label === 'Delete') return prop.row.name === 'Dan'
      return false
    },
    editRow(row) {
      console.log('Edit Row ', row)
    },
    deleteRow(row) {
      this.rows.pop()
      console.log('Delete Row ', row)
    },
  },
}
</script>
