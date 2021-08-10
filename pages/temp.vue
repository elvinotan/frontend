<template>
  <div>
    <EUpload id="upload" ref="uploadAA" label="File Appraisal" placeholder="File Input" :required="true" :disabled="false" :show="true" :max-file="3" />
    <EButton id="save" ref="save" label="Save" @click="save" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      ui: {},
    }
  },
  methods: {
    save() {
      this.$refs.uploadAA.validate()
    },
  },
}
</script>
