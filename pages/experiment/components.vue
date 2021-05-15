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
                    :id="shortText.id"
                    :ref="shortText.id"
                    v-model="shortText.value"
                    label="Nick Name"
                    :maxlength="shortText.maxlength"
                    :disabled="shortText.disabled"
                    :show="shortText.show"
                    placeholder="PlaceHoilder"
                    :required="shortText.required"
                    :vruntime="vruntime"
                    @blur="blur"
                  />
                </td>
                <td>
                  [{{ shortText }}]/{{
                    shortText.value ? shortText.value.length : 0
                  }}
                </td>
              </tr>
              <tr>
                <td>MediumText</td>
                <td>
                  <EMediumText
                    :id="mediumText.id"
                    :ref="mediumText.id"
                    v-model="mediumText.value"
                    :label="mediumText.label"
                    :maxlength="mediumText.maxlength"
                    :disabled="mediumText.disabled"
                    :show="mediumText.show"
                    :required="mediumText.required"
                    :vruntime="vruntime"
                    @blur="blur"
                  />
                </td>
                <td>
                  [{{ mediumText }}]/{{
                    mediumText.value ? mediumText.value.length : 0
                  }}
                </td>
              </tr>
              <tr>
                <td>LongText</td>
                <td>
                  <ELongText
                    :id="longText.id"
                    :ref="longText.id"
                    v-model="longText.value"
                    :label="longText.label"
                    :maxlength="longText.maxlength"
                    :disabled="longText.disabled"
                    :show="longText.show"
                    :required="longText.required"
                    :vruntime="vruntime"
                    @blur="blur"
                  />
                </td>
                <td>
                  [{{ longText }}]/{{
                    longText.value ? longText.value.length : 0
                  }}
                </td>
              </tr>
              <tr>
                <td>Area</td>
                <td>
                  <ETextArea
                    id="textArea.id"
                    ref="textArea.id"
                    v-model="textArea.value"
                    :label="textArea.label"
                    :disabled="textArea.disabled"
                    :show="textArea.show"
                    :required="textArea.required"
                    :maxlength="textArea.maxlength"
                    :vruntime="vruntime"
                    @blur="blur"
                  />
                </td>
                <td>
                  [{{ textArea }}]/{{
                    textArea.value ? textArea.value.length : 0
                  }}
                </td>
              </tr>
              <tr>
                <td>Button</td>
                <td>
                  <EButton
                    :id="button.id"
                    :ref="button.id"
                    :label="button.label"
                    :disabled="button.disabled"
                    @click="click"
                  />
                </td>
                <td>[{{ button }}]</td>
              </tr>
              <tr>
                <td>Select</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td>Number</td>
                <td>
                  <ENumber
                    id="number.id"
                    ref="number.id"
                    v-model="number.value"
                    :label="number.label"
                    :disabled="number.disabled"
                    :show="number.show"
                    :required="number.required"
                    :maxlength="number.maxlength"
                    :vruntime="vruntime"
                    @blur="blur"
                  />
                </td>
                <td>[{{ number }}]</td>
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
const empty = {
  value: null,
  id: 'id',
  label: 'Label',
  maxlength: 10,
  disabled: false,
  show: true,
  required: true,
}
export default {
  data() {
    return {
      shortText: {
        ...empty,
        id: 'shortText',
        label: 'Nick Name',
        value: 'Pipin',
        maxlength: 10,
      },
      mediumText: {
        ...empty,
        id: 'mediumText',
        label: 'Name',
        maxlength: 20,
      },
      longText: {
        ...empty,
        id: 'longText',
        label: 'Full Name',
        maxlength: 30,
      },
      textArea: {
        ...empty,
        id: 'textArea',
        label: 'Your Profile',
        maxlength: 50,
      },
      number: {
        ...empty,
        value: 123456789,
        id: 'number',
        label: 'Distance',
        maxlength: 10,
      },
      button: {
        ...empty,
        id: 'button',
        label: 'Clear Errors',
      },
      planets: [],
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
    blur(value) {
      console.log('Event.blur ', value)
    },
    vruntime(value) {
      console.log('Event.vruntime ', value)
      if (value === 'ERROR') return 'Gax boleh input error'
      return null
    },
    click() {
      this.shortText.disabled = !this.shortText.disabled
      // this.$refs.firstEntryForm.clearError()
    },
  },
}
</script>
