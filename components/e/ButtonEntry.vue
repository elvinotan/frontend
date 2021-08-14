<template>
  <EForm id="buttonEntry">
    <ERight>
      <EButton v-if="showBack" id="buttonEntryBack" label="Back" color="gray" @click="_back" />
      <EButton v-if="showSave" id="buttonEntrySave" label="Save" color="green" @click="_save" />
      <EButton v-if="showConfirm" id="buttonEntryConfirm" label="Confirm" color="green" @click="_confirm" />
    </ERight>
  </EForm>
</template>
<script>
export default {
  data() {
    return {
      showBack: true,
      showSave: true,
      showConfirm: false,
    }
  },
  methods: {
    show(name, condition) {
      if (name === 'back') this.showBack = condition
      if (name === 'save') this.showSave = condition
      if (name === 'confirm') this.showConfirm = condition
    },
    _back() {
      this.$emit('back', this.showConfirm)
    },
    _save() {
      this.$emit('save')
    },
    _confirm() {
      this.$emit('confirm')
    },
  },
}
</script>
