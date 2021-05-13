<template>
  <div>
    <EForm ref="firstEntryForm">
      <EForm ref="upperEntryForm">
        <EForm ref="entryForm">
          <table>
            <thead>
              <tr>
                <td>Type</td>
                <td>Component</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>ShortText</td>
                <td>
                  <EShortText
                    id="nickName"
                    ref="nickName"
                    v-model="nickName"
                    label="Nick Name"
                    :maxlength="50"
                    :disabled="false"
                    :show="true"
                    :required="true"
                    :vruntime="vruntime"
                    @blur="bluring"
                  />
                </td>
                <td>[{{ nickName }}]/{{ nickName.length }}</td>
              </tr>
              <tr>
                <td>MediumText</td>
                <td>
                  <EMediumText
                    id="name"
                    ref="name"
                    v-model="name"
                    label="Name"
                    :maxlength="50"
                    :disabled="false"
                    :show="true"
                    :required="true"
                    :vruntime="vruntime"
                    @blur="bluring"
                  />
                </td>
                <td>[{{ name }}]/{{ name.length }}</td>
              </tr>
              <tr>
                <td>LongText</td>
                <td>
                  <ELongText
                    id="fullname"
                    ref="fullname"
                    v-model="fullname"
                    label="Full Name"
                    :maxlength="50"
                    :disabled="false"
                    :show="true"
                    :required="true"
                    :vruntime="vruntime"
                    @blur="bluring"
                  />
                </td>
                <td>[{{ fullname }}]/{{ fullname.length }}</td>
              </tr>
              <tr>
                <td>Area</td>
                <td>
                  <ETextArea
                    id="profile"
                    ref="profile"
                    v-model="profile"
                    label="Your Profile"
                    :disabled="false"
                    :show="true"
                    :required="true"
                    :maxlength="10"
                    :vruntime="vruntime"
                    @blur="bluring"
                  />
                </td>
                <td>[{{ profile }}]/{{ profile.length }}</td>
              </tr>
              <tr>
                <td>Button</td>
                <td>
                  <EButton
                    id="clearError"
                    ref="buttonInside"
                    label="Clear Error"
                    :disabled="false"
                    @click="clearError"
                  />
                </td>
              </tr>
              <tr>
                <td>Select</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td>Number</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td>Currency</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td>Percentage</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td>Date</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td>Hour</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td>Checkbox</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td>Radio</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td>PaginationServer</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td>PaginationServer</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td>Dialog</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td>Loading</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td>Information</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td>Confirmation</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td>Autocomplete</td>
                <td>&nbsp;</td>
              </tr>
            </tbody>
          </table>
        </EForm>
      </EForm>
    </EForm>
    <button ref="buttonOutside" @click="validateAll">Validate</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nickName: '',
      name: '',
      fullname: '',
      profile: '',
      planets: [],
      requiredData: true,
    }
  },
  async fetch() {
    this.planets = await fetch('https://api.nuxtjs.dev/planets').then((res) =>
      res.json()
    )
  },
  methods: {
    validateAll() {
      const result = this.$refs.firstEntryForm.validate()
      console.log(result)
    },
    bluring(value) {
      console.log('mybluring ', value)
    },
    vruntime(value) {
      if (value === 'error') return 'Gax boleh input error'
      return null
    },
    clearError() {
      this.$refs.firstEntryForm.clearError()
    },
  },
}
</script>
