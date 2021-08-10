<template>
  <div>
    <input :ref="id + 'File'" type="file" style="display: none" @change="_change" />
    <ELocalPagination
      :id="id"
      :ref="id"
      :show="show"
      :label="_label"
      :disabled="disabled"
      :columns="columns"
      :rows="rows"
      :actions="[
        { label: 'Delete', emit: 'delete' },
        { label: 'Download', emit: 'download' },
        { label: 'Preview', emit: 'preview' },
      ]"
      :disabled-action="_disabledAction"
      :add-new-data="_browse"
      mode="multiupload"
      @delete="_delete"
      @download="_download"
      @preview="_preview"
    />
    <p v-if="hasError()" class="text-red-500 text-right text-xs italic">
      {{ errors[0] }}
    </p>
    <p v-else class="text-right text-xs italic">
      {{ _info }}
    </p>
    <EConfirmation :id="id + 'Confirmation'" :ref="id + 'Confirmation'" positive="Yes" negative="No" />
  </div>
</template>
<script>
// CONVERT = Process convert from binary to base64
// ONUPLOAD = Process upload file dari ui ke server
// UPLOADED = Process upload telah selesai dan kembali ke client
// UPLOADFAILED = Process upload file, gagal krn terjadi error

const fileType = 'image/jpeg image/jpg image/jpg application/pdf text/plain video/mp4'

