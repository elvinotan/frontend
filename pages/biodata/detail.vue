<template>
  <ECard ref="customerEntry" label="Bio Data Keluarga">
    <!-- Hidden Component -->
    <ELoading ref="loader" />
    <EConfirmation id="confirmation" ref="confirmation" positive="Yes" negative="No" />
    <EMessage id="message" ref="message" />

    <ECol :gap-y="3">
      <!-- Validator Message -->
      <EInformation ref="information" label="Error Entry" />

      <!-- Card simulation -->
      <ECard ref="simulation" label="Simulation">
        <ELeft>
          <EButton id="fillFamilyHelper" ref="fillFamilyHelper" label="Fill Data Family" color="green" @click="_fillNewFamilyData" />
          <EButton id="resetFamilyHelper" ref="resetFamilyHelper" label="Reset Data Family" color="green" @click="_resetNewFamilyData" />
        </ELeft>
      </ECard>

      <!-- Model Parent -->
      <ECol :col="2">
        <ECard ref="father" label="Ayah">
          <ECol>
            <ECol :col="2">
              <EText id="fatherName" ref="fatherName" v-model="model.father.name" label="Nama Ayah" placeholder="Input Nama Ayah" type="short" :required="ui.father.name.required" :disabled="ui.father.name.disabled" :show="ui.father.name.show" />
              <ENumber id="fatherNik" ref="fatherNik" v-model="model.father.nik" label="NIK" placeholder="Input NIK" type="short" :required="ui.father.nik.required" :disabled="ui.father.nik.disabled" :show="ui.father.nik.show" />
            </ECol>
            <ECol :col="3">
              <ELookup id="fatherSex" ref="fatherSex" v-model="model.father.sexId" label="Jenis Kelamin" placeholder="Input Jenis Kelamin" :required="ui.father.sexId.required" :disabled="ui.father.sexId.disabled" :show="ui.father.sexId.show" lookup-group="DEMO_SEX" />
              <EText id="fatherBirthPlace" ref="fatherBirthOfPlace" v-model="model.father.placeOfBirth" label="Tempat Lahir" placeholder="Input Tempat Lahir" type="short" :required="ui.father.placeOfBirth.required" :disabled="ui.father.placeOfBirth.disabled" :show="ui.father.placeOfBirth.show" />
              <EDate id="fatherBirthDate" ref="fatherBirthOfDate" v-model="model.father.dateOfBirth" label="Tgl Lahir" :required="ui.father.dateOfBirth.required" :disabled="ui.father.dateOfBirth.disabled" :show="ui.father.dateOfBirth.show" />
            </ECol>
            <ECol :col="3">
              <ELookup id="fatherReligion" ref="fatherReligion" v-model="model.father.religionId" label="Agama" placeholder="Input Agama" :required="ui.father.religionId.required" :disabled="ui.father.religionId.disabled" :show="ui.father.religionId.show" lookup-group="DEMO_RELIGION" />
              <ELookup id="fatherEducation" ref="fatherEducation" v-model="model.father.educationId" label="Pendidikan" placeholder="Input Pendidikan" :required="ui.father.educationId.required" :disabled="ui.father.educationId.disabled" :show="ui.father.educationId.show" lookup-group="DEMO_EDUCATION" />
              <ELookup id="fatherJob" ref="fatherJob" v-model="model.father.jobId" label="Pekerjaan" placeholder="Input Perkerjaan" :required="ui.father.jobId.required" :disabled="ui.father.jobId.disabled" :show="ui.father.jobId.show" lookup-group="DEMO_JOB" />
            </ECol>
          </ECol>
        </ECard>
        <ECard ref="mother" label="Ibu">
          <ECol>
            <ECol :col="2">
              <EText id="motherName" ref="motherName" v-model="model.mother.name" label="Nama Ibu" placeholder="Input Nama Ibu" type="short" :required="ui.mother.name.required" :disabled="ui.mother.name.disabled" :show="ui.mother.name.show" />
              <ENumber id="motherNik" ref="motherNik" v-model="model.mother.nik" label="NIK" placeholder="Input NIK" type="short" :required="ui.mother.nik.required" :disabled="ui.mother.nik.disabled" :show="ui.mother.nik.show" />
            </ECol>
            <ECol :col="3">
              <ELookup id="motherSex" ref="motherSex" v-model="model.mother.sexId" label="Jenis Kelamin" placeholder="Input Jenis Kelamin" :required="ui.mother.sexId.required" :disabled="ui.mother.sexId.disabled" :show="ui.mother.sexId.show" lookup-group="DEMO_SEX" />
              <EText id="motherBirthPlace" ref="motherBirthOfPlace" v-model="model.mother.placeOfBirth" label="Tempat Lahir" placeholder="Input Tempat Lahir" type="short" :required="ui.mother.placeOfBirth.required" :disabled="ui.mother.placeOfBirth.disabled" :show="ui.mother.placeOfBirth.show" />
              <EDate id="motherBirthDate" ref="motherBirthOfDate" v-model="model.mother.dateOfBirth" label="Tgl Lahir" :required="ui.mother.dateOfBirth.required" :disabled="ui.mother.dateOfBirth.disabled" :show="ui.mother.dateOfBirth.show" />
            </ECol>
            <ECol :col="3">
              <ELookup id="motherReligion" ref="motherReligion" v-model="model.mother.religionId" label="Agama" placeholder="Input Agama" :required="ui.mother.religionId.required" :disabled="ui.mother.religionId.disabled" :show="ui.mother.religionId.show" lookup-group="DEMO_RELIGION" />
              <ELookup id="motherEducation" ref="motherEducation" v-model="model.mother.educationId" label="Pendidikan" placeholder="Input Pendidikan" :required="ui.mother.educationId.required" :disabled="ui.mother.educationId.disabled" :show="ui.mother.educationId.show" lookup-group="DEMO_EDUCATION" />
              <ELookup id="motherJob" ref="motherJob" v-model="model.mother.jobId" label="Pekerjaan" placeholder="Input Perkerjaan" :required="ui.mother.jobId.required" :disabled="ui.mother.jobId.disabled" :show="ui.mother.jobId.show" lookup-group="DEMO_JOB" />
            </ECol>
          </ECol>
        </ECard>
      </ECol>

      <!-- Model Children -->
      <ELocalPagination
        id="children"
        ref="children"
        label="Anak-anak"
        :show="ui.children.table.show"
        :disabled="ui.children.table.disabled"
        :columns="[
          { label: 'Name', field: 'name', sortable: true, width: '200px', tooltip: 'Nama', type: 'string' },
          { label: 'Nik', field: 'nik', sortable: true, width: '100px', tooltip: 'NIK', type: 'number' },
          { label: 'Jenis Kelamin', field: 'sexId', sortable: true, width: '100px', tooltip: 'Jenis Kelamin', type: 'lookup', reference: 'DEMO_SEX' },
          { label: 'Tempat Lahir', field: 'placeOfBirth', sortable: true, width: '100px', tooltip: 'Tempat Lahir', type: 'string' },
          { label: 'Tgl Lahir', field: 'dateOfBirth', sortable: true, width: '100px', tooltip: 'Tgl Lahir', type: 'date' },
          { label: 'Agama', field: 'religionId', sortable: true, width: '100px', tooltip: 'Agama', type: 'lookup', reference: 'DEMO_RELIGION' },
          { label: 'Pendidikan', field: 'educationId', sortable: true, width: '100px', tooltip: 'Pendidikan', type: 'lookup', reference: 'DEMO_EDUCATION' },
          { label: 'Pekerjaan', field: 'jobId', sortable: true, width: '100px', tooltip: 'Pekerjaan', type: 'lookup', reference: 'DEMO_JOB' },
          { label: 'KTP', field: 'docId', sortable: false, width: '100px', tooltip: 'KTP', type: 'file', maxSize: 2, accept: 'image/jpeg' },
          { field: 'action', width: '200px' },
        ]"
        :actions="[
          { label: 'Delete', emit: 'removeChildren' },
          { label: 'Edit', emit: 'editChildren' },
        ]"
        :disabled-action="() => {}"
        :add-new-data="addChildren"
        :save-state="saveStateChildren"
        :rows="model.children"
        :buttons="[]"
        :initial-sort-by="[]"
        @RowClick="() => {}"
        @removeChildren="removeChildren"
        @editChildren="editChildren"
      />
      <EMultiUpload
        id="document"
        ref="document"
        label="Dokumen"
        :required="ui.document.table.required"
        :disabled="ui.document.table.disabled"
        :show="ui.document.table.show"
        :max-file="5"
        :max-size="5"
        :files="model.document"
        :on-load="
          (document) => {
            return document.fileId
          }
        "
        :on-add="
          (gnFile) => {
            return {
              familyId: null,
              fileId: gnFile.id,
            }
          }
        "
        accept="image/jpeg image/jpg application/pdf"
      />
    </ECol>

    <!-- Button Slot -->
    <slot name="entry_button" :disabled="disabled" :back="back" :save="save" :confirm="confirm" />
    <slot name="approval_button" :disabled="disabled" :back="back" :approve="approve" :reject="reject" :deletee="deletee" />

    <!-- Entry Dialog -->
    <EDialog id="childrenDlg" ref="childrenDlg" title="Tambah Anak" :width="800" :height="400" :buttons="[{ label: 'Simpan', emit: 'saveChild', color: 'green' }]" @saveChild="saveChild">
      <ECol>
        <ECol :col="2">
          <EText id="childName" ref="childName" v-model="child.name" label="Nama Anak" placeholder="Input Nama Anak" type="short" :required="ui.dialog.name.required" :disabled="ui.dialog.name.disabled" :show="ui.dialog.name.show" />
          <ENumber id="childNik" ref="childNik" v-model="child.nik" label="NIK" placeholder="Input NIK" type="short" :required="ui.dialog.nik.required" :disabled="ui.dialog.nik.disabled" :show="ui.dialog.nik.show" />
          <ELookup id="childSex" ref="childSex" v-model="child.sexId" label="Jenis Kelamin" placeholder="Input Jenis Kelamin" :required="ui.dialog.sexId.required" :disabled="ui.dialog.sexId.disabled" :show="ui.dialog.sexId.show" lookup-group="DEMO_SEX" />
          <EText id="childBirthPlace" ref="childBirthPlace" v-model="child.placeOfBirth" label="Tempat Lahir" placeholder="Input Tempat Lahir" type="short" :required="ui.dialog.placeOfBirth.required" :disabled="ui.dialog.placeOfBirth.disabled" :show="ui.dialog.placeOfBirth.show" />
          <EDate id="childBirthDate" ref="childBirthDate" v-model="child.dateOfBirth" label="Tgl Lahir" :required="ui.dialog.dateOfBirth.required" :disabled="ui.dialog.dateOfBirth.disabled" :show="ui.dialog.dateOfBirth.show" />
          <ELookup id="childReligion" ref="childReligion" v-model="child.religionId" label="Agama" placeholder="Input Agama" :required="ui.dialog.religionId.required" :disabled="ui.dialog.religionId.disabled" :show="ui.dialog.religionId.show" lookup-group="DEMO_RELIGION" />
          <ELookup id="childEducation" ref="childEducation" v-model="child.educationId" label="Pendidikan" placeholder="Input Pendidikan" :required="ui.dialog.educationId.required" :disabled="ui.dialog.educationId.disabled" :show="ui.dialog.educationId.show" lookup-group="DEMO_EDUCATION" />
          <ELookup id="childJob" ref="childJob" v-model="child.jobId" label="Pekerjaan" placeholder="Input Perkerjaan" :required="ui.dialog.jobId.required" :disabled="ui.dialog.jobId.disabled" :show="ui.dialog.jobId.show" lookup-group="DEMO_JOB" />
        </ECol>
        <EUpload id="childDoc" ref="childDoc" v-model="child.docId" label="KTP" :required="ui.dialog.docId.required" :disabled="ui.dialog.docId.disabled" :show="ui.dialog.docId.show" :max-size="2" accept="image/jpeg" />
      </ECol>
    </EDialog>
  </ECard>
