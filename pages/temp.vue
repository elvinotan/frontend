<template>
  <div>
    {{ files }}
    <EUpload id="upload" ref="uploadAA" label="File Appraisal" :required="true" :disabled="false" :show="true" :max-file="5" :files="files" :on-load="onLoad" :on-add="onAdd" />
    <EButton id="save" ref="save" label="Save" @click="save" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      ui: {},
      files: [],
    }
  },
  methods: {
    onLoad(bean) {
      return bean.fileId
    },
    onAdd(bean) {
      return { fileId: bean.id, parentId: 12, active: true }
    },
    save() {
      this.$refs.uploadAA.validate()
    },
  },
}
</script>
