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
  components: { detail },
  created() {
    const param = this.$route.params

    // User langsung access page lewat browser url, param will be empty, redirected to list page
    if (!param.from) {
      this.$nav.to({ name: 'biodata-list' })
    }

    // Mau access biodata-entry, tapi tidak berasal dari biodata-list atau nanti dari approval, return error
    if (!['biodata-list'].includes(param.from)) throw new Error('Invalid Source Page')

    this.$nav.breadcrumb('BN003')
  },
  methods: {
    async fetcher() {
      const param = this.$route.params

      // Access ke biodata-entry tapi tidak ada opran id, ini artinya newDataFamily, ini valid return true
      if (!param.id) return true

      // Fetch data biodata
      const { result, error } = await this.$rest.get('/family/fetch', param.id)
      if (result) {
        this.result = result // simpan data
        return true
      }
      if (error) {
        this.$refs.fetcher.setInfo(error)
        return false
      }
    },
    back(onConfirm) {
      this.$refs.detail.back(onConfirm ? 'confirm' : 'save')
      if (onConfirm) {
        this.$refs.buttons.show('save', true)
        this.$refs.buttons.show('confirm', false)
      }
    },
    async save() {
      const valid = await this.$refs.detail.save()
      if (valid) {
        this.$refs.buttons.show('save', false)
        this.$refs.buttons.show('confirm', true)
      }
    },
    confirm() {
      this.$refs.detail.confirm()
    },
    rendered() {
      const param = this.$route.params
      if (param && param.view) {
        this.$refs.buttons.show('save', false)
        this.$refs.detail.disabled(true)
      }

      if (this.result) this.$refs.detail.init(this.result)
    },
  },
}
</script>
