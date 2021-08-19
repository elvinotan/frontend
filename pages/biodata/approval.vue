<template>
  <div>
    <EPageLoader id="fetcher" ref="fetcher" label="Load Data" :fetcher="fetcher" @rendered="rendered">
      <detail ref="detail">
        <template #approval_button="{ disabled, back }">
          <EButtonApproval ref="buttons" :info="info" uri="/family/approval" :workflow-id="workflowId" :disabled="disabled" :back="back" />
        </template>
      </detail>
    </EPageLoader>
  </div>
</template>
<script>
import detail from './detail.vue'
export default {
  components: { detail }, // import component detail
  data() {
    return {
      info: null,
      workflowId: null,
      result: null,
    }
  },
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

    // Untuk workflow wajib memiliki param id dan workflow, id untuk tampilan data dan workflowId untuk action approval
    if (!param.id || !param.workflowId) throw new Error('Invalid Param, property is not exist')

    // Update breadcrum url
    this.$nav.breadcrumb('BN004')
  },
  methods: {
    async fetcher() {
      const param = this.$route.params
      this.workflowId = param.workflowId

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
      this.$nextTick(() => {
        if (this.result && this.$refs.buttons) this.$refs.buttons.rendered(this.result.mode, `[FamilyName=${this.result.name}]`)

        // passing data hasil fetch ke server dari method fetcher
        if (this.result && this.$refs.detail) this.$refs.detail.init(this.result)
      })
    },
  },
}
</script>
