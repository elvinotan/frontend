<template>
  <EForm id="buttonApproval">
    <ETextArea id="reason" ref="reason" v-model="model.reason" label="Reason" :required="model.required" />
    <br />
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
  name: 'EButtonApproval',
  props: {
    workflowId: { type: Number, required: false, default: null },
    disabled: { type: Function, required: false, default: null },
    back: { type: Function, required: false, default: null },
    approve: { type: Function, required: false, default: null },
    reject: { type: Function, required: false, default: null },
    delete: { type: Function, required: false, default: null },
  },
  data() {
    return {
      model: {
        required: false,
        reason: null,
      },
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
    rendered(mode) {
      this.disabled(true)
    },
    _back() {
      this.back({ from: 'approval' })
    },
    _approve() {
      this.model.required = false
      this.$refs.reason.clearError()
      this.$nextTick(() => {
        this.approve({ workflowId: this.workflowId, reason: this.model.reason })
      })
    },
    _reject() {
      this.model.required = true
      this.$nextTick(() => {
        const { valid } = this.$refs.reason.validate()
        if (valid) {
          this.reject({ workflowId: this.workflowId, reason: this.model.reason })
        }
      })
    },
    _delete() {
      this.model.required = true
      this.$nextTick(() => {
        const { valid } = this.$refs.reason.validate()
        if (valid) {
          this.delete({ workflowId: this.workflowId, reason: this.model.reason })
        }
      })
    },
  },
}
</script>
