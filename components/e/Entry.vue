<template>
  <ECard ref="customerEntry" label="Bio Data Keluarga">
    <ELoading ref="loader" />

    <ECol :gap-y="3">
      <!-- Validator Message -->
      <EInformation ref="information" label="Error Entry" />

      <!-- Card simulation -->
      <ECard ref="simulation" label="Simulation">
        <ELeft>
          <EButton id="fillFamilyHelper" ref="fillFamilyHelper" label="Fill Data Family" color="green" @click="fillNewFamilyData" />
          <EButton id="resetFamilyHelper" ref="resetFamilyHelper" label="Reset Data Family" color="green" @click="resetNewFamilyData" />
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
              <ELookup id="fatherSex" ref="fatherSex" v-model="model.father.sex" label="Jenis Kelamin" placeholder="Input Jenis Kelamin" :required="ui.father.sex.required" :disabled="ui.father.sex.disabled" :show="ui.father.sex.show" lookup-group="SEX" />
              <EText id="fatherBirthPlace" ref="fatherBirthOfPlace" v-model="model.father.placeOfBirth" label="Tempat Lahir" placeholder="Input Tempat Lahir" type="short" :required="ui.father.placeOfBirth.required" :disabled="ui.father.placeOfBirth.disabled" :show="ui.father.placeOfBirth.show" />
              <EDate id="fatherBirthDate" ref="fatherBirthOfDate" v-model="model.father.dateOfBirth" label="Tgl Lahir" :required="ui.father.dateOfBirth.required" :disabled="ui.father.dateOfBirth.disabled" :show="ui.father.dateOfBirth.show" />
            </ECol>
            <ECol :col="3">
              <ELookup id="fatherReligion" ref="fatherReligion" v-model="model.father.religion" label="Agama" placeholder="Input Agama" :required="ui.father.religion.required" :disabled="ui.father.religion.disabled" :show="ui.father.religion.show" lookup-group="RELIGION" />
              <ELookup id="fatherEducation" ref="fatherEducation" v-model="model.father.education" label="Pendidikan" placeholder="Input Pendidikan" :required="ui.father.education.required" :disabled="ui.father.education.disabled" :show="ui.father.education.show" lookup-group="EDUCATION" />
              <ELookup id="fatherJob" ref="fatherJob" v-model="model.father.job" label="Pekerjaan" placeholder="Input Perkerjaan" :required="ui.father.job.required" :disabled="ui.father.job.disabled" :show="ui.father.job.show" lookup-group="JOB" />
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
              <ELookup id="motherSex" ref="motherSex" v-model="model.mother.sex" label="Jenis Kelamin" placeholder="Input Jenis Kelamin" :required="ui.mother.sex.required" :disabled="ui.mother.sex.disabled" :show="ui.mother.sex.show" lookup-group="SEX" />
              <EText id="motherBirthPlace" ref="motherBirthOfPlace" v-model="model.mother.placeOfBirth" label="Tempat Lahir" placeholder="Input Tempat Lahir" type="short" :required="ui.mother.placeOfBirth.required" :disabled="ui.mother.placeOfBirth.disabled" :show="ui.mother.placeOfBirth.show" />
              <EDate id="motherBirthDate" ref="motherBirthOfDate" v-model="model.mother.dateOfBirth" label="Tgl Lahir" :required="ui.mother.dateOfBirth.required" :disabled="ui.mother.dateOfBirth.disabled" :show="ui.mother.dateOfBirth.show" />
            </ECol>
            <ECol :col="3">
              <ELookup id="motherReligion" ref="motherReligion" v-model="model.mother.religion" label="Agama" placeholder="Input Agama" :required="ui.mother.religion.required" :disabled="ui.mother.religion.disabled" :show="ui.mother.religion.show" lookup-group="RELIGION" />
              <ELookup id="motherEducation" ref="motherEducation" v-model="model.mother.education" label="Pendidikan" placeholder="Input Pendidikan" :required="ui.mother.education.required" :disabled="ui.mother.education.disabled" :show="ui.mother.education.show" lookup-group="EDUCATION" />
              <ELookup id="motherJob" ref="motherJob" v-model="model.mother.job" label="Pekerjaan" placeholder="Input Perkerjaan" :required="ui.mother.job.required" :disabled="ui.mother.job.disabled" :show="ui.mother.job.show" lookup-group="JOB" />
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
          { label: 'Jenis Kelamin', field: 'sex', sortable: true, width: '100px', tooltip: 'Jenis Kelamin', type: 'lookup', reference: 'SEX' },
          { label: 'Tempat Lahir', field: 'placeOfBirth', sortable: true, width: '100px', tooltip: 'Tempat Lahir', type: 'string' },
          { label: 'Tgl Lahir', field: 'dateOfBirth', sortable: true, width: '100px', tooltip: 'Tgl Lahir', type: 'date' },
          { label: 'Agama', field: 'religion', sortable: true, width: '100px', tooltip: 'Agama', type: 'lookup', reference: 'RELIGION' },
          { label: 'Pendidikan', field: 'education', sortable: true, width: '100px', tooltip: 'Pendidikan', type: 'lookup', reference: 'EDUCATION' },
          { label: 'Pekerjaan', field: 'job', sortable: true, width: '100px', tooltip: 'Pekerjaan', type: 'lookup', reference: 'JOB' },
          { field: 'action', width: '200px' },
        ]"
        :actions="[
          { label: 'Delete', emit: 'removeChildren' },
          { label: 'Edit', emit: 'editChildren' },
        ]"
        :disabled-action="() => {}"
        :add-new-data="addChildren"
        :save-state="() => {}"
        :rows="model.children"
        :buttons="[]"
        :initial-sort-by="[]"
        @RowClick="() => {}"
        @removeChildren="removeChildren"
        @editChildren="editChildren"
      />

      <!-- Actions -->
      <ERight>
        <EButton id="save" ref="save" label="Save" color="green" :show="showSave" @click="saveFamily" />
        <EButton id="confim" ref="confim" label="Confirm" color="green" :show="showConfirm" @click="confirmFamily" />
      </ERight>
    </ECol>

    <!-- Entry Dialog -->
    <EDialog id="childrenDlg" ref="childrenDlg" title="Tambah Anak" :width="800" :height="250" :buttons="[{ label: 'Simpan', emit: 'saveChild', color: 'green' }]" @saveChild="saveChild">
      <ECol>
        <ECol :col="2">
          <EText id="childName" ref="childName" v-model="child.name" label="Nama Anak" placeholder="Input Nama Anak" type="short" :required="ui.dialog.name.required" :disabled="ui.dialog.name.disabled" :show="ui.dialog.name.show" />
          <ENumber id="childNik" ref="childNik" v-model="child.nik" label="NIK" placeholder="Input NIK" type="short" :required="ui.dialog.nik.required" :disabled="ui.dialog.nik.disabled" :show="ui.dialog.nik.show" />
          <ELookup id="childSex" ref="childSex" v-model="child.sex" label="Jenis Kelamin" placeholder="Input Jenis Kelamin" :required="ui.dialog.sex.required" :disabled="ui.dialog.sex.disabled" :show="ui.dialog.sex.show" lookup-group="SEX" />
          <EText id="childBirthPlace" ref="childBirthPlace" v-model="child.placeOfBirth" label="Tempat Lahir" placeholder="Input Tempat Lahir" type="short" :required="ui.dialog.placeOfBirth.required" :disabled="ui.dialog.placeOfBirth.disabled" :show="ui.dialog.placeOfBirth.show" />
          <EDate id="childBirthDate" ref="childBirthDate" v-model="child.dateOfBirth" label="Tgl Lahir" :required="ui.dialog.dateOfBirth.required" :disabled="ui.dialog.dateOfBirth.disabled" :show="ui.dialog.dateOfBirth.show" />
          <ELookup id="childReligion" ref="childReligion" v-model="child.religion" label="Agama" placeholder="Input Agama" :required="ui.dialog.religion.required" :disabled="ui.dialog.religion.disabled" :show="ui.dialog.religion.show" lookup-group="RELIGION" />
          <ELookup id="childEducation" ref="childEducation" v-model="child.education" label="Pendidikan" placeholder="Input Pendidikan" :required="ui.dialog.education.required" :disabled="ui.dialog.education.disabled" :show="ui.dialog.education.show" lookup-group="EDUCATION" />
          <ELookup id="childJob" ref="childJob" v-model="child.job" label="Pekerjaan" placeholder="Input Perkerjaan" :required="ui.dialog.job.required" :disabled="ui.dialog.job.disabled" :show="ui.dialog.job.show" lookup-group="JOB" />
        </ECol>
      </ECol>
    </EDialog>

    <!-- Confirmation and message -->
    <EConfirmation id="confirmation" ref="confirmation" positive="Yes" negative="No" />
    <EMessage id="message" ref="message" />
  </ECard>
