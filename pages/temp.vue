<template>
  <div>
    <!--
    <EMultiUpload id="upload" ref="uploadAA" label="File Appraisal" :required="true" :disabled="false" :show="true" :max-file="5" :files="files" :on-load="onLoad" :on-add="onAdd" />
    -->
    {{ file }}
    <EUpload id="upload" ref="uploadAA" v-model="file.gnFileId" label="File Appraisal" :required="true" :disabled="false" :show="true" :max-file="5" />

    <EButton id="save" ref="save" label="Save" @click="save" />
    <EButton id="replace" ref="replace" label="Replace" @click="replace" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      ui: {},
      file: { gnFileId: 134, desc: 'KTP', parentId: 12 },
      files: [
        { gnFileId: 134, desc: 'KTP', parentId: 12 },
        { gnFileId: 135, desc: 'KK', parentId: 12 },
        { gnFileId: 136, desc: 'SIM', parentId: 12 },
      ],
    }
  },
  methods: {
    onLoad(bean) {
      return bean.gnFileId
    },
    onAdd(bean) {
      return { gnFileId: bean.id, parentId: 12, desc: 'VAKSIN' }
    },
    save() {
      this.$refs.uploadAA.validate()
    },
    replace() {
      this.file.gnFileId = 140
      this.files = [
        { gnFileId: 140, desc: 'KTP', parentId: 12 },
        { gnFileId: 141, desc: 'KK', parentId: 12 },
        { gnFileId: 142, desc: 'SIM', parentId: 12 },
      ]
    },
  },
}
</script>
