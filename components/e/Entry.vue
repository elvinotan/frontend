<template>
  <ECard ref="customerEntry" label="Bio Data Keluarga">
    <ECol :col="2">
      <ECard ref="father" label="Ayah">
        <ECol>
          <ECol :col="2">
            <EText
              id="fatherName"
              ref="fatherName"
              v-model="biodata.father.name"
              label="Nama Ayah"
              placeholder="Input Nama Ayah"
              type="short"
              :required="ui.father.name.required"
              :disabled="ui.father.name.disabled"
              :show="ui.father.name.show"
            />
            <ENumber
              id="fatherNik"
              ref="fatherNik"
              v-model="biodata.father.nik"
              label="NIK"
              placeholder="Input NIK"
              type="short"
              :required="ui.father.nik.required"
              :disabled="ui.father.nik.disabled"
              :show="ui.father.nik.show"
            />
          </ECol>
          <ECol :col="3">
            <ELookup
              id="fatherSex"
              ref="fatherSex"
              v-model="biodata.father.sex"
              label="Jenis Kelamin"
              placeholder="Input Jenis Kelamin"
              :required="ui.father.sex.required"
              :disabled="ui.father.sex.disabled"
              :show="ui.father.sex.show"
              lookup-group="SEX"
            />
            <EText
              id="fatherBirthPlace"
              ref="fatherBirthPlace"
              v-model="biodata.father.birthPlace"
              label="Tempat Lahir"
              placeholder="Input Tempat Lahir"
              type="short"
              :required="ui.father.birthPlace.required"
              :disabled="ui.father.birthPlace.disabled"
              :show="ui.father.birthPlace.show"
            />
            <EDate
              id="fatherBirthDate"
              ref="fatherBirthDate"
              v-model="biodata.father.birthDate"
              label="Tgl Lahir"
              :required="ui.father.birthDate.required"
              :disabled="ui.father.birthDate.disabled"
              :show="ui.father.birthDate.show"
            />
          </ECol>
          <ECol :col="3">
            <ELookup
              id="fatherReligion"
              ref="fatherReligion"
              v-model="biodata.father.religion"
              label="Agama"
              placeholder="Input Agama"
              :required="ui.father.religion.required"
              :disabled="ui.father.religion.disabled"
              :show="ui.father.religion.show"
              lookup-group="RELIGION"
            />
            <ELookup
              id="fatherEducation"
              ref="fatherEducation"
              v-model="biodata.father.education"
              label="Pendidikan"
              placeholder="Input Pendidikan"
              :required="ui.father.education.required"
              :disabled="ui.father.education.disabled"
              :show="ui.father.education.show"
              lookup-group="EDUCATION"
            />
            <ELookup
              id="fatherJob"
              ref="fatherJob"
              v-model="biodata.father.job"
              label="Pekerjaan"
              placeholder="Input Perkerjaan"
              :required="ui.father.job.required"
              :disabled="ui.father.job.disabled"
              :show="ui.father.job.show"
              lookup-group="JOB"
            />
          </ECol>
        </ECol>
      </ECard>
      <ECard ref="mother" label="Ibu">
        <ECol>
          <ECol :col="2">
            <EText
              id="motherName"
              ref="motherName"
              v-model="biodata.mother.name"
              label="Nama Ibu"
              placeholder="Input Nama Ibu"
              type="short"
              :required="ui.mother.name.required"
              :disabled="ui.mother.name.disabled"
              :show="ui.mother.name.show"
            />
            <ENumber
              id="motherNik"
              ref="motherNik"
              v-model="biodata.mother.nik"
              label="NIK"
              placeholder="Input NIK"
              type="short"
              :required="ui.mother.nik.required"
              :disabled="ui.mother.nik.disabled"
              :show="ui.mother.nik.show"
            />
          </ECol>
          <ECol :col="3">
            <ELookup
              id="motherSex"
              ref="motherSex"
              v-model="biodata.mother.sex"
              label="Jenis Kelamin"
              placeholder="Input Jenis Kelamin"
              :required="ui.mother.sex.required"
              :disabled="ui.mother.sex.disabled"
              :show="ui.mother.sex.show"
              lookup-group="SEX"
            />
            <EText
              id="motherBirthPlace"
              ref="motherBirthPlace"
              v-model="biodata.mother.birthPlace"
              label="Tempat Lahir"
              placeholder="Input Tempat Lahir"
              type="short"
              :required="ui.mother.birthPlace.required"
              :disabled="ui.mother.birthPlace.disabled"
              :show="ui.mother.birthPlace.show"
            />
            <EDate
              id="motherBirthDate"
              ref="motherBirthDate"
              v-model="biodata.mother.birthDate"
              label="Tgl Lahir"
              :required="ui.mother.birthDate.required"
              :disabled="ui.mother.birthDate.disabled"
              :show="ui.mother.birthDate.show"
            />
          </ECol>
          <ECol :col="3">
            <ELookup
              id="motherReligion"
              ref="motherReligion"
              v-model="biodata.mother.religion"
              label="Agama"
              placeholder="Input Agama"
              :required="ui.mother.religion.required"
              :disabled="ui.mother.religion.disabled"
              :show="ui.mother.religion.show"
              lookup-group="RELIGION"
            />
            <ELookup
              id="motherEducation"
              ref="motherEducation"
              v-model="biodata.mother.education"
              label="Pendidikan"
              placeholder="Input Pendidikan"
              :required="ui.mother.education.required"
              :disabled="ui.mother.education.disabled"
              :show="ui.mother.education.show"
              lookup-group="EDUCATION"
            />
            <ELookup
              id="motherJob"
              ref="motherJob"
              v-model="biodata.mother.job"
              label="Pekerjaan"
              placeholder="Input Perkerjaan"
              :required="ui.mother.job.required"
              :disabled="ui.mother.job.disabled"
              :show="ui.mother.job.show"
              lookup-group="JOB"
            />
          </ECol>
        </ECol>
      </ECard>
    </ECol>
    <br />
    <ELocalPagination
      id="children"
      ref="children"
      label="Anak-anak"
      :show="ui.childrens.show"
      :disabled="ui.childrens.disabled"
      :columns="[
        {
          label: 'Name',
          field: 'name',
          sortable: true,
          width: '100px',
          tooltip: 'Nama',
          type: 'string',
        },
        {
          label: 'Nik',
          field: 'nik',
          sortable: true,
          width: '100px',
          tooltip: 'NIK',
          type: 'number',
        },
        {
          label: 'Jenis Kelamin',
          field: 'sex',
          sortable: true,
          width: '100px',
          tooltip: 'Jenis Kelamin',
          type: 'lookup',
          reference: 'SEX',
        },
        {
          label: 'Tempat Lahir',
          field: 'birthPlace',
          sortable: true,
          width: '100px',
          tooltip: 'Tempat Lahir',
          type: 'string',
        },
        {
          label: 'Tgl Lahir',
          field: 'birthDate',
          sortable: true,
          width: '100px',
          tooltip: 'Tgl Lahir',
          type: 'date',
        },
        {
          label: 'Tgl Lahir',
          field: 'birthDate',
          sortable: true,
          width: '100px',
          tooltip: 'Tgl Lahir',
          type: 'date',
        },
        {
          label: 'Agama',
          field: 'religion',
          sortable: true,
          width: '100px',
          tooltip: 'Agama',
          type: 'lookup',
          reference: 'RELIGION',
        },
        {
          label: 'Pendidikan',
          field: 'education',
          sortable: true,
          width: '100px',
          tooltip: 'Pendidikan',
          type: 'lookup',
          reference: 'EDUCATION',
        },
        {
          label: 'Pekerjaan',
          field: 'job',
          sortable: true,
          width: '100px',
          tooltip: 'Pekerjaan',
          type: 'lookup',
          reference: 'JOB',
        },
        {
          field: 'action',
          width: '200px',
        },
      ]"
      :actions="[
        { label: 'Delete', emit: 'removeChildren' },
        { label: 'Edit', emit: 'editChildren' },
      ]"
      :disabled-action="() => {}"
      :add-new-data="addChildren"
      :save-state="() => {}"
      :rows="biodata.children"
      :buttons="[]"
      :initial-sort-by="[]"
      @RowClick="() => {}"
      @removeChildren="removeChildren"
      @editChildren="editChildren"
    />
    <br />
    <EButton
      id="save"
      ref="save"
      label="Simpan"
      color="green"
      @click="saveBiodata"
    />

    <EDialog
      id="childrenDlg"
      ref="childrenDlg"
      title="Tambah Anak"
      :width="800"
      :height="250"
      :buttons="[{ label: 'Simpan', emit: 'saveChild', color: 'green' }]"
      @saveChild="saveChild"
    >
      <ECol>
        <ECol :col="2">
          <EText
            id="childName"
            ref="childName"
            v-model="child.name"
            label="Nama Anak"
            placeholder="Input Nama Anak"
            type="short"
            :required="ui.dialog.name.required"
            :disabled="ui.dialog.name.disabled"
            :show="ui.dialog.name.show"
          />
          <ENumber
            id="childNik"
            ref="childNik"
            v-model="child.nik"
            label="NIK"
            placeholder="Input NIK"
            type="short"
            :required="ui.dialog.nik.required"
            :disabled="ui.dialog.nik.disabled"
            :show="ui.dialog.nik.show"
          />
          <ELookup
            id="childSex"
            ref="childSex"
            v-model="child.sex"
            label="Jenis Kelamin"
            placeholder="Input Jenis Kelamin"
            :required="ui.dialog.sex.required"
            :disabled="ui.dialog.sex.disabled"
            :show="ui.dialog.sex.show"
            lookup-group="SEX"
          />
          <EText
            id="childBirthPlace"
            ref="childBirthPlace"
            v-model="child.birthPlace"
            label="Tempat Lahir"
            placeholder="Input Tempat Lahir"
            type="short"
            :required="ui.dialog.birthPlace.required"
            :disabled="ui.dialog.birthPlace.disabled"
            :show="ui.dialog.birthPlace.show"
          />
          <EDate
            id="childBirthDate"
            ref="childBirthDate"
            v-model="child.birthDate"
            label="Tgl Lahir"
            :required="ui.dialog.birthDate.required"
            :disabled="ui.dialog.birthDate.disabled"
            :show="ui.dialog.birthDate.show"
          />
          <ELookup
            id="childReligion"
            ref="childReligion"
            v-model="child.religion"
            label="Agama"
            placeholder="Input Agama"
            :required="ui.dialog.religion.required"
            :disabled="ui.dialog.religion.disabled"
            :show="ui.dialog.religion.show"
            lookup-group="RELIGION"
          />
          <ELookup
            id="childEducation"
            ref="childEducation"
            v-model="child.education"
            label="Pendidikan"
            placeholder="Input Pendidikan"
            :required="ui.dialog.education.required"
            :disabled="ui.dialog.education.disabled"
            :show="ui.dialog.education.show"
            lookup-group="EDUCATION"
          />
          <ELookup
            id="childJob"
            ref="childJob"
            v-model="child.job"
            label="Pekerjaan"
            placeholder="Input Perkerjaan"
            :required="ui.dialog.job.required"
            :disabled="ui.dialog.job.disabled"
            :show="ui.dialog.job.show"
            lookup-group="JOB"
          />
        </ECol>
      </ECol>
    </EDialog>
    <EConfirmation
      id="confirmation"
      ref="confirmation"
      positive="Yes"
      negative="No"
    />
  </ECard>