export default {
  name: 'EMultiUpload',
  props: {
    id: { type: String, required: true, default: null },
    show: { type: Boolean, required: false, default: true },
    label: { type: String, required: false, default: 'Please Provide Table title...' },
    disabled: { type: Boolean, required: false, default: false },
    required: { type: Boolean, required: false, default: false },
    accept: { type: String, required: false, default: fileType }, // secara default accept all, kalo ada yang kurang tambahakan
    maxFile: { type: Number, required: false, default: 50 },
    maxSize: { type: Number, required: false, default: 5 },
    vruntime: { type: Function, required: false, default: null },
    files: {
      type: Array,
      required: false,
      default: () => {
        return []
      },
    },
    onLoad: { type: Function, required: false, default: null },
    onAdd: { type: Function, required: false, default: null },
  },
  data() {
    return {
      columns: [
        { label: 'File Name', field: 'name', sortable: true, width: '200px', tooltip: 'Name of File', type: 'string' },
        { label: 'Type', field: 'type', sortable: true, width: '100px', tooltip: 'Type of File', type: 'string' },
        {
          label: 'Size',
          field: 'size',
          sortable: true,
          width: '100px',
          tooltip: 'Size of File',
          type: 'number',
          format: (bean) => {
            return this.$fmt.decimal(this._sizeInMB(bean.row.size)) + ' MB'
          },
        },
        { label: 'Persist', field: 'persist', sortable: true, width: '100px', tooltip: 'Persist of File', type: 'string' },
        { label: 'State', field: 'state', sortable: true, width: '100px', tooltip: 'State of File', type: 'string' },
      ],
      rows: [],
      state: 0,
      errors: [],
    }
  },
  computed: {
    _label() {
      const supportedFile = fileType === this.accept ? 'Ext: All File Supported' : 'Ext' + this.accept
      const maxSizeFile = 'Maximum Size ' + this.maxSize + ' MB'
      return this.label + (this.required ? ' * ' : ' ') + '(' + supportedFile + ', ' + maxSizeFile + ')'
    },
    _info() {
      return `${this.rows.length} / ${this.maxFile} Files`
    },
  },
  async mounted() {
    if (this.onLoad) {
      for (const file of this.files) {
        const fileId = this.onLoad(file)
        const { result } = await this.$rest.get(`/file/fetch/${fileId}`)
        if (result) {
          result.file = file
          result.state = 'UPLOADED'
          this.rows.push(result)
        }
      }
    }
  },
  methods: {
    _disabledAction(label, data) {
      if (label.emit === 'delete') {
        return !['UPLOADED', 'UPLOADFAILED'].includes(data.row.state)
      }
      if (label.emit === 'download') {
        return !['UPLOADED'].includes(data.row.state)
      }
      if (label.emit === 'preview') {
        return !['UPLOADED'].includes(data.row.state) || !'image/jpeg image/jpg image/jpg'.includes(data.row.type.toLowerCase())
      }
      return false
    },
    _sizeInMB(size) {
      return size / 1048576
    },
    async _delete(bean) {
      const { Yes } = await this.$refs[this.id + 'Confirmation'].confirm(`Are you sure want to delete file ${bean.row.name} ?`)
      if (Yes) {
        // Agax jadul cara untuk dapaet index, tp emang sengaja aku sgt hati hati sekali dlm delete data
        let selectedIndex = null
        const selectedJson = JSON.stringify(bean.row.file)
        for (let i = 0; i < this.files.length; i++) {
          const fileJson = JSON.stringify(this.files[i])
          if (selectedJson === fileJson) {
            // eslint-disable-next-line no-unused-vars
            selectedIndex = i
            break
          }
        }

        if (selectedIndex !== null) {
          // eslint-disable-next-line vue/no-mutating-props
          this.files.splice(selectedIndex, 1)
        }

        this.$refs[this.id].remove()
        this.validate()
      }
    },
    _download() {
      alert('Download File (UnderConstraction)')
    },
    _preview() {
      alert('Preview File (UnderConstraction)')
    },
    _browse() {
      if (this.rows.length < this.maxFile) {
        this.$refs[this.id + 'File'].click()
      } else {
        this.addError(`${this.label}, exceeded maximum file upload`)
      }
    },
    _change(event) {
      this.clearError()
      const selectedFile = event.target.files[0]
      if (!selectedFile) return

      // File DataType tidak boleha kosong
      if (!selectedFile.type) {
        this.addError('Unknown File dataType ' + selectedFile.name)
        return
      }

      // Tipe Data harus yng di support selain itu tidak boleah masuk
      if (!this.accept.toLowerCase().includes(selectedFile.type.toLowerCase())) {
        this.addError('Unsupported dataType ' + selectedFile.type)
        return
      }

      // Validasi ukuran file
      if (this._sizeInMB(selectedFile.size) > this.maxSize) {
        this.addError('Exceeded maximum file size')
        return
      }

      this._createBase64Image(selectedFile)
    },
    _createBase64Image(fileObject) {
      const fileRaw = {
        id: undefined,
        name: fileObject.name,
        size: fileObject.size,
        type: fileObject.type,
        lastModifiedDate: fileObject.lastModifiedDate,
        persist: 'DETACH',
        state: 'CONVERT',
      }
      this.$refs[this.id].addOrReplace(fileRaw)

      const reader = new FileReader()
      reader.onload = (e) => {
        const file = {
          content: e.target.result,
          ...fileRaw,
        }

        fileRaw.state = 'ONUPLOAD'
        this.$rest.post('/file/save', file).then(({ result, error }) => {
          if (result) {
            fileRaw.id = result.id
            fileRaw.state = 'UPLOADED'
            fileRaw.file = this.onAdd(fileRaw)
            // eslint-disable-next-line vue/no-mutating-props
            this.files.push(fileRaw.file)
          }
          if (error) {
            fileRaw.state = 'UPLOADFAILED'
          }
        })
      }
      reader.readAsDataURL(fileObject)
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
    addError(errors = []) {
      this.clearError()
      const errs = this.$object.isString(errors) ? [errors] : errors

      this.state = -1
      this.errors = this.errors.concat(errs)
    },
    validate() {
      this.clearError()
      // General validation base on props
      if (this.required && this.rows.length <= 0) {
        this.errors.push(`${this.label} is required`)
      }

      if (this.rows && this.rows.length > this.maxFile) {
        this.errors.push(`${this.label}, exceeded maximum file upload`)
      }

      // add business runtime validation
      if (this.vruntime) {
        const error = this.vruntime(this.rows)
        if (error) this.errors.push(error)
      }
      const validation = { valid: !this.hasError(), error: this.errors }
      this.state = validation.valid ? 1 : -1
      return validation
    },
  },
}
</script>
