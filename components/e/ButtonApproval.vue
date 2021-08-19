<template>
  <EForm id="buttonApproval">
    <ELoading ref="loader" />
    <EConfirmation id="confirmation" ref="confirmation" positive="Yes" negative="No" />
    <EMessage id="message" ref="message" />
    <ETextArea id="remark" ref="remark" v-model="model.remark" label="Reason" :required="model.required" />
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
    uri: { type: String, required: true, default: 'Please Provide Data URI' },
    workflowId: { type: Number, required: false, default: null },
    disabled: { type: Function, required: false, default: null },
    back: { type: Function, required: false, default: null },
    approve: { type: Function, required: false, default: null },
    reject: { type: Function, required: false, default: null },
    delete: { type: Function, required: false, default: null },
  },
  data() {
    return {
      info: null,
      model: {
        required: false,
        remark: null,
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
    rendered(mode, info) {
      this.info = info
      this.disabled(true)
    },
    _back() {
      this.back({ from: 'approval' })
    },
    _approve() {
      this.model.required = false
      this.$refs.remark.clearError()

      this.$nextTick(() => {
        this._approval('A', 'approve', 'Approving')
      })
    },
    _reject() {
      this.model.required = true
      this.$nextTick(() => {
        const { valid } = this.$refs.remark.validate()
        if (valid) this._approval('R', 'reject', 'Rejecting')
      })
    },
    _delete() {
      this.model.required = true
      this.$nextTick(() => {
        const { valid } = this.$refs.remark.validate()
        if (valid) this._approval('D', 'delete', 'Deleting')
      })
    },
    async _approval(action, actionStr, description) {
      const { Yes } = await this.$refs.confirmation.confirm(`Are you sure want to ${actionStr} ? ${this.info}`)
      if (Yes) {
        this.$refs.loader.show(`${description} Data`)
        const { result, error } = await this.$rest.post(this.uri, { action, workflowId: this.workflowId, remark: this.model.remark })

        if (result) {
          await this.$refs.loader.success()
          await this.$refs.message.success(`Success ${description} Data ${this.info}`)
          this._back()
        }

        if (error) {
          await this.$refs.message.error(`Fail to ${description} Data ${this.info}`)
        }
      }
    },
  },
}
</script>
