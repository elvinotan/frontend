<template>
  <EForm id="buttonEntry">
    <ERight>
      <EButton v-if="showApprove" id="buttonApprovalApprove" label="Approve" color="green" @click="_approve" />
      <EButton v-if="showReject" id="buttonEntryReject" label="Reject" color="green" @click="_reject" />
      <EButton v-if="showDelete" id="buttonEntryDelete" label="Delete" color="green" @click="_delete" />
    </ERight>
  </EForm>
</template>
<script>
export default {
  data() {
    return {
      showApprove: true,
      showReject: true,
      showDelete: true,
    }
  },
  methods: {
    show(name, condition) {
      if (name === 'approve') this.showApprove = condition
      if (name === 'reject') this.showReject = condition
      if (name === 'delete') this.showDelete = condition
    },
    _approve() {
      this.$emit('approve')
    },
    _reject() {
      this.$emit('reject')
    },
    _delete() {
      this.$emit('delete')
    },
  },
}
</script>
