<template>
  <div>
    <detail ref="detail" />
    <ETextArea id="reason" v-model="reason" label="Reason" />
    <EButtonApproval ref="buttons" @approve="approve" @reject="reject" @delete="deletee" />
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
  mounted() {
    this.$refs.detail.disabled(true)
  },
  methods: {
    approve() {
      this.$refs.detail.approve(this.reason)
    },
    reject() {
      this.$refs.detail.reject(this.reason)
    },
    deletee() {
      this.$refs.detail.delete(this.reason)
    },
  },
}
</script>
