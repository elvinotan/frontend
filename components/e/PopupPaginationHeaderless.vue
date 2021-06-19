<template>
  <div>
    <div v-if="show">
      <div
        class="text-xs rounded border-0 outline-none ring-2 ring-gray-500 bg-white"
      >
        <vue-good-table
          :id="id"
          mode="remote"
          :is-loading.sync="isLoading"
          :total-rows="totalRows"
          :columns="lcolumns"
          :rows="rows"
          :fixed-header="true"
          :row-style-class="_rowStyleClassFn"
          :search-options="{
            enabled: true,
            trigger: 'enter',
          }"
          :pagination-options="{
            enabled: true,
            perPageDropdownEnabled: false,
            mode: 'pages',
            perPage: 5,
            position: 'bottom',
            setCurrentPage: 1,
            nextLabel: 'Next',
            prevLabel: 'Prev',
            ofLabel: 'of',
            pageLabel: 'Page', // for 'pages' mode
            allLabel: 'All',
          }"
          style-class="vgt-table striped bordered condensed"
          class="border-2"
          @on-search="_onSearch"
          @on-page-change="_onPageChange"
          @on-sort-change="_onSortChange"
          @on-cell-click="_onCellClick"
          @on-row-click="_onRowClick"
        >
          <div slot="emptystate" class="text-center">
            {{ _dataEmptyDescription }}
          </div>
          <div slot="table-actions" class="py-0.5 px-2">
            <EButton
              :id="'PopupPaginationHeaderless' + id + 'Close'"
              label="Close"
              class="w-full"
              @click="$emit('Close')"
            />
          </div>
          <template slot="table-row" slot-scope="props">
            <span v-if="props.column.ltype === 'boolean'">
              <input
                v-if="props.row[props.column.field]"
                type="checkbox"
                disabled
                checked
              />
              <input v-else type="checkbox" disabled />
            </span>
            <span v-else>
              {{ props.formattedRow[props.column.field] }}
            </span>
          </template>
        </vue-good-table>
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
  name: 'PopupPaginationHeaderless',
  props: {
    id: { type: String, required: true, default: null },
    show: { type: Boolean, required: false, default: true },
    disabled: { type: Boolean, required: false, default: false },
    columns: { type: Array, required: false, default: () => [] },
    autoLoad: { type: Boolean, required: false, default: false },
    picker: { type: String, required: false, default: '' },
    filter: { type: Object, required: false, default: () => {} },
  },
  data() {
    return {
      isLoading: false,
      lcolumns: [],
      selectedRows: [],
      rows: [],
      totalRows: 0,
      alreadyFetchData: false,
      serverParams: {
        picker: this.picker,
        search: '',
        page: 1,
        perPage: 5,
      },
      columnClick: null,
      error: null,
    }
  },
  computed: {
    disabledButton() {
      return this.selectedRows.length === 0
    },
    _dataEmptyDescription() {
      return this.error
        ? 'Fail to fetch data, please try again'
        : this.alreadyFetchData
        ? 'No data available'
        : 'Click search to get data...'
    },
  },
  async created() {
    this._constractColumns()
    if (this.autoLoad) await this.fetchData()
  },
  methods: {
    metaData() {
      return {
        name: this._name,
        type: 'container',
        show: true,
      }
    },
    _constractColumns() {
      // Gunakan tempoarary colum, krn formatted data kita gax mau gunakan default
      for (const column of this.columns) {
        let lcolumn = { ...column, ltype: column.type }
        if (!lcolumn.type) lcolumn.type = 'text'

        if (lcolumn.type === 'text') {
          lcolumn = {
            formatFn: this._formatText,
            thClass: 'vgt-left-align text-sm',
            tdClass: 'vgt-left-align text-sm',
            ...lcolumn,
          }
          delete lcolumn.type
        }
        if (lcolumn.type === 'date') {
          lcolumn = {
            formatFn: this._formatDate,
            thClass: 'vgt-center-align text-sm',
            tdClass: 'vgt-center-align text-sm',
            ...lcolumn,
          }
          delete lcolumn.type
        }
        if (lcolumn.type === 'number') {
          lcolumn = {
            formatFn: this._formatNumber,
            thClass: 'vgt-right-align text-sm',
            tdClass: 'vgt-right-align text-sm',
            type: 'number',
            ...lcolumn,
          }
        }
        if (lcolumn.type === 'decimal') {
          lcolumn = {
            formatFn: this._formatDecimal,
            thClass: 'vgt-right-align text-sm',
            tdClass: 'vgt-right-align text-sm',
            type: 'number',
            ...lcolumn,
          }
        }
        if (lcolumn.type === 'percentage') {
          lcolumn = {
            formatFn: this._formatPercentage,
            thClass: 'vgt-right-align text-sm',
            tdClass: 'vgt-right-align text-sm',
            type: 'number',
            ...lcolumn,
          }
        }
        if (lcolumn.type === 'boolean') {
          lcolumn = {
            formatFn: this._formatBoolean,
            thClass: 'vgt-center-align text-sm',
            tdClass: 'vgt-center-align text-sm',
            ...lcolumn,
          }
          delete lcolumn.type
        }

        this.lcolumns.push(lcolumn)
      }
    },
    async fetchData(searchTerm = '') {
      this.error = null
      this.isLoading = true
      this.alreadyFetchData = true
      this.serverParams.page = 1
      this.serverParams.filter = this._cleanFilter()
      this.serverParams.search = searchTerm
      const { result, error } = await this.$rest.post(
        '/api/general/pagination/page',
        this.serverParams
      )
      if (result) {
        this.totalRows = result.totalRows
        this.rows = result.rows
      }
      this.error = error
      this.isLoading = false
    },
    _cleanFilter() {
      const filter = {}
      for (const [key, value] of Object.entries(this.filter)) {
        if (value) {
          filter[key] = value
        }
      }
      return filter
    },
    _onCellClick(params) {
      this.columnClick = params.column
    },
    _onRowClick(params) {
      if (this.columnClick) {
        this.$emit('RowClick', params)
      }
    },
    _formatText(value) {
      if (!value) return ''
      return value
    },
    _formatDate(value) {
      if (!value) return ''
      return this.$fmt.date(new Date(value), 'DD/MM/YYYY')
    },
    _formatNumber(value) {
      if (!value) return ''
      return this.$fmt.number(value)
    },
    _formatDecimal(value) {
      if (!value) return ''
      return this.$fmt.decimal(value, 2, 2)
    },
    _formatPercentage(value) {
      return this._formatDecimal(value) + ' %'
    },
    _formatBoolean(value) {
      return value ? 'Yes' : 'No'
    },
    _rowStyleClassFn(row) {
      // specific class berdasarkan data row
      return ''
    },
    async _onPageChange(params) {
      this.serverParams.page = params.currentPage
      await this.fetchData()
    },
    async _onSortChange(params) {
      this.serverParams.sort = params
      await this.fetchData()
    },
    async _onSearch(params) {
      this.serverParams.search = params.searchTerm
      await this.fetchData()
    },
  },
}
</script>
<style>
.vgt-table.striped tbody tr:nth-of-type(odd) {
  background-color: yellow !important;
}

