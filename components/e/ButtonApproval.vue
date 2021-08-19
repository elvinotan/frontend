<template>
  <EForm id="buttonEntry">
    <ERight>
      <EButton v-if="showBack" id="buttonApprovalBack" label="Back" color="gray" @click="_back" />
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
      showBack: true,
      showApprove: true,
      showReject: true,
      showDelete: true,
    }
  },
  methods: {
    show(name, condition) {
      if (name === 'back') this.showBack = condition
      if (name === 'approve') this.showApprove = condition
      if (name === 'reject') this.showReject = condition
      if (name === 'delete') this.showDelete = condition
    },
    _back() {
      this.$emit('back')
    },
    _approve() {
      this.$emit('approve')
    },
    _reject() {
      this.$emit('reject')
    },
    _delete() {
      this.$emit('deletee')
    },
  },
}
</script>
