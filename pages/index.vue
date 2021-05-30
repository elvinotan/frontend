<template>
  <div>
    <ETabs id="Component" :labels="tabs" selected-tab="Text">
      <EForm id="Text">
        <EText
          id="TextComponent"
          ref="TextComponent"
          v-model="text.value"
          :label="text.label"
          :placeholder="text.placeholder"
          :type="text.type"
          :required="text.required"
          :disabled="text.disabled"
          :show="text.show"
          :vruntime="text.vruntime"
        />
        <div class="text-xs">Template : {{ htmlText }}</div>
        <br />
        <div class="text-xs">Data Object : {{ text }}</div>
        <br />
        <table>
          <thead>
            <tr>
              <td>Props</td>
              <td>Try</td>
              <td>Type</td>
              <td>Required</td>
              <td>Default</td>
              <td>Description</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>id</td>
              <td>-</td>
              <td>String</td>
              <td>true</td>
              <td>null</td>
              <td>id dari component, gax perlu di binding</td>
            </tr>
            <tr>
              <td>label</td>
              <td><input v-model="text.label" type="text" /></td>
              <td>String</td>
              <td>false</td>
              <td>''</td>
              <td>
                Label untuk Text Input, bila tidak di bind maka sign * tidak di
                tampilkan
              </td>
            </tr>
            <tr>
              <td>placeholder</td>
              <td><input v-model="text.placeholder" type="text" /></td>
              <td>String</td>
              <td>false</td>
              <td>''</td>
              <td>Place holder input, akan tampil bila data kosong</td>
            </tr>
            <tr>
              <td>type</td>
              <td>
                <select v-model="text.type">
                  <option value="short">short</option>
                  <option value="medium">medium</option>
                  <option value="long">long</option>
                  <option value="extralong">extralong</option>
                </select>
              </td>
              <td>String</td>
              <td>false</td>
              <td>short</td>
              <td>
                Type dari Text Input untuk menentukan panjang character yg bisa
                di terima. Terdapat berberapa tipe ( short=16, medium=32,
                long=64, extralong=128 ), silakan customize sesuai kebutuhan
              </td>
            </tr>
            <tr>
              <td>required</td>
              <td><input v-model="text.required" type="checkbox" /></td>
              <td>Boolean</td>
              <td>false</td>
              <td>false</td>
              <td>
                Boolean untuk menentukan required atau tidak text, error message
                akan otomatis terisi bila kosong, default:false
              </td>
            </tr>
            <tr>
              <td>disabled</td>
              <td><input v-model="text.disabled" type="checkbox" /></td>
              <td>Boolean</td>
              <td>false</td>
              <td>false</td>
              <td>
                Boolean untuk menentukan disabled atau tidaknya component,
                default:false
              </td>
            </tr>
            <tr>
              <td>show</td>
              <td><input v-model="text.show" type="checkbox" /></td>
              <td>Boolean</td>
              <td>false</td>
              <td>true</td>
              <td>
                Boolean untuk menentukan component tambil atau tidak, defaut:
                true, tag ini menggunakan v-if
              </td>
            </tr>
            <tr>
              <td>value</td>
              <td><input v-model="text.value" type="input" /></td>
              <td>String</td>
              <td>false</td>
              <td>''</td>
              <td>
                Two way data binding, saat ini data yang di input dalam bentuk
                upprcase, customize sesuai kebutuhan
              </td>
            </tr>
            <tr>
              <td>vruntime</td>
              <td>Function Callback</td>
              <td>Function</td>
              <td>false</td>
              <td>null</td>
              <td>OnType runtime validation, test ketik GAGAL untuk mencoba</td>
            </tr>
          </tbody>
        </table>
        <br />
        <table>
          <thead>
            <tr>
              <td>Method</td>
              <td>Try</td>
              <td>Result</td>
              <td>Description</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>metaData</td>
              <td>
                <button @click="metaData('TextComponent')">Click</button>
              </td>
              <td>{{ metadata }}</td>
              <td>Component Information</td>
            </tr>
            <tr>
              <td>clearError</td>
              <td>
                <button @click="clearError('TextComponent')">Click</button>
              </td>
              <td>Void</td>
              <td>Hapus error, kembalikan ke state component semula</td>
            </tr>
            <tr>
              <td>hasError</td>
              <td>
                <button @click="hasError('TextComponent')">Click</button>
              </td>
              <td>{{ haserror }}</td>
              <td>
                Flag untuk menandakan apakah component pass validasi atau tidak
              </td>
            </tr>
            <tr>
              <td>validate</td>
              <td>
                <button @click="validate('TextComponent')">Click</button>
              </td>
              <td>{{ valid }}</td>
              <td>Lakukan validasi berdasarkan required dan vruntime</td>
            </tr>
          </tbody>
        </table>
      </EForm>
    </ETabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      htmlText:
        '<EText id="" ref="" v-model="" :label="" :placeholder="" :type="" :required="" :disabled="" :show="" />',
      haserror: null,
      metadata: null,
      valid: null,
      tabs: [
        { label: 'Text' },
        { label: 'Password' },
        { label: 'TextArea' },
        { label: 'Button' },
        { label: 'Number' },
        { label: 'Decimal' },
        { label: 'Date' },
        { label: 'Time' },
        { label: 'Checkbox' },
        { label: 'Boolean' },
        { label: 'Select' },
        { label: 'LocalPagination' },
        { label: 'ServerPagination' },
        { label: 'Dialog' },
        { label: 'Loading' },
        { label: 'Message' },
        { label: 'Confirmation' },
        { label: 'Card' },
        { label: 'Tabs' },
        { label: 'PageLoader' },
        { label: 'Form' },
        { label: 'Col' },
      ],
      text: {
        label: 'Full Name',
        placeholder: 'Placeholder',
        type: 'short',
        required: true,
        disabled: false,
        show: true,
        value: '',
        vruntime: (data) => {
          if (data === 'GAGAL') return 'Tidak boleah input GAGAL'
        },
      },
    }
  },
  methods: {
    clearError(ref) {
      this.$refs[ref].clearError()
    },
    metaData(ref) {
      this.metadata = this.$refs[ref].metaData()
    },
    validate(ref) {
      this.valid = this.$refs[ref].validate()
    },
    hasError(ref) {
      this.haserror = this.$refs[ref].hasError()
    },
  },
}
</script>
<style scoped>
table,
th,
td {
  border: 1px solid black;
}
</style>
