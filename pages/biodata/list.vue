<template>
  <EForm id="customerForm" ref="customerForm">
    <ECol :gap-y="3">
      <EFilter id="customerFilter" ref="customerFilter" title="Search Customer" :disabled="ui.filter.disabled" @Clear="clear" @Search="search">
        <ECol :col="4">
          <EText id="filterFatherName" v-model="filter.fatherName" label="Nama Ayah" placeholder="Input Full Name" type="short" :disabled="ui.fatherName.disabled" />
          <ENumber id="filterFatherNik" v-model="filter.fatherNik" label="NIK" placeholder="Input NIK" type="short" :disabled="ui.fatherNik.disabled" />
          <EDate id="filterFatherDateOfBirth" v-model="filter.fatherDateOfBirth" label="Tgl Lahir" :disabled="ui.fatherDateOfBirth.disabled" />
          <ELookup id="filterFatherReligion" v-model="filter.fatherReligion" label="Agama" :disabled="ui.fatherReligion.disabled" lookup-group="DEMO_RELIGION" />
          <EText id="filterMotherName" v-model="filter.motherName" label="Nama Ibu" placeholder="Input Full Name" type="short" :disabled="ui.motherName.disabled" />
          <ENumber id="filterMotherNik" v-model="filter.motherNik" label="NIK" placeholder="Input NIK" type="short" :disabled="ui.motherNik.disabled" />
          <EDate id="filterFatherDateOfBirth" v-model="filter.motherDateOfBirth" label="Tgl Lahir" :disabled="ui.motherDateOfBirth.disabled" />
          <ELookup id="filterMotherReligion" v-model="filter.motherReligion" label="Agama" :disabled="ui.motherReligion.disabled" lookup-group="DEMO_RELIGION" />
        </ECol>
      </EFilter>
      <EServerPagination
        id="pagingFamily"
        ref="pagingFamily"
        label="List Of Family"
        picker="pagingFamily"
        :auto-load="true"
        :add-new-data="addNewData"
        :disabled-action="disabledAction"
        :filter="filter"
        :initial-sort-by="[{ field: 'fatherName', type: 'asc' }]"
        :actions="[
          { label: 'Delete', emit: 'hapus' },
          { label: 'Edit', emit: 'ubah' },
          { label: 'View', emit: 'lihat' },
        ]"
        :columns="[
          { label: 'Nama Ayah', field: 'fatherName', sortable: true, width: '100px', tooltip: 'Father Name', type: 'text' },
          { label: 'NIK', field: 'fatherNik', sortable: true, width: '100px', tooltip: 'NIK', type: 'text' },
          { label: 'Kelamin', field: 'fatherSex', sortable: true, width: '100px', tooltip: 'Kelamin', type: 'lookup', reference: 'DEMO_SEX' },
          { label: 'Tmpt Lahir', field: 'fatherPlaceOfBirth', sortable: true, width: '100px', tooltip: 'Tempat Lahir', type: 'text' },
          { label: 'Tgl Lahir', field: 'fatherDateOfBirth', sortable: true, width: '100px', tooltip: 'Tanggal Lahir', type: 'date' },
          { label: 'Agama', field: 'fatherReligion', sortable: true, width: '100px', tooltip: 'Agama', type: 'lookup', reference: 'DEMO_RELIGION' },
          { label: 'Edukasi', field: 'fatherEducation', sortable: true, width: '100px', tooltip: 'Edukasi', type: 'lookup', reference: 'DEMO_EDUCATION' },
          { label: 'Pekerjaan', field: 'fatherJob', sortable: true, width: '100px', tooltip: 'Pekerjaan', type: 'lookup', reference: 'DEMO_JOB' },
          { label: 'Nama Ibu', field: 'motherName', sortable: true, width: '100px', tooltip: 'Father Name', type: 'text' },
          { label: 'NIK', field: 'motherNik', sortable: true, width: '100px', tooltip: 'NIK', type: 'text' },
          { label: 'Kelamin', field: 'motherSex', sortable: true, width: '100px', tooltip: 'Kelamin', type: 'lookup', reference: 'DEMO_SEX' },
          { label: 'Tmpt Lahir', field: 'motherPlaceOfBirth', sortable: true, width: '100px', tooltip: 'Tempat Lahir', type: 'text' },
          { label: 'Tgl Lahir', field: 'motherDateOfBirth', sortable: true, width: '100px', tooltip: 'Tanggal Lahir', type: 'date' },
          { label: 'Agama', field: 'motherReligion', sortable: true, width: '100px', tooltip: 'Agama', type: 'lookup', reference: 'DEMO_RELIGION' },
          { label: 'Edukasi', field: 'motherEducation', sortable: true, width: '100px', tooltip: 'Edukasi', type: 'lookup', reference: 'DEMO_EDUCATION' },
          { label: 'Pekerjaan', field: 'motherJob', sortable: true, width: '100px', tooltip: 'Pekerjaan', type: 'lookup', reference: 'DEMO_JOB' },
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
  fatherName: null,
  fatherNik: null,
  fatherDateOfBirth: null,
  fatherReligion: null,
  motherName: null,
  motherNik: null,
  motherDateOfBirth: null,
  motherReligion: null,
}

export default {
  name: 'List',
  data() {
    return {
      filter: { ...emptyFilter },
      ui: {
        filter: { disabled: false },
        fatherName: { disabled: false },
        fatherNik: { disabled: false },
        fatherDateOfBirth: { disabled: false },
        fatherReligion: { disabled: false },
        motherName: { disabled: false },
        motherNik: { disabled: false },
        motherDateOfBirth: { disabled: false },
        motherReligion: { disabled: false },
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
        await this.$refs.pagingFamily.fetchData()
        this.$wrapper.disabled(this.ui, false)
      }
    },
  },
}
</script>