.vgt-table th {
  padding: 0.35em 1.5em 0.35em 0.75em;
  vertical-align: middle;
  position: relative;
}

.vgt-wrap__footer {
  color: #606266;
  font-size: 0.9rem;
  padding: 0.35em;
  border: 1px solid #dcdfe6;
  background: linear-gradient(#f4f5f8, #f1f3f6);
}

.vgt-wrap__footer .footer__row-count__label {
  color: #606266;
  font-size: 0.9rem;
  font-weight: bold;
}

.vgt-wrap__footer .footer__navigation__page-btn {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: 0 0;
  border: none;
  text-decoration: none;
  color: #606266;
  font-weight: 700;
  white-space: nowrap;
  vertical-align: middle;
}

.page-info__label {
  color: #606266;
  font-size: 0.9rem;
  font-weight: bold;
}

.vgt-wrap__footer .footer__row-count__select {
  font-size: 0.9rem;
  background-color: transparent;
  width: auto;
  padding: 0;
  border: 0;
  border-radius: 0;
  height: auto;
  margin-left: 8px;
  color: #606266;
  font-weight: 700;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  padding-right: 15px;
  padding-left: 5px;
}

.vgt-wrap__footer .footer__navigation__info,
.vgt-wrap__footer .footer__navigation__page-info {
  font-size: 0.9rem;
  display: inline-block;
  margin: 0 16px;
}
.line-numbers {
  width: 586px;
}
</style>
