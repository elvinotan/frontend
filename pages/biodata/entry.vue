<template>
  <div>
    <EPageLoader id="fetcher" ref="fetcher" label="Load Data" :fetcher="fetcher" @rendered="rendered">
      <detail ref="detail" />
      <EButtonEntry ref="buttons" @back="back" @save="save" @confirm="confirm" />
    </EPageLoader>
  </div>
</template>
<script>
import detail from './detail.vue'

export default {
  components: { detail }, // import component detail
  created() {
    // Numpang lifecycle dari vue created, bagian ini di gunakan untuk melakukan validasi, asal request page
    const param = this.$route.params

    // User langsung access page lewat browser url, param will be empty, redirected to list page
    if (!param.from) {
      this.$nav.to({ name: 'biodata-list' })
      return
    }

    // Mau access biodata-entry, tapi tidak berasal dari biodata-list atau nanti dari approval, return error
    if (!['biodata-list'].includes(param.from)) throw new Error('Invalid Source Page')

    // Update breadcrum url
    this.$nav.breadcrumb('BN003')
  },
  methods: {
    async fetcher() {
      const param = this.$route.params

      // Access ke biodata-entry tapi tidak ada opran id, ini artinya newDataFamily, ini valid return true
      if (!param.id) return true

      // Fetch data family
      const { result, error } = await this.$rest.get('/family/fetch', param.id)
      if (result) {
        this.result = result // simpan data di tempoarary variable, nanti saat rendered akan di panggil
        return true
      }
      if (error) {
        this.$refs.fetcher.setInfo(error)
        return false
      }
    },
    rendered() {
      const param = this.$route.params
      if (param && param.view) {
        // dari sisi list, melakukan oper view=true, artinya detail di tampilkan dgn mode view Only
        this.$refs.buttons.show('save', false)
        this.$refs.detail.disabled(true)
      }

      // passing data hasil fetch ke server dari method fetcher
      if (this.result) this.$refs.detail.init(this.result)
    },
    back(onConfirm) {
      // onConfirm => artinya action di trigger oleh mode confirm
      // update state back, button back hanya 1 jadi akan byk if nya
      this.$refs.detail.back(onConfirm ? 'confirm' : 'save')
      if (onConfirm) {
        // Update button state
        this.$refs.buttons.show('save', true)
        this.$refs.buttons.show('confirm', false)
      }
    },
    async save() {
      const valid = await this.$refs.detail.save()
      if (valid) {
        // Update button state
        this.$refs.buttons.show('save', false)
        this.$refs.buttons.show('confirm', true)
      }
    },
    confirm() {
      this.$refs.detail.confirm()
    },
  },
}
</script>
