<template>
  <div>
    <div v-if="show">
      {{ lcolumns }}
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
// - type = text, date, number, decimal, percentage, boolean
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
      let lcolumn = { ...column }
      if (!lcolumn.type) lcolumn.type = 'text'

      if (lcolumn.type === 'text') {
        lcolumn = {
          ...lcolumn,
          formatFn: this.formatText,
          thClass: 'vgt-left-align',
          tdClass: 'vgt-left-align',
        }
        delete lcolumn.type
      }
      if (lcolumn.type === 'date') {
        lcolumn = {
          ...lcolumn,
          formatFn: this.formatDate,
          thClass: 'vgt-center-align',
          tdClass: 'vgt-center-align',
        }
        delete lcolumn.type
      }
      if (lcolumn.type === 'number') {
        lcolumn = {
          ...lcolumn,
          formatFn: this.formatNumber,
          thClass: 'vgt-right-align',
          tdClass: 'vgt-right-align',
          type: 'number',
        }
      }
      if (lcolumn.type === 'decimal') {
        lcolumn = {
          ...lcolumn,
          formatFn: this.formatDecimal,
          thClass: 'vgt-right-align',
          tdClass: 'vgt-right-align',
          type: 'number',
        }
      }
      if (lcolumn.type === 'percentage') {
        lcolumn = {
          ...lcolumn,
          formatFn: this.formatPercentage,
          thClass: 'vgt-right-align',
          tdClass: 'vgt-right-align',
          type: 'number',
        }
      }
      if (lcolumn.type === 'boolean') {
        lcolumn = {
          ...lcolumn,
          formatFn: this.formatBoolean,
          thClass: 'vgt-center-align',
          tdClass: 'vgt-center-align',
        }
        delete lcolumn.type
      }

      this.lcolumns.push(lcolumn)
    }
    console.log('this.lcolumns ', this.lcolumns)
  },
  methods: {
    formatText(value) {
      if (!value) return ''
      return value
    },
    formatDate(value) {
      if (!value) return ''
      return this.$fmt.date(new Date(value), 'DD/MM/YYYY')
    },
    formatNumber(value) {
      if (!value) return ''
      return this.$fmt.number(value)
    },
    formatDecimal(value) {
      if (!value) return ''
      return this.$fmt.decimal(value, 2, 2)
    },
    formatPercentage(value) {
      return this.formatDecimal(value) + ' %'
    },
    formatBoolean(value) {
      return value ? 'Yes' : 'No'
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
