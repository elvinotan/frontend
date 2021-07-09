<template>
  <div>
    <div v-if="show">
      <div class="text-xs rounded border-0 outline-none ring-2 ring-gray-500 bg-white">
        <vue-good-table
          :id="id"
          mode="remote"
          :is-loading.sync="isLoading"
          :total-rows="totalRows"
          :columns="lcolumns"
          :rows="rows"
          :line-numbers="true"
          :row-style-class="_rowStyleClassFn"
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
          @on-page-change="_onPageChange"
          @on-sort-change="_onSortChange"
          @on-cell-click="_onCellClick"
          @on-row-click="_onRowClick"
        >
          <div slot="emptystate" class="text-center">
            {{ _dataEmptyDescription }}
          </div>
          <div slot="table-actions" class="py-0.5 px-2">
            <ECol :col="2">
              <span class="flex w-full text-xs rounded border-0 outline-none ring-2" :class="[_cssBorder]">
                <input :id="id + 'SearchTerm'" v-model="search" autocomplete="off" type="text" :maxlength="4" class="field w-full text-sm rounded p-1 px-1 w-auto outline-none uppercase placeholder-blueGray-300 relative" @keyup.enter="_onSearch" />
              </span>
              <ECol :col="2">
                <EButton :id="'PopupPaginationHeaderless' + id + 'Search'" label="Search" @click="_onSearch" />
                <EButton :id="'PopupPaginationHeaderless' + id + 'Close'" label="Close" @click="_onClose" />
              </ECol>
            </ECol>
          </div>
          <template slot="table-row" slot-scope="props">
            <span v-if="props.column.type === 'boolean'">
              <input v-if="props.row[props.column.field]" type="checkbox" disabled checked />
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
export default {
  name: 'EPopupPaginationHeaderless',
  props: {
    id: { type: String, required: true, default: null },
    show: { type: Boolean, required: false, default: true },
    columns: { type: Array, required: false, default: () => [] },
    picker: { type: String, required: false, default: '' },
    filter: {
      type: Object,
      required: false,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {
      isLoading: false,
      lcolumns: [],
      selectedRows: [],
      rows: [],
      totalRows: 0,
      search: '',
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
    _cssBorder() {
      let css = 'ring-gray-500'
      if (this.state === 1) css = 'ring-green-500'
      if (this.state === -1) css = 'ring-red-500'
      return css
    },
    _dataEmptyDescription() {
      return this.error ? 'Fail to fetch data, please try again' : 'No data available'
    },
  },
  created() {
    this._constractColumns()
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
        let lcolumn = { type: 'text', ...column }

        if (lcolumn.type === 'text') {
          lcolumn = {
            formatFn: this._formatText,
            thClass: 'vgt-left-align text-sm',
            tdClass: 'vgt-left-align text-sm',
            ...lcolumn,
          }
        }
        if (lcolumn.type === 'date') {
          lcolumn = {
            formatFn: this._formatDate,
            thClass: 'vgt-center-align text-sm',
            tdClass: 'vgt-center-align text-sm',
            ...lcolumn,
          }
        }
        if (lcolumn.type === 'number') {
          lcolumn = {
            formatFn: this._formatNumber,
            thClass: 'vgt-right-align text-sm',
            tdClass: 'vgt-right-align text-sm',
            ...lcolumn,
          }
        }
        if (lcolumn.type === 'decimal') {
          lcolumn = {
            formatFn: this._formatDecimal,
            thClass: 'vgt-right-align text-sm',
            tdClass: 'vgt-right-align text-sm',
            ...lcolumn,
          }
        }
        if (lcolumn.type === 'percentage') {
          lcolumn = {
            formatFn: this._formatPercentage,
            thClass: 'vgt-right-align text-sm',
            tdClass: 'vgt-right-align text-sm',
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
        }

        this.lcolumns.push(lcolumn)
      }
    },
    async fetchData() {
      this.error = null
      this.isLoading = true
      this.serverParams.filter = this._cleanFilter()

      const { result, error } = await this.$rest.post('/api/general/pagination/page', this.serverParams)

      this.isLoading = false
      this.error = error
      if (result) {
        this.totalRows = result.totalRows
        this.rows = result.rows
      }
    },
    async onSearch(search = '', page = 1) {
      this.search = search
      this.serverParams.page = page

      await this._onSearch()
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
    async _onSearch() {
      this.serverParams.search = this.search ? this.search.toUpperCase().trim() : this.search
      await this.fetchData()
    },
    _onClose() {
      this.$emit('Close')
      this.rows = []
    },
  },
}
</script>
