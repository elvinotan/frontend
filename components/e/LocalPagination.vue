<template>
  <div>
    <div v-if="show">
      <div
        class="text-xs rounded border-0 outline-none ring-2 ring-gray-500 bg-white"
      >
        <div
          class="font-bold rounded-t text-sm text-gray-800 w-auto p-1 bg-gray-300"
        >
          {{ label ? label.replace(/\s/g, '&nbsp;') : '' }}
        </div>
        <vue-good-table
          :columns="lcolumns"
          :rows="rows"
          max-height="200px"
          :fixed-header="true"
          :row-style-class="rowStyleClassFn"
          style-class="vgt-table striped bordered condensed"
          :search-options="{ enabled: true }"
        >
          <div slot="emptystate">No Data....</div>
        </vue-good-table>
        <div
          class="font-bold rounded-b text-sm text-gray-800 w-auto p-1 bg-gray-300"
        >
          Bottom
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Untuk columns kita tidak menggunakan fungsi formatter dr vue-good-table
// Ini dokumentasi untuk pembuatan column
// - label = Nama header di table
// - field = nama field data dalam row
// - sortable = support order atau tidak (default true)
// - width = lebar colum dalam px ('100px')
// - tooltip = Tooltip header
// - type = text, date
export default {
  name: 'LocalPagination',
  props: {
    show: { type: Boolean, required: false, default: true },
    label: {
      type: String,
      required: true,
      default: 'Please Provide Table title...',
    },
    disabled: { type: Boolean, required: false, default: false },
    columns: { type: Array, required: false, default: () => [] },
    rows: { type: Array, required: false, default: () => [] },
  },
  data() {
    return {
      lcolumns: [],
    }
  },
  computed: {},
  created() {
    for (const column of this.columns) {
      const lcolumn = { ...column }
      if (!lcolumn.type) lcolumn.type = 'text'

      if (lcolumn.type === 'text') {
        lcolumn.formatFn = this.formatText
        lcolumn.tdClass = 'vgt-left-align'
      }
      if (lcolumn.type === 'date') {
        lcolumn.formatFn = this.formatDate
        lcolumn.tdClass = 'vgt-right-align'
      }

      delete lcolumn.type
      this.lcolumns.push(lcolumn)
    }
    console.log('this.lcolumns ', this.lcolumns)
  },
  methods: {
    formatText(value) {
      console.log('formatText.value ', value)
      if (!value) return ''
      return value
    },
    formatDate(value) {
      console.log('formatDate.value ', value)
      if (!value) return ''
      return this.$fmt.date(new Date(value), 'DD/MM/YYYY')
    },
    rowStyleClassFn(row) {
      // return row.originalIndex % 2 === 1 ? 'bg-yellow-300' : 'bg-yellow-red'
      return ''
    },
  },
}
</script>
<style>
.vgt-table.striped tbody tr:nth-of-type(odd) {
  background-color: yellow !important;
}
</style>