</template>
<script>
const uiProps = {
  name: { required: true, disabled: false, show: true },
  nik: { required: true, disabled: false, show: true },
  sex: { required: true, disabled: false, show: true },
  placeOfBirth: { required: true, disabled: false, show: true },
  dateOfBirth: { required: true, disabled: false, show: true },
  religion: { required: true, disabled: false, show: true },
  education: { required: true, disabled: false, show: true },
  job: { required: true, disabled: false, show: true },
}
const empty = {
  id: undefined,
  name: undefined,
  nik: undefined,
  sex: undefined,
  placeOfBirth: undefined,
  dateOfBirth: undefined,
  religion: undefined,
  education: undefined,
  job: undefined,
}

export default {
  name: 'Entry',
  data() {
    return {
      showSave: true,
      showConfirm: false,
      ui: {
        father: this.$object.clone(uiProps),
        mother: this.$object.clone(uiProps),
        children: { table: { required: true, disabled: false, show: true } },
        dialog: this.$object.clone(uiProps),
      },
      child: this.$object.clone(empty),
      model: {
        father: { typeid: undefined, name: undefined, nik: undefined, sex: undefined, placeOfBirth: undefined, dateOfBirth: undefined, religion: undefined, education: undefined, job: undefined },
        mother: { id: undefined, name: undefined, nik: undefined, sex: undefined, placeOfBirth: undefined, dateOfBirth: undefined, religion: undefined, education: undefined, job: undefined },
        children: [],
      },
    }
  },
  mounted() {
    this.ui.father.sex.disabled = true
    this.ui.mother.sex.disabled = true
  },
  methods: {
    fillNewFamilyData() {
      this.model.father.id = undefined
      this.model.father.name = 'Elvino'
      this.model.father.nik = 123456
      this.model.father.sex = 'SEX_M'
      this.model.father.placeOfBirth = 'Bogor'
      this.model.father.dateOfBirth = '1978-09-19'
      this.model.father.religion = 'RELIGION_KH'
      this.model.father.education = 'EDUCATION_S1'
      this.model.father.job = 'JOB_K'

      this.model.mother.id = undefined
      this.model.mother.name = 'Carinnia'
      this.model.mother.nik = 654321
      this.model.mother.sex = 'SEX_F'
      this.model.mother.placeOfBirth = 'Jakarta'
      this.model.mother.dateOfBirth = '1979-09-26'
      this.model.mother.religion = 'RELIGION_KA'
      this.model.mother.education = 'EDUCATION_S2'
      this.model.mother.job = 'JOB_I'

      this.model.children = []
      this.model.children.push({
        id: undefined,
        name: 'Constantine Davin Ethan',
        nik: 162534,
        sex: 'SEX_M',
        placeOfBirth: 'Jakarta',
        dateOfBirth: '2007-03-26',
        religion: 'RELIGION_KA',
        education: 'EDUCATION_SMP',
        job: 'JOB_P',
      })
    },
    resetNewFamilyData() {
      this.model = {
        father: { typeid: undefined, name: undefined, nik: undefined, sex: 'SEX_M', placeOfBirth: undefined, dateOfBirth: undefined, religion: undefined, education: undefined, job: undefined },
        mother: { id: undefined, name: undefined, nik: undefined, sex: 'SEX_F', placeOfBirth: undefined, dateOfBirth: undefined, religion: undefined, education: undefined, job: undefined },
        children: [],
      }
      // await this.$rest.delay(100)
      this.$nextTick(() => {
        this.$wrapper.clearError(this.$refs.customerEntry)
      })
    },
    async saveFamily() {
      const { valid } = this.$wrapper.validate(this.$refs.customerEntry)
      if (valid) {
        // Do validate server
        this.$refs.loader.show('Validation')
        this.$wrapper.disabled([this.ui.father, this.ui.mother, this.ui.children], true)
        const { result, error } = await this.$rest.post('/family/validate', this.constractFamily())
        this.$wrapper.disabled([this.ui.father, this.ui.mother, this.ui.children], false)
        this.ui.father.sex.disabled = true
        this.ui.mother.sex.disabled = true

        if (result) {
          this.$refs.loader.success()
          this.showSave = false
          this.showConfirm = true
        }

        if (error) {
          this.$refs.loader.fail()

          for (const err of error) {
            if (err.type === 'FIELD' && this.$refs[err.field]) {
              this.$refs[err.field].addError([err.message])
            }
          }

          this.$refs.information.addRestError(error)
        }
      }
    },
    confirmFamily() {
      this.showSave = true
      this.showConfirm = false
    },
    constractFamily() {
      return {
        id: null,
        name: 'Unknown Family',
        parent: [
          { ...this.model.father, type: 'F' },
          { ...this.model.mother, type: 'M' },
        ],
        children: [...this.model.children],
      }
    },

    addChildren() {
      this.child = this.$object.clone(empty)
      this.$refs.childrenDlg.open()
    },
    editChildren(props) {
      this.child = this.$object.clone(props.row)
      this.$refs.childrenDlg.open()
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
    async removeChildren(props) {
      const { Yes } = await this.$refs.confirmation.confirm(`Are you sure want to remove ${props.row.name} ?`)
      if (Yes) this.$refs.children.remove()
    },
  },
}
</script>