</template>
<script>
const uiprops = {
  name: { required: true, disabled: false, show: true },
  nik: { required: true, disabled: false, show: true },
  sex: { required: true, disabled: false, show: true },
  birthPlace: { required: true, disabled: false, show: true },
  birthDate: { required: true, disabled: false, show: true },
  religion: { required: true, disabled: false, show: true },
  education: { required: true, disabled: false, show: true },
  job: { required: true, disabled: false, show: true },
}
const emptyDialogModel = {
  id: null,
  name: null,
  nik: null,
  sex: null,
  birthPlace: null,
  birthDate: null,
  religion: null,
  education: null,
  job: null,
}
export default {
  name: 'Entry',
  data() {
    return {
      ui: {
        father: this.$object.clone(uiprops),
        mother: this.$object.clone(uiprops),
        childrens: { required: true, disabled: false, show: true },
        dialog: this.$object.clone(uiprops),
      },
      child: this.$object.clone(emptyDialogModel),
      biodata: {
        father: {
          name: 'Elvino',
          nik: 1212,
          sex: 'M',
          birthPlace: 'Jakarta',
          birthDate: new Date(),
          religion: 'KATOLIK',
          education: 'SD',
          job: 1,
        },
        mother: {
          name: 'Carinnia',
          nik: 234234,
          sex: 'M',
          birthPlace: 'Jakarta',
          birthDate: new Date(),
          religion: 'KATOLIK',
          education: 'SMP',
          job: 1,
        },
        children: [
          {
            id: 1,
            name: 'CONSTANTINE',
            nik: 1123323,
            sex: 'M',
            birthPlace: 'JAKARTA',
            birthDate: new Date(),
            religion: 'KATOLIK',
            education: 'SMP',
            job: '3',
          },
          {
            id: 2,
            name: 'AAA',
            nik: 1123323,
            sex: 'M',
            birthPlace: 'JAKARTA',
            birthDate: new Date(),
            religion: 'KATOLIK',
            education: 'SMP',
            job: '3',
          },
          {
            id: 3,
            name: 'BBB',
            nik: 1123323,
            sex: 'M',
            birthPlace: 'JAKARTA',
            birthDate: new Date(),
            religion: 'KATOLIK',
            education: 'SMP',
            job: '3',
          },
          {
            id: 4,
            name: 'CCCC',
            nik: 1123323,
            sex: 'M',
            birthPlace: 'JAKARTA',
            birthDate: new Date(),
            religion: 'KATOLIK',
            education: 'SMP',
            job: '3',
          },
          {
            id: 5,
            name: 'DDD',
            nik: 1123323,
            sex: 'M',
            birthPlace: 'JAKARTA',
            birthDate: new Date(),
            religion: 'KATOLIK',
            education: 'SMP',
            job: '3',
          },
          {
            id: 6,
            name: 'EEE',
            nik: 1123323,
            sex: 'M',
            birthPlace: 'JAKARTA',
            birthDate: new Date(),
            religion: 'KATOLIK',
            education: 'SMP',
            job: '3',
          },
          {
            id: 7,
            name: 'FFF',
            nik: 1123323,
            sex: 'M',
            birthPlace: 'JAKARTA',
            birthDate: new Date(),
            religion: 'KATOLIK',
            education: 'SMP',
            job: '3',
          },
          {
            id: 8,
            name: 'GGG',
            nik: 1123323,
            sex: 'M',
            birthPlace: 'JAKARTA',
            birthDate: new Date(),
            religion: 'KATOLIK',
            education: 'SMP',
            job: '3',
          },
          {
            id: 9,
            name: 'HHH',
            nik: 1123323,
            sex: 'M',
            birthPlace: 'JAKARTA',
            birthDate: new Date(),
            religion: 'KATOLIK',
            education: 'SMP',
            job: '3',
          },
          {
            id: 10,
            name: 'III',
            nik: 1123323,
            sex: 'M',
            birthPlace: 'JAKARTA',
            birthDate: new Date(),
            religion: 'KATOLIK',
            education: 'SMP',
            job: '3',
          },
          {
            id: 11,
            name: 'JJJ',
            nik: 1123323,
            sex: 'M',
            birthPlace: 'JAKARTA',
            birthDate: new Date(),
            religion: 'KATOLIK',
            education: 'SMP',
            job: '3',
          },
          {
            id: 12,
            name: 'KKK',
            nik: 1123323,
            sex: 'M',
            birthPlace: 'JAKARTA',
            birthDate: new Date(),
            religion: 'KATOLIK',
            education: 'SMP',
            job: '3',
          },
        ],
      },
    }
  },
  mounted() {
    this.ui.father.sex.disabled = true
    this.ui.mother.sex.disabled = true
  },
  methods: {
    saveBiodata() {
      const { valid, errors } = this.$wrapper.validate(this.$refs.customerEntry)
      if (valid) {
        alert('Valid')
        this.$wrapper.disabled([this.ui.father, this.ui.mother], true)
      } else {
        console.log('errors ', errors)
      }
    },
    addChildren() {
      this.child = this.$object.clone(emptyDialogModel)
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
      const { Yes } = await this.$refs.confirmation.confirm(
        `Are you sure want to remove ${props.row.name} ?`
      )
      if (Yes) this.$refs.children.remove()
    },
  },
}
</script>
