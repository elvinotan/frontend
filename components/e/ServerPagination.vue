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
          :id="id"
          mode="remote"
          :is-loading.sync="isLoading"
          :total-rows="totalRows"
          :columns="lcolumns"
          :rows="rows"
          :fixed-header="false"
          :line-numbers="true"
          :row-style-class="_rowStyleClassFn"
          :search-options="{
            enabled: true,
            trigger: 'enter',
          }"
          :select-options="{
            enabled: buttons && buttons.length > 0,
            selectOnCheckboxOnly: true,
          }"
          :sort-options="{
            enabled: true,
            multipleColumns: true,
          }"
          :pagination-options="{
            enabled: true,
            mode: 'pages',
            perPage: 10,
            position: 'bottom',
            perPageDropdown: [10, 20, 30],
            dropdownAllowAll: false,
            setCurrentPage: 1,
            nextLabel: 'Next',
            prevLabel: 'Prev',
            rowsPerPageLabel: 'Rows per page',
            ofLabel: 'of',
            pageLabel: 'Page', // for 'pages' mode
            allLabel: 'All',
          }"
          style-class="vgt-table striped bordered condensed"
          @on-search="_onSearch"
          @on-page-change="_onPageChange"
          @on-sort-change="_onSortChange"
          @on-per-page-change="_onPerPageChange"
          @on-select-all="_onSelected"
          @on-selected-rows-change="_onSelected"
          @on-cell-click="_onCellClick"
          @on-row-click="_onRowClick"
        >
          <div slot="emptystate" class="text-center">
            {{ _dataEmptyDescription }}
          </div>
          <template slot="table-row" slot-scope="props">
            <span v-if="props.column.field === 'action'">
              <span v-for="(action, index) of actions" :key="action.field">
                <button
                  v-if="disabled || disabledAction(action, props)"
                  class="font-bold opacity-50 cursor-not-allowed"
                  disabled
                >
                  {{ action.label }}
                </button>
                <button
                  v-else
                  class="font-bold"
                  @click="
                    $emit(action.emit ? action.emit : action.label, props)
                  "
                >
                  {{ action.label }}
                </button>
                {{ index === actions.length - 1 ? '' : '&nbsp;|' }}
              </span>
            </span>
            <span v-else-if="props.column.ltype === 'boolean'">
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
          <div slot="table-actions" class="py-0.5 px-2">
            <EButton
              v-if="addNewData"
              :id="'ServerPagination' + id + 'AddNewData'"
              label="Add New Data"
              :disabled="disabled"
              @click="addNewData"
            />
          </div>
          <div
            v-if="buttons && buttons.length > 0"
            slot="table-actions-bottom"
            class="py-1.5 px-2 flex justify-start space-x-5"
          >
            <span v-for="button of buttons" :key="button.label">
              <EButton
                :id="'ServerPagination' + id + button.label"
                :label="button.label"
                :disabled="disabled || disabledButton"
                :color="button.color"
                @click="
                  $emit(button.emit ? button.emit : button.label, selectedRows)
                "
              />
            </span>
          </div>
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

// Ini dokumentasi untuk pembuatan actions
// - label = Label Action
// - emit = label akan menjadi emit event

// Ini dokumentasi untuk pembuatan Button
// - label = Label Action
// - emit = label akan menjadi emit event

// Ini dokumentasi untuk initialSortBy
// - field = nama field di object
// - type = asc dan desc
export default {
  name: 'ServerPagination',
  props: {
    id: { type: String, required: true, default: null },
    show: { type: Boolean, required: false, default: true },
    label: {
      type: String,
      required: true,
      default: 'Please Provide Table title...',
    },
    disabled: { type: Boolean, required: false, default: false },
    columns: { type: Array, required: false, default: () => [] },
    autoLoad: { type: Boolean, required: false, default: false },
    picker: { type: String, required: false, default: '' },
    actions: { type: Array, required: false, default: () => [] },
    buttons: { type: Array, required: false, default: () => [] },
    initialSortBy: { type: Array, required: false, default: () => [] },
    filter: {
      type: Object,
      required: false,
      default: () => {
        return {}
      },
    },
    disabledAction: {
      type: Function,
      required: false,
      default: () => {
        return false
      },
    },
    addNewData: {
      type: Function,
      required: false,
      default: null,
    },
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
        perPage: 10,
        sort: this.initialSortBy,
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

      if (this.actions && this.actions.length > 0) {
        this.lcolumns.push({
          label: 'Action',
          field: 'action',
          width: '100px',
          thClass: 'vgt-center-align text-sm',
          tdClass: 'vgt-center-align text-sm',
          sortable: false,
        })
      }
    },
    async fetchData() {
      // TODO Ambil search yang ada Seach component di atas, agar saat click search on filter, search text ke bawa
      this.error = null
      this.isLoading = true
      this.alreadyFetchData = true
      this.serverParams.filter = this._cleanFilter()
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
        if (this.columnClick.field === 'action') {
          // Do nothing, krn ini column action, bisa ke trigger 2 kali, bila action ke click
        } else {
          this.$emit('RowClick', params)
        }
      }
    },
    _onSelected(params) {
      this.selectedRows = params.selectedRows
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
    async _onPerPageChange(params) {
      this.serverParams.perPage = params.currentPerPage
      await this.fetchData()
    },
    async _onSearch(params) {
      this.serverParams.search = params.searchTerm
      await this.fetchData()
    },
  },
}
</script>
