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
  name: 'EButtonEntry',
  props: {
    disabled: { type: Function, required: false, default: null },
    back: { type: Function, required: false, default: null },
    save: { type: Function, required: false, default: null },
    confirm: { type: Function, required: false, default: null },
  },
  data() {
    return {
      showBack: true,
      showSave: true,
      showConfirm: false,
    }
  },
  methods: {
    metaData() {
      return {
        name: this._name,
        type: 'container',
        show: true,
      }
    },
    show(name, condition) {
      if (name === 'back') this.showBack = condition
      if (name === 'save') this.showSave = condition
      if (name === 'confirm') this.showConfirm = condition
    },
    rendered(mode) {
      if (mode === 'view') {
        // dari sisi list, melakukan oper view=true, artinya detail di tampilkan dgn mode view Only
        this.showSave = true
        this.disabled(true)
      }

      if (mode === 'edit') {
        // do ntohting krn secara default sudah benar
      }
    },
    _back() {
      if (this.back) {
        this.back(this.showConfirm ? { from: 'entry-confirm' } : { from: 'entry-save' })
        if (this.showConfirm) {
          this.showSave = true
          this.showConfirm = false
        }
      }
    },
    async _save() {
      if (this.save) {
        const valid = await this.save({})
        if (valid) {
          this.showSave = false
          this.showConfirm = true
        }
      }
    },
    _confirm() {
      if (this.confirm) this.confirm({})
    },
  },
}
</script>
