<template>
  <div>
    <EPageLoader id="fetcher" ref="fetcher" label="Load Data" :fetcher="fetcher" @rendered="rendered">
      <detail ref="detail">
        <template #approval_reason>
          <ETextArea id="reason" v-model="reason" label="Reason" />
        </template>
        <template #approval_button="{ back, approve, reject, deletee }">
          <br />
          <ERight>
            <EButton id="buttonApprovalBack" label="Back" color="gray" @click="back" />
            <EButton id="buttonApprovalApprove" label="Approve" color="green" @click="approve" />
            <EButton id="buttonEntryReject" label="Reject" color="green" @click="reject" />
            <EButton id="buttonEntryDelete" label="Delete" color="green" @click="deletee" />
          </ERight>
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
      workflowId: null,
      reason: null,
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
      this.$refs.detail.disabled(true)

      // passing data hasil fetch ke server dari method fetcher
      if (this.result) this.$refs.detail.init(this.result)
    },
    back() {
      this.$refs.detail.back('approval')
    },
  },
}
</script>
