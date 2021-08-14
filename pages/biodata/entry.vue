<template>
  <div>
    <detail ref="detail" />
    <EButtonEntry ref="buttons" @back="back" @save="save" @confirm="confirm" />
  </div>
</template>
<script>
import detail from './detail.vue'
export default {
  components: { detail },
  methods: {
    back(onConfirm) {
      this.$refs.detail.back(onConfirm)
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
  },
}
</script>
