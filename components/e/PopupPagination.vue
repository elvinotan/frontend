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
          @keyup.enter="_blur"
          @blur="_blur"
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
        <span
          v-if="!disabled"
          class="font-bold rounded-r text-sm text-center text-gray-800 w-7 p-1 cursor-pointer"
          :class="[_cssLabelBg]"
          @click="_clearInput"
        >
          X
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
const initColumns = [
  {
    label: 'Code',
    field: 'popupCode',
    sortable: true,
    width: '75px',
    tooltip: 'Code',
    type: 'text',
  },
  {
    label: 'Description',
    field: 'popupDescription',
    sortable: true,
    width: '150px',
    tooltip: 'Description',
    type: 'text',
  },
]
export default {
  name: 'PopupPagination',
  props: {
    id: { type: String, required: true, default: null },
    label: { type: String, required: false, default: '' },
    placeholder: { type: String, required: false, default: '' },
    required: { type: Boolean, required: false, default: false },
    maxlength: { type: Number, required: false, default: 4 },
    disabled: { type: Boolean, required: false, default: false },
    show: { type: Boolean, required: false, default: true },
    value: { type: String, required: false, default: '' },
    vruntime: { type: Function, required: false, default: null },

    picker: { type: String, required: true, default: '' },
    filter: {
      type: Object,
      required: false,
      default: () => {
        return {}
      },
    },
    columns: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  data() {
    return {
      lvalue: this.value,
      state: 0,
      errors: [],
      description: '',
      pagination: {
        show: false,
        picker: this.picker,
        filter: this.filter,
        columns: [...initColumns, ...this.columns],
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
  mounted() {
    this._fetchDataOne()
  },
  methods: {
    _clearInput() {
      this.lvalue = null
      this.$emit('input', this.lvalue)
      this.$nextTick(this.validate)
    },
    _rowClick({ row }) {
      if (row && row.popupCode) {
        this.pagination.show = false

        this.lvalue = row.popupCode
        this.$emit('input', this.lvalue)
        this.$nextTick(this._validate)
      } else {
        console.log(
          'WARNING !!!!, Pastikan hasil query mengembalikan popupCode dan popupDescription'
        )
      }
    },
    _showPopup() {
      if (this.disabled) return

      this.pagination.show = true

      const lvalue = this.lvalue ? this.lvalue.toUpperCase().trim() : null
      this.$refs[this.id + 'PopupPaginationHeaderless'].onSearch(lvalue)
    },
    _hidePopup() {
      this.pagination.show = false
    },
    _blur(event) {
      let lvalue = event.target.value.toUpperCase().trim()
      lvalue = lvalue || null
      this.$emit('input', lvalue)
      this.$emit(event.type, lvalue)
      this.$nextTick(this._validate)
    },
    async _fetchDataOne(event) {
      if (!this.value) return

      const lvalue = this.value.toUpperCase().trim()
      const { result } = await this.$rest.post(
        `api/general/pagination/popup`,
        {
          code: lvalue,
          picker: this.picker,
        },
        {
          vuex:
            this.$enum.VUEX.POPUPPAGINATION_PREFIX + this.picker + '_' + lvalue,
          saveFn: (result) => {
            return result.length === 1
          },
        }
      )

      if (result && result.length === 1) {
        this.description = result[0].popupDescription
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
    async validate() {
      this.$emit('input', this.lvalue)
      await this.$nextTick()
      return await this._validate()
    },
    async _validate() {
      this.clearError()

      // General validation base on props
      if (this.required && !this.value) {
        this.description = ''
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

      if (this.errors.length === 0 && this.value) {
        // lakukan validasi untuk code
        const { result, error } = await this.$rest.post(
          `api/general/pagination/popup`,
          {
            code: this.value,
            picker: this.picker,
          },
          {
            vuex:
              this.$enum.VUEX.POPUPPAGINATION_PREFIX +
              this.picker +
              '_' +
              this.value,
            saveFn: (result) => {
              return result.length === 1
            },
          }
        )

        if (error) {
          this.description = ''
          this.errors.push('Fail to validate code')
        }

        if (result) {
          if (result.length === 1) {
            // Success schenario
            this.description = result[0].popupDescription
          }
          if (result.length === 0) {
            this.description = ''
            this.$emit('input', null)
            this.errors.push(`Code ${this.value}, Data Not Found`)
          }
          if (result.length > 1) {
            this.description = ''
            this.$emit('input', null)
            this.errors.push(`Code ${this.value}, Multipe Data Found`)
          }
        }
      }

      const validation = { valid: !this.hasError(), errors: this.errors }
      this.state = validation.valid ? 1 : -1
      return validation
    },
  },
}
</script>
