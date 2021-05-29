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
          :id="id"
          :columns="lcolumns"
          :rows="rows"
          :fixed-header="true"
          :line-numbers="true"
          :row-style-class="rowStyleClassFn"
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
          @on-select-all="onSelected"
          @on-selected-rows-change="onSelected"
          @on-row-click="
            (params) => {
              $emit('RowClick', params)
            }
          "
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
                  @click="$emit(action.label, props)"
                >
                  {{ action.label }}
                </button>
                {{ index === actions.length - 1 ? '' : '&nbsp;|' }}
              </span>
            </span>
            <span v-else-if="saveState && props.column.field === 'saved'">
              {{ saveState(props) ? 'Saved' : 'Not Saved' }}
            </span>
            <span v-else>
              {{ props.formattedRow[props.column.field] }}
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
                @click="$emit(button.label, selectedRows)"
              />
            </span>
          </div>
        </vue-good-table>
        <div
          class="font-bold rounded-b text-sm text-gray-800 w-auto p-1 bg-gray-300"
        >
          &nbsp;
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
    saveState: {
      type: Function,
      required: false,
      default: null,
    },
    columns: { type: Array, required: false, default: () => [] },
    rows: { type: Array, required: false, default: () => [] },
    actions: { type: Array, required: false, default: () => [] },
    buttons: { type: Array, required: false, default: () => [] },
    initialSortBy: { type: Array, required: false, default: () => [] },
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
  },
  methods: {
    _constractColumns() {
      if (this.saveState) {
        this.lcolumns.push({
          label: 'Saved',
          field: 'saved',
          thClass: 'vgt-center-align text-sm',
          tdClass: 'vgt-center-align text-sm',
          sortable: false,
        })
      }

      // Gunakan tempoarary colum, krn formatted data kita gax mau gunakan default
      for (const column of this.columns) {
        let lcolumn = { ...column }
        if (!lcolumn.type) lcolumn.type = 'text'

        if (lcolumn.type === 'text') {
          lcolumn = {
            formatFn: this.formatText,
            thClass: 'vgt-left-align text-sm',
            tdClass: 'vgt-left-align text-sm',
            ...lcolumn,
          }
          delete lcolumn.type
        }
        if (lcolumn.type === 'date') {
          lcolumn = {
            formatFn: this.formatDate,
            thClass: 'vgt-center-align text-sm',
            tdClass: 'vgt-center-align text-sm',
            ...lcolumn,
          }
          delete lcolumn.type
        }
        if (lcolumn.type === 'number') {
          lcolumn = {
            formatFn: this.formatNumber,
            thClass: 'vgt-right-align text-sm',
            tdClass: 'vgt-right-align text-sm',
            type: 'number',
            ...lcolumn,
          }
        }
        if (lcolumn.type === 'decimal') {
          lcolumn = {
            formatFn: this.formatDecimal,
            thClass: 'vgt-right-align text-sm',
            tdClass: 'vgt-right-align text-sm',
            type: 'number',
            ...lcolumn,
          }
        }
        if (lcolumn.type === 'percentage') {
          lcolumn = {
            formatFn: this.formatPercentage,
            thClass: 'vgt-right-align text-sm',
            tdClass: 'vgt-right-align text-sm',
            type: 'number',
            ...lcolumn,
          }
        }
        if (lcolumn.type === 'boolean') {
          lcolumn = {
            formatFn: this.formatBoolean,
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
          thClass: 'vgt-center-align text-sm',
          tdClass: 'vgt-center-align text-sm',
          sortable: false,
        })
      }
    },
    onSelected(params) {
      this.selectedRows = params.selectedRows
    },
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
      // specific class berdasarkan data row
      return ''
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
