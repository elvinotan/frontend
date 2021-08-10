<template>
  <div>
    <input :ref="id + 'File'" type="file" style="display: none" @change="_change" />
    <ELocalPagination
      :id="id"
      :ref="id"
      :show="show"
      :label="label"
      :disabled="disabled"
      :columns="columns"
      :rows="rows"
      :actions="[
        { label: 'Delete', emit: 'delete' },
        { label: 'Download', emit: 'download' },
        { label: 'Preview', emit: 'preview' },
      ]"
      :add-new-data="_browse"
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
  </div>
</template>
<script>
// CONVERT = Process convert from binary to base64
// ONUPLOAD = Process upload file dari ui ke server
// UPLOADED = Process upload telah selesai dan kembali ke client
// UPLOADFAILED = Process upload file, gagal krn terjadi error
export default {
  name: 'EUpload',
  props: {
    id: { type: String, required: true, default: null },
    show: { type: Boolean, required: false, default: true },
    label: { type: String, required: true, default: 'Please Provide Table title...' },
    disabled: { type: Boolean, required: false, default: false },
    required: { type: Boolean, required: false, default: false },
    accept: { type: String, required: false, default: 'image/jpeg image/jpg image/jpg application/pdf' }, // secara default accept all, kalo ada yang kurang tambahakan
    maxFile: { type: Number, required: false, default: 50 },
    vruntime: { type: Function, required: false, default: null },
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
          format(bean) {
            return bean.row.size / 1048576
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
    _info() {
      return `${this.rows.length} / ${this.maxFile} Files`
    },
  },
  async mounted() {
    await this.$rest.delay(10)
    this.$refs.upload.renameAddNewData('Browse')
  },
  methods: {
    _delete() {
      alert('Delete file')
    },
    _download() {
      alert('Download file')
    },
    _preview() {
      alert('Preview file')
    },
    _browse() {
      this.$refs[this.id + 'File'].click()
    },
    _change(event) {
      const selectedFile = event.target.files[0]
      this._createBase64Image(selectedFile)
    },
    _createBase64Image(fileObject) {
      const fileRaw = {
        id: undefined,
        name: fileObject.name,
        size: fileObject.size,
        type: fileObject.type,
        reference: new Date().getTime(),
        lastModifiedDate: fileObject.lastModifiedDate,
        persist: 'DETACH',
        state: 'CONVERT',
      }
      this.rows.push(fileRaw)

      const reader = new FileReader()
      reader.onload = (e) => {
        const file = {
          content: e.target.result,
          ...fileRaw,
        }

        fileRaw.state = 'ONUPLOAD'
        this.$rest.post('/file/save', file).then(({ result, error }) => {
          if (result) {
            fileRaw.state = 'UPLOADED'
          }
          if (error) {
            fileRaw.state = 'UPLOADFAILED'
          }
        })
      }
      reader.readAsDataURL(fileObject)
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
      if (this.required && this.rows.length <= 0) {
        this.errors.push(`${this.label} is required`)
      }

      if (this.rows && this.rows.length > this.maxFile) {
        this.errors.push(`${this.label} is exceeded maximum file upload`)
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
