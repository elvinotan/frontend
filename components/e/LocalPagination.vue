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
          :columns="lcolumns"
          :rows="rows"
          :fixed-header="false"
          :line-numbers="true"
          :row-style-class="_rowStyleClassFn"
          :search-options="{ enabled: true, trigger: 'enter' }"
          :select-options="{
            enabled: buttons && buttons.length > 0,
            selectOnCheckboxOnly: true,
          }"
          :sort-options="{
            enabled: initialSortBy && initialSortBy.length > 0,
            multipleColumns: true,
            initialSortBy: initialSortBy,
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
          @on-select-all="_onSelected"
          @on-selected-rows-change="_onSelected"
          @on-cell-click="_onCellClick"
          @on-row-click="_onRowClick"
        >
          <div slot="emptystate" class="text-center">No data available</div>
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
            <span v-else-if="saveState && props.column.field === 'saved'">
              {{ saveState(props) ? 'Saved' : 'Not Saved' }}
            </span>
            <span v-else-if="props.column.type === 'boolean'">
              <input
                v-if="props.row[props.column.field]"
                type="checkbox"
                disabled
                checked
              />
              <input v-else type="checkbox" disabled />
            </span>
            <span v-else>
              {{ _renderCell(props) }}
            </span>
          </template>
          <div slot="table-actions" class="py-0.5 px-2">
            <EButton
              v-if="addNewData"
              :id="'LocalPagination' + id + 'AddNewData'"
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
                :id="'LocalPagination' + id + button.label"
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
  name: 'LocalPagination',
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
    rows: { type: Array, required: false, default: () => [] },
    actions: { type: Array, required: false, default: () => [] },
    disabledAction: {
      type: Function,
      required: false,
      default: () => {
        return false
      },
    },
    buttons: { type: Array, required: false, default: () => [] },
    initialSortBy: { type: Array, required: false, default: () => [] },
    addNewData: {
      type: Function,
      required: false,
      default: null,
    },
    saveState: {
      type: Function,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      lcolumns: [],
      selectedRows: [],
    }
  },
  computed: {
    disabledButton() {
      return this.selectedRows.length === 0
    },
  },
  created() {
    this._constractColumns()
    this._loadLookupGroups()
  },
  methods: {
    metaData() {
      return {
        name: this._name,
        type: 'container',
        show: true,
      }
    },
    _renderCell(props) {
      if (props.column.type === 'lookup') {
        const vuex = this.$rest.getVuex(
          this.$enum.VUEX.LOOKUP_PREFIX + props.column.reference
        )
        if (vuex && props.column.format) {
          props.formattedRow[props.column.field] = props.column.format(
            props,
            vuex
          )
        } else if (vuex) {
          const value = props.row[props.column.field]
          const selected = vuex.find(
            (lookup) => lookup.value + '' === value + ''
          )
          props.formattedRow[props.column.field] = selected
            ? selected.description
            : value
        }
      } else if (props.column.format) {
        props.formattedRow[props.column.field] = props.column.format(props)
      }

      return props.formattedRow[props.column.field]
    },
    async _loadLookupGroups() {
      const promise = []
      for (const column of this.columns) {
        if (column.type === 'lookup') {
          promise.push(
            this.$rest.get(`api/general/lookup/${column.reference}`, {
              vuex: this.$enum.VUEX.LOOKUP_PREFIX + column.reference,
            })
          )
        }
      }

      await Promise.all(promise)

      this.$forceUpdate()
    },
    _constractColumns() {
      if (this.saveState) {
        this.lcolumns.push({
          label: 'Saved',
          field: 'saved',
          width: '100px',
          thClass: 'vgt-center-align text-sm',
          tdClass: 'vgt-center-align text-sm',
          sortable: false,
        })
      }

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
        if (lcolumn.type === 'lookup') {
          lcolumn = {
            formatFn: this._formatText,
            thClass: 'vgt-left-align text-sm',
            tdClass: 'vgt-left-align text-sm',
            ...lcolumn,
          }
        }

        if (lcolumn.field !== 'action') this.lcolumns.push(lcolumn)
      }

      if (this.actions && this.actions.length > 0) {
        const actionColumn =
          this.columns.find((column) => column.field === 'action') || {}

        this.lcolumns.push({
          label: 'Action',
          field: 'action',
          width: '100px',
          thClass: 'vgt-center-align text-sm',
          tdClass: 'vgt-center-align text-sm',
          sortable: false,
          ...actionColumn,
        })
      }
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
  },
}
</script>
