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
                    :id="textArea.id"
                    :ref="textArea.id"
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
                    color="green"
                    @click="click"
                  />
                  <EButton
                    :id="button2.id"
                    :ref="button2.id"
                    :label="button2.label"
                    :disabled="button2.disabled"
                    color="red"
                    @click="changeValue"
                  />
                </td>
                <td>[{{ button }}]</td>
              </tr>
              <tr>
                <td>Number</td>
                <td>
                  <ENumber
                    :id="number.id"
                    :ref="number.id"
                    v-model="number.value"
                    :label="number.label"
                    :disabled="number.disabled"
                    :show="number.show"
                    :required="number.required"
                    :maxlength="number.maxlength"
                    :vruntime="vruntime"
                    :allow-minus="true"
                    :separator="true"
                    :minimum="number.minimum"
                    :maximum="number.maximum"
                    @blur="blur"
                  />
                </td>
                <td>[{{ number }}]</td>
              </tr>
              <tr>
                <td>Decimal</td>
                <td>
                  <EDecimal
                    :id="decimal.id"
                    :ref="decimal.id"
                    v-model="decimal.value"
                    :label="decimal.label"
                    :disabled="decimal.disabled"
                    :show="decimal.show"
                    :required="decimal.required"
                    :maxlength="decimal.maxlength"
                    :vruntime="vruntime"
                    :allow-minus="true"
                    :minimum="decimal.minimum"
                    :maximum="decimal.maximum"
                    :maximum-fraction-digits="6"
                    :separator="true"
                    @blur="blur"
                  />
                </td>
                <td>[{{ decimal }}]</td>
              </tr>
              <tr>
                <td>Date</td>
                <td>
                  <EDate
                    :id="date.id"
                    :ref="date.id"
                    v-model="date.value"
                    :label="date.label"
                    :required="date.required"
                    :disabled="date.disabled"
                    :show="date.show"
                    :vruntime="vruntime"
                    :minimum="date.minimum"
                    :maximum="date.maximum"
                    @blur="blur"
                  />
                </td>
                <td>[{{ date }}]</td>
              </tr>
              <tr>
                <td>Time</td>
                <td>
                  <ETime
                    :id="time.id"
                    :ref="time.id"
                    v-model="time.value"
                    :label="time.label"
                    :required="time.required"
                    :disabled="time.disabled"
                    :show="time.show"
                    :vruntime="vruntime"
                    :minimum="time.minimum"
                    :maximum="time.maximum"
                    @blur="blur"
                  />
                </td>
                <td>[{{ time }}]</td>
              </tr>
              <tr>
                <td>Checkbox</td>
                <td>
                  <ECheckBox
                    :id="checkbox.id"
                    :ref="checkbox.id"
                    v-model="checkbox.value"
                    :label="checkbox.label"
                    :disabled="checkbox.disabled"
                    :show="checkbox.show"
                    :option="checkbox.option"
                    :vruntime="vruntime"
                    @blur="blur"
                  />
                  <ECheckBox
                    :id="checkbox.id"
                    :ref="checkbox.id"
                    v-model="checkbox.value"
                    :label="checkbox.label"
                    :disabled="checkbox.disabled"
                    :show="checkbox.show"
                    :option="checkbox.option"
                    :vruntime="vruntime"
                    @blur="blur"
                  />
                  <ECheckBox
                    :id="checkbox.id"
                    :ref="checkbox.id"
                    v-model="checkbox.value"
                    :label="checkbox.label"
                    :disabled="checkbox.disabled"
                    :show="checkbox.show"
                    :option="checkbox.option"
                    :vruntime="vruntime"
                    @blur="blur"
                  />
                  <ECheckBox
                    :id="checkbox.id"
                    :ref="checkbox.id"
                    v-model="checkbox.value"
                    :label="checkbox.label"
                    :disabled="checkbox.disabled"
                    :show="checkbox.show"
                    :option="checkbox.option"
                    :vruntime="vruntime"
                    @blur="blur"
                  />
                </td>
                <td>{{ checkbox }}</td>
              </tr>
              <tr>
                <td>Boolean / Radio</td>
                <td>
                  <EBoolean
                    :id="boolean.id"
                    :ref="boolean.id"
                    v-model="boolean.value"
                    :label="boolean.label"
                    :required="boolean.required"
                    :disabled="boolean.disabled"
                    :show="boolean.show"
                    :vruntime="vruntime"
                    @blur="blur"
                  />
                </td>
                <td>[{{ boolean }}]</td>
              </tr>
              <tr>
                <td>Select</td>
                <td>
                  <ESelect
                    :id="select.id"
                    :ref="select.id"
                    v-model="select.value"
                    :label="select.label"
                    :required="select.required"
                    :disabled="select.disabled"
                    :show="select.show"
                    :vruntime="vruntime"
                    :options="select.options"
                    as="number"
                    @blur="blur"
                  />
                </td>
                <td>[{{ select }}]</td>
              </tr>
              <tr>
                <td>Card Container</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td>PaginationServer</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td>PaginationLocal</td>
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
      checkbox: {
        ...empty,
        id: 'checkBox',
        label: 'Sudah menikah',
        value: null,
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
        id: 'number',
        value: 7562265.15,
        label: 'Distance',
        maxlength: 30,
        minimum: 100,
        maximum: 200232323232323,
      },
      decimal: {
        ...empty,
        value: 155142.2365,
        id: 'decimal',
        label: 'Weight',
        maxlength: 30,
        minimum: -100232323.86,
        maximum: 202323230.54,
      },
      button: {
        ...empty,
        id: 'button',
        label: 'Approve',
      },
      button2: {
        ...empty,
        id: 'button2',
        label: 'Reject',
      },
      date: {
        ...empty,
        minimum: new Date('2021-05-10'),
        maximum: new Date('2021-05-20'),
        value: new Date(),
        id: 'date',
        label: 'Birth Date',
      },
      time: {
        ...empty,
        minimum: '19:30',
        maximum: '23:00',
        value: '21:00',
        id: 'time',
        label: 'Birth Time',
      },
      boolean: {
        ...empty,
        value: true,
        id: 'boolean',
        label: 'Active',
      },
      select: {
        ...empty,
        value: 20,
        id: 'select',
        label: 'Lookup',
        // options: [
        //   {
        //     value: 'AAAA',
        //     description: 'Huruf AAAA',
        //   },
        //   {
        //     value: 'BBBB',
        //     description: 'Huruf BBBB',
        //   },
        //   {
        //     value: 'CCCC',
        //     description: 'Huruf CCCC',
        //   },
        // ],
        options: [
          {
            value: 10,
            description: 'Huruf AAAA',
          },
          {
            value: 20,
            description: 'Huruf BBBB',
          },
          {
            value: 23.23,
            description: 'Huruf CCCC',
          },
        ],
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
    changeValue() {
      this.click()
      this.shortText.value = 'Reset'
      this.mediumText.value = 'Reset'
      this.longText.value = 'Reset'
      this.textArea.value = 'Reset'
      this.number.value = 123
      this.decimal.value = 123.123
      this.date.value = new Date('1978-09-19')
      this.time.value = '19:00'
      this.boolean.value = false
      this.select.value = 10
      this.checkbox.value = true
    },
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
      this.mediumText.disabled = !this.mediumText.disabled
      this.longText.disabled = !this.longText.disabled
      this.textArea.disabled = !this.textArea.disabled
      this.number.disabled = !this.number.disabled
      this.decimal.disabled = !this.decimal.disabled
      this.date.disabled = !this.date.disabled
      this.time.disabled = !this.time.disabled
      this.boolean.disabled = !this.boolean.disabled
      this.button.disabled = !this.button.disabled
      this.select.disabled = !this.select.disabled
      this.checkbox.disabled = !this.checkbox.disabled
      // this.$refs.firstEntryForm.clearError()
    },
  },
}
</script>
