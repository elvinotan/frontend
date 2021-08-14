<template>
  <EForm id="customerForm" ref="customerForm">
    <ECol :gap-y="3">
      <EFilter id="customerFilter" ref="customerFilter" title="Search Customer" :disabled="ui.filter.disabled" @Clear="clear" @Search="search">
        <ECol :col="4">
          <EText id="customerFilterName" ref="customerFilterName" v-model="filter.name" label="Full Name" placeholder="Input Full Name" type="long" :disabled="ui.name.disabled" :required="false" />
          <EDate id="customerFilterBirthDate" ref="customerFilterBirthDate" v-model="filter.birthDate" label="Birth Date" :disabled="ui.birthDate.disabled" :required="false" />
          <ENumber id="customerFilterBirthAge" ref="customerFilterBirthAge" v-model="filter.age" label="Age" placeholder="Input Age" :maxlength="3" :disabled="ui.age.disabled" :required="false" />
          <EBoolean id="customerFilterBirthMerried" ref="customerFilterBirthMerried" v-model="filter.merried" label="Merried" placeholder="" type="YesNo" :disabled="ui.merried.disabled" :required="false" />
        </ECol>
      </EFilter>
      <EServerPagination
        id="customerServerPagination"
        ref="customerServerPagination"
        label="List Of Customer"
        picker="pagingDummyCustomer"
        :auto-load="true"
        :filter="filter"
        :add-new-data="addNewData"
        :disabled-action="disabledAction"
        :actions="[
          { label: 'Delete', emit: 'hapus' },
          { label: 'Edit', emit: 'ubah' },
          { label: 'View', emit: 'lihat' },
        ]"
        :initial-sort-by="[{ field: 'name', type: 'asc' }]"
        :columns="[
          { label: 'Full Name', field: 'name', sortable: true, width: '600px', tooltip: 'Customer Name', type: 'text' },
          { label: 'Birth Date', field: 'birthDate', sortable: true, width: '100px', tooltip: 'Customer Birth Date', type: 'date' },
          { label: 'Age', field: 'age', sortable: true, width: '100px', tooltip: 'Customer Age', type: 'number' },
          { label: 'Saving', field: 'saving', sortable: true, width: '100px', tooltip: 'Customer Bank Saving', type: 'decimal' },
          { label: 'Allow Loan Pct', field: 'loanPct', sortable: true, width: '100px', tooltip: 'Loan Percentage Allowed', type: 'percentage' },
          { label: 'Merried', field: 'merried', sortable: true, width: '100px', tooltip: 'Is Customer Merried', type: 'boolean' },
        ]"
        @RowClick="rowClick"
        @hapus="hapus"
        @lihat="lihat"
        @ubah="ubah"
      />
    </ECol>
    <EMessage id="customerMessage" ref="customerMessage" />
  </EForm>
</template>
<script>
const emptyFilter = {
  name: null,
  birthDate: null,
  age: null,
  merried: null,
}

export default {
  name: 'List',
  data() {
    return {
      filter: { ...emptyFilter },
      ui: {
        name: { disabled: false },
        birthDate: { disabled: false },
        age: { disabled: false },
        merried: { disabled: false },
        filter: { disabled: false },
      },
    }
  },
  created() {
    this.$nav.breadcrumb('BN005')
  },
  methods: {
    addNewData() {
      this.$nav.to({ path: '/biodata/entry' })
      // this.$refs.customerMessage.success('Add New Data Clicked, Redirect to Entry Page')
    },
    disabledAction(label, data) {
      if (label.emit === 'hapus') {
        return data.row.age > 50
      }
      if (label.emit === 'ubah') {
        return data.row.merried
      }
      if (label.emit === 'lihat') {
        return data.row.loanPct > 50
      }
      return false
    },
    rowClick(data) {
      this.$refs.customerMessage.success(`Detail data customer, with data [Name: ${data.row.name}, Age: ${data.row.age}]`)
    },
    hapus(data) {
      this.$refs.customerMessage.success(`Delete data customer, with data [Name: ${data.row.name}, Age: ${data.row.age}]`)
    },
    lihat(data) {
      this.$refs.customerMessage.success(`View data customer, with data [Name: ${data.row.name}, Age: ${data.row.age}]`)
    },
    ubah(data) {
      this.$refs.customerMessage.success(`Edit data customer, with data [Name: ${data.row.name}, Age: ${data.row.age}]`)
    },
    clear() {
      this.filter = { ...emptyFilter }
    },
    async search() {
      const { valid } = this.$wrapper.validate(this.$refs.customerFilter)
      if (valid) {
        this.$wrapper.disabled(this.ui, true)
        await this.$refs.customerServerPagination.fetchData()
        this.$wrapper.disabled(this.ui, false)
      }
    },
  },
}
</script>
