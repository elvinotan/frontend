<template>
  <div>
    <EPageLoader id="fetcher" ref="fetcher" label="Load Data" :fetcher="fetcher" @rendered="rendered">
      <detail ref="detail" />
      <ETextArea id="reason" v-model="reason" label="Reason" />
      <EButtonApproval ref="buttons" @approve="approve" @reject="reject" @delete="deletee" />
    </EPageLoader>
  </div>
</template>
<script>
import detail from './detail.vue'
export default {
  components: { detail },
  data() {
    return {
      reason: null,
    }
  },
  methods: {
    async fetcher() {
      const param = this.$route.params

      // User langsung access page lewat browser url, param will be empty, redirected to list page
      if (!param.from) {
        this.$nav.to({ name: 'biodata-list' })
        return false
      }

      // Mau access biodata-entry, tapi tidak berasal dari biodata-list atau nanti dari approval, return error
      if (!['familyList'].includes(param.from)) return false

      // Access ke biodata-entry tapi tidak ada opran id, ini artinya newDataFamily, ini valid return true
      if (!param.id) return true

      this.workflowId = param.workflowId

      // Fetch data biodata
      const { result, error } = await this.$rest.get(`/family/fetch/${param.id}`)
      if (result) {
        this.result = result // simpan data
        return true
      }
      if (error) return false
    },
    approve() {
      this.$refs.detail.approve(this.workflowId, this.reason)
    },
    reject() {
      this.$refs.detail.reject(this.workflowId, this.reason)
    },
    deletee() {
      this.$refs.detail.delete(this.workflowId, this.reason)
    },
    rendered() {
      this.$refs.detail.disabled(true)
      if (this.result) this.$refs.detail.init(this.result)
    },
  },
}
</script>