</template>
<script>
const uiProps = {
  name: { required: true, disabled: false, show: true },
  nik: { required: true, disabled: false, show: true },
  sexId: { required: true, disabled: false, show: true },
  placeOfBirth: { required: true, disabled: false, show: true },
  dateOfBirth: { required: true, disabled: false, show: true },
  religionId: { required: true, disabled: false, show: true },
  educationId: { required: true, disabled: false, show: true },
  jobId: { required: true, disabled: false, show: true },
}
const empty = {
  id: null,
  name: null,
  nik: null,
  sexId: null,
  placeOfBirth: null,
  dateOfBirth: null,
  religionId: null,
  educationId: null,
  jobId: null,
}

export default {
  name: 'Entry',
  data() {
    return {
      ui: {
        father: this.$object.clone(uiProps),
        mother: this.$object.clone(uiProps),
        children: { table: { required: true, disabled: false, show: true } },
        document: { table: { required: true, disabled: false, show: true } },
        dialog: { ...this.$object.clone(uiProps), docId: { required: true, disabled: false, show: true } },
      },
      child: this.$object.clone(empty),
      model: {
        id: null,
        name: null,
        enabled: null,
        father: { id: null, name: null, nik: null, sexId: null, placeOfBirth: null, dateOfBirth: null, religionId: null, educationId: null, jobId: null },
        mother: { id: null, name: null, nik: null, sexId: null, placeOfBirth: null, dateOfBirth: null, religionId: null, educationId: null, jobId: null },
        children: [],
        document: [],
      },
    }
  },
  created() {
    const param = this.$route.params
    // User langsung access page lewat browser url, param will be empty, redirected to list page
    if (!param.from) {
      this.$nav.to({ name: 'biodata-list' })
      return
    }

    this.model.father.sexId = 19
    this.model.mother.sexId = 18
    this.ui.father.sexId.disabled = true
    this.ui.mother.sexId.disabled = true
  },
  methods: {
    // INI METHOD UNTUK ENTRY MAIN PAGE
    init(result) {
      this.model = this.deconstruct(result)
    },
    disabled(condition) {
      this.$wrapper.disabled([this.ui.father, this.ui.mother, this.ui.children, this.ui.document], condition)
      if (!condition) {
        this.ui.father.sexId.disabled = true
        this.ui.mother.sexId.disabled = true
      }
    },
    async save() {
      const { valid } = this.$wrapper.validate(this.$refs.customerEntry)
      if (valid) {
        // Do validate server
        this.$refs.loader.show('Validation')
        const { result, error } = await this.$rest.post('/family/validate', this.constract())

        if (result) {
          this.disabled(true)
          this.$refs.loader.success()
          return true
        }

        if (error) {
          this.disabled(false)
          this.handleRestError(error)
        }
      }
    },
    async confirm() {
      this.$refs.loader.show('Saving Data Family')
      const { result, error } = await this.$rest.post('/family/save', this.constract())

      if (result) {
        this.model = this.deconstruct(result)
        await this.$refs.loader.success()

        await this.$refs.message.success('Success Save Data Family')
        this.$nav.to({ name: 'biodata-list' })
      }

      if (error) {
        this.handleRestError(error)
      }
    },
    approve({ workflowId, reason }) {
      alert('Approve ' + workflowId + ', with reason=' + reason)
    },
    reject({ workflowId, reason }) {
      alert('Reject ' + workflowId + ', with reason=' + reason)
    },
    deletee({ workflowId, reason }) {
      alert('Delete ' + workflowId + ', with reason=' + reason)
    },
    back({ from }) {
      if (from === 'entry-save') {
        this.$nav.to({ name: 'biodata-list' })
      }
      if (from === 'entry-confirm') {
        this.disabled(false)
      }
      if (from === 'approval') {
        this.$nav.to({ name: 'biodata-list' })
      }
    },
    handleRestError(error) {
      this.$refs.loader.fail()

      for (const err of error) {
        if (err.type === 'FIELD' && this.$refs[err.field]) {
          this.$refs[err.field].addError([err.message])
        }
      }

      this.$refs.information.addRestError(error)
    },
    saveStateChildren(prop) {
      return !!prop.row.id
    },
    async removeChildren(props) {
      const { Yes } = await this.$refs.confirmation.confirm(`Are you sure want to remove ${props.row.name} ?`)
      if (Yes) this.$refs.children.remove()
    },
    constract() {
      return {
        id: this.model.id,
        name: this.model.name,
        enabled: this.model.enabled,
        parent: [
          { ...this.model.father, type: 'F' },
          { ...this.model.mother, type: 'M' },
        ],
        children: [...this.model.children],
        document: [...this.model.document],
      }
    },
    deconstruct(result) {
      const father = result.parent.find((p) => p.type === 'F')
      const mother = result.parent.find((p) => p.type === 'M')
      return { id: result.id, name: result.name, enabled: result.enabled, father, mother, children: result.children, document: result.document }
    },

    // INI METHOD UNTUK ENTRY DIALOG
    addChildren() {
      this.child = { ...this.$object.clone(empty), docId: null }
      this.$refs.childrenDlg.open()
    },
    editChildren(props) {
      this.$refs.childrenDlg.open()
      this.child = this.$object.clone(props.row)
    },
    saveChild() {
      const { valid, errors } = this.$wrapper.validate(this.$refs.childrenDlg)
      if (valid) {
        this.$refs.children.addOrReplace(this.child)
        this.$refs.childrenDlg.close()
      } else {
        console.log('errors ', errors)
      }
    },

    // INI METHOD HELPER SAJA
    _fillNewFamilyData() {
      this.model.id = null
      this.model.name = 'Unknown Family'
      this.model.enabled = false

      this.model.father.id = null
      this.model.father.name = 'Elvino'
      this.model.father.nik = 123456
      this.model.father.sexId = 19
      this.model.father.placeOfBirth = 'Bogor'
      this.model.father.dateOfBirth = '1978-09-19'
      this.model.father.religionId = 16
      this.model.father.educationId = 1
      this.model.father.jobId = 10

      this.model.mother.id = null
      this.model.mother.name = 'Carinnia'
      this.model.mother.nik = 654321
      this.model.mother.sexId = 18
      this.model.mother.placeOfBirth = 'Jakarta'
      this.model.mother.dateOfBirth = '1979-09-26'
      this.model.mother.religionId = 15
      this.model.mother.educationId = 2
      this.model.mother.jobId = 9

      this.model.children = []
      this.model.children.push({
        id: null,
        name: 'Constantine',
        nik: 162534,
        sexId: 19,
        placeOfBirth: 'Jakarta',
        dateOfBirth: '2007-03-26',
        religionId: 15,
        educationId: 5,
        jobId: 11,
        docId: null,
      })
    },
    _resetNewFamilyData() {
      this.model = {
        id: null,
        name: null,
        enabled: null,
        father: { id: null, name: null, nik: null, sexId: 19, placeOfBirth: null, dateOfBirth: null, religionId: null, educationId: null, jobId: null },
        mother: { id: null, name: null, nik: null, sexId: 18, placeOfBirth: null, dateOfBirth: null, religionId: null, educationId: null, jobId: null },
        children: [],
      }
      // await this.$rest.delay(100)
      this.$nextTick(() => {
        this.$wrapper.clearError(this.$refs.customerEntry)
      })
    },
    elvino() {
      console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
      console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
      console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
      console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
    },
  },
}
</script>
