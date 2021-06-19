<template>
  <div>
    <div v-if="show">
      <span
        class="flex text-xs rounded border-0 outline-none ring-2"
        :class="[_cssBorder, _cssLabelBg]"
      >
        <span
          v-if="label"
          class="font-bold rounded-l text-sm text-gray-800 w-auto p-1"
          :class="[_cssLabelBg]"
        >
          {{ label ? label.replace(/\s/g, '&nbsp;') : '' }}
        </span>
        <span
          v-if="label && required"
          class="font-bold text-center text-sm text-red-800 w-auto p-1"
          :class="[_cssLabelBg]"
        >
          *
        </span>
        <input
          :id="id"
          v-model="lvalue"
          autocomplete="off"
          type="text"
          :placeholder="placeholder"
          :maxlength="maxlength"
          :disabled="disabled"
          :required="required"
          class="field text-sm p-1 px-1 outline-none w-16 uppercase placeholder-blueGray-300 relative"
          :class="[_cssRounded, _cssInputBg, _cssInputText]"
          @keyup.enter="_fetchDataOne"
        />
        <span
          class="font-bold text-center text-sm w-10 p-1 border-l-2 border-r-2"
          :class="[_cssBorderBox, _cssLabelBg, _cssCursor, _cssInputText]"
          @click="_showPopup"
        >
          ?
        </span>
        <span
          class="text-left w-full text-sm w-auto p-1 rounded-r"
          :class="[_cssLabelBg, _cssInputText]"
        >
          {{ description }}
        </span>
      </span>
      <p
        v-if="!pagination.show && hasError()"
        class="text-red-500 text-right text-xs italic"
      >
        {{ errors[0] }}
      </p>
      <p v-else-if="!pagination.show" class="text-right text-xs italic">
        {{ _info }}
      </p>
      <EPopupPaginationHeaderless
        :id="id + `PopupPaginationHeaderless`"
        :ref="id + `PopupPaginationHeaderless`"
        class="absolute overflow-hidden w-auto p-px z-10"
        :label="label"
        :columns="pagination.columns"
        :show="pagination.show"
        :disabled="false"
        :auto-load="false"
        :picker="pagination.picker"
        :filter="pagination.filter"
        @RowClick="_rowClick"
        @Close="_hidePopup"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: 'PopupPagination',
  props: {
    id: { type: String, required: true, default: null },
    label: { type: String, required: false, default: '' },
    picker: { type: String, required: false, default: '' },
    placeholder: { type: String, required: false, default: '' },
    required: { type: Boolean, required: false, default: false },
    maxlength: { type: Number, required: false, default: 4 },
    disabled: { type: Boolean, required: false, default: false },
    show: { type: Boolean, required: false, default: true },
    value: { type: String, required: false, default: '' },
    vruntime: { type: Function, required: false, default: null },
  },
  data() {
    return {
      lvalue: this.value,
      state: 0,
      errors: [],
      description: '',
      pagination: {
        show: false,
        picker: 'pagingCustomer',
        filter: {
          age: 12,
          birthDate: undefined,
          name: 'elvino',
        },
        columns: [
          {
            label: 'Code',
            field: 'code',
            sortable: false,
            width: '100px',
            tooltip: 'Tanggal Lahir Customer',
            type: 'text',
          },
          {
            label: 'Name',
            field: 'name',
            sortable: true,
            width: '150px',
            tooltip: 'Column Name',
            type: 'text',
          },
        ],
      },
    }
  },

  computed: {
    _cssRounded() {
      return this.label ? '' : 'rounded'
    },
    _cssBorder() {
      let css = 'ring-gray-500'
      if (this.state === 1) css = 'ring-green-500'
      if (this.state === -1) css = 'ring-red-500'
      return css
    },
    _cssBorderBox() {
      let css = 'border-gray-500'
      if (this.state === 1) css = 'border-green-500'
      if (this.state === -1) css = 'border-red-500'
      return css
    },
    _cssLabelBg() {
      let css = 'bg-gray-300'
      if (this.state === 1) css = 'bg-green-300'
      if (this.state === -1) css = 'bg-red-300'
      return css
    },
    _cssInputBg() {
      const css = this.disabled ? 'bg-gray-200' : 'bg-white'
      return css
    },
    _cssCursor() {
      const css = this.disabled ? 'cursor-not-allowed' : 'cursor-pointer'
      return css
    },
    _cssInputText() {
      const css = this.disabled ? 'text-gray-500' : 'text-gray-800'
      return css
    },
    _info() {
      return `${this.value ? this.value.length : 0} / ${this.maxlength} Char`
    },
  },
  watch: {
    value(newVal, oldVal) {
      this.lvalue = newVal
      this._fetchDataOne()
    },
  },
  mounted() {
    this._fetchDataOne()
  },
  methods: {
    _rowClick({ row }) {
      if (row && row.code) {
        this.lvalue = row.code
        this.description = row.codeDescription
        this.$emit('input', this.lvalue)
        this.$nextTick(this.validate)
        this.pagination.show = false
      }
    },
    _showPopup() {
      if (this.disabled) return
      this.pagination.show = true
      const lvalue = this.lvalue ? this.lvalue.toUpperCase().trim() : ''
      this.$refs[this.id + 'PopupPaginationHeaderless'].fetchData(lvalue)
    },
    _hidePopup() {
      if (this.disabled) return
      this.pagination.show = false
    },
    async _fetchDataOne(event) {
      if (!this.lvalue) return

      const lvalue = this.lvalue.toUpperCase().trim()
      const { result } = await this.$rest.post(`api/general/pagination/popup`, {
        code: lvalue,
        picker: this.picker,
      })

      if (result) {
        if (result.length === 0) {
          // Data tidak terdapat di db
          this.description = 'Data Not Found'
          this.$emit('input', null)
          this.$nextTick(this.validate)
          this._showPopup()
        }
        if (result.length === 1) {
          // Tepat Data terdapat di dalam db dan ukurannya 1
          this.description = result[0].codeDescription
          this.$emit('input', lvalue)
          this.$nextTick(this.validate)
          this._hidePopup()
        }
        if (result.length > 1) {
          this.description = 'Multipe Data Found'
          this.$emit('input', null)
          this.$nextTick(this.validate)
          this._showPopup()
        }
      }
    },
    metaData() {
      return {
        name: this._name,
        type: 'input',
        show: this.show,
      }
    },
    clearError() {
      this.state = 0
      this.errors = []
    },
    hasError() {
      return this.errors.length > 0
    },
    validate() {
      this.clearError()

      // General validation base on props
      if (this.required && !this.value) {
        this.errors.push(`${this.label} is required`)
      }
      if (this.value && this.value.length > this.maxlength) {
        this.errors.push(`${this.label} is exceeded`)
      }

      // add business runtime validation
      if (this.vruntime) {
        const error = this.vruntime(this.value)
        if (error) this.errors.push(error)
      }
      const validation = { valid: !this.hasError(), errors: this.errors }
      this.state = validation.valid ? 1 : -1
      return validation
    },
  },
}
</script>
