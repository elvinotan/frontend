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
                <td>Password</td>
                <td>
                  <EPassword
                    :id="ui.password.id"
                    :ref="ui.password.id"
                    v-model="ui.password.value"
                    :label="ui.password.label"
                    :maxlength="ui.password.maxlength"
                    :disabled="ui.password.disabled"
                    :show="ui.password.show"
                    placeholder="Enter Password"
                    :required="ui.password.required"
                    :vruntime="vruntime"
                    @blur="blur"
                  />
                </td>
                <td>
                  [{{ ui.password }}]/{{
                    ui.password.value ? ui.password.value.length : 0
                  }}
                </td>
              </tr>
              <tr>
                <td>ShortText</td>
                <td>
                  <EShortText
                    :id="ui.shortText.id"
                    :ref="ui.shortText.id"
                    v-model="ui.shortText.value"
                    :label="ui.shortText.label"
                    :maxlength="ui.shortText.maxlength"
                    :disabled="ui.shortText.disabled"
                    :show="ui.shortText.show"
                    placeholder="PlaceHoilder"
                    :required="ui.shortText.required"
                    :vruntime="vruntime"
                    @blur="blur"
                  />
                </td>
                <td>
                  [{{ ui.shortText }}]/{{
                    ui.shortText.value ? ui.shortText.value.length : 0
                  }}
                </td>
              </tr>
              <tr>
                <td>MediumText</td>
                <td>
                  <EMediumText
                    :id="ui.mediumText.id"
                    :ref="ui.mediumText.id"
                    v-model="ui.mediumText.value"
                    :label="ui.mediumText.label"
                    :maxlength="ui.mediumText.maxlength"
                    :disabled="ui.mediumText.disabled"
                    :show="ui.mediumText.show"
                    :required="ui.mediumText.required"
                    :vruntime="vruntime"
                    @blur="blur"
                  />
                </td>
                <td>
                  [{{ ui.mediumText }}]/{{
                    ui.mediumText.value ? ui.mediumText.value.length : 0
                  }}
                </td>
              </tr>
              <tr>
                <td>LongText</td>
                <td>
                  <ELongText
                    :id="ui.longText.id"
                    :ref="ui.longText.id"
                    v-model="ui.longText.value"
                    :label="ui.longText.label"
                    :maxlength="ui.longText.maxlength"
                    :disabled="ui.longText.disabled"
                    :show="ui.longText.show"
                    :required="ui.longText.required"
                    :vruntime="vruntime"
                    @blur="blur"
                  />
                </td>
                <td>
                  [{{ ui.longText }}]/{{
                    ui.longText.value ? ui.longText.value.length : 0
                  }}
                </td>
              </tr>
              <tr>
                <td>Area</td>
                <td>
                  <ETextArea
                    :id="ui.textArea.id"
                    :ref="ui.textArea.id"
                    v-model="ui.textArea.value"
                    :label="ui.textArea.label"
                    :disabled="ui.textArea.disabled"
                    :show="ui.textArea.show"
                    :required="ui.textArea.required"
                    :maxlength="ui.textArea.maxlength"
                    :vruntime="vruntime"
                    @blur="blur"
                  />
                </td>
                <td>
                  [{{ ui.textArea }}]/{{
                    ui.textArea.value ? ui.textArea.value.length : 0
                  }}
                </td>
              </tr>
              <tr>
                <td>Button</td>
                <td>
                  <EButton
                    :id="ui.button.id"
                    :ref="ui.button.id"
                    :label="ui.button.label"
                    :disabled="ui.button.disabled"
                    color="green"
                    @click="click"
                  />
                  <EButton
                    :id="ui.button2.id"
                    :ref="ui.button2.id"
                    :label="ui.button2.label"
                    :disabled="ui.button2.disabled"
                    color="red"
                    @click="changeValue"
                  />
                  <EButton
                    id="validate"
                    ref="validate"
                    label="Validate"
                    color="yellow"
                    @click="validateAll"
                  />
                  <EButton
                    id="clear"
                    ref="clear"
                    label="Clear"
                    color="blue"
                    @click="clearError"
                  />
                </td>
                <td>[{{ ui.button }}]</td>
              </tr>
              <tr>
                <td>Number</td>
                <td>
                  <ENumber
                    :id="ui.number.id"
                    :ref="ui.number.id"
                    v-model="ui.number.value"
                    :label="ui.number.label"
                    :disabled="ui.number.disabled"
                    :show="ui.number.show"
                    :required="ui.number.required"
                    :maxlength="ui.number.maxlength"
                    :vruntime="vruntime"
                    :allow-minus="true"
                    :separator="true"
                    :minimum="ui.number.minimum"
                    :maximum="ui.number.maximum"
                    @blur="blur"
                  />
                </td>
                <td>[{{ ui.number }}]</td>
              </tr>
              <tr>
                <td>Decimal</td>
                <td>
                  <EDecimal
                    :id="ui.decimal.id"
                    :ref="ui.decimal.id"
                    v-model="ui.decimal.value"
                    :label="ui.decimal.label"
                    :disabled="ui.decimal.disabled"
                    :show="ui.decimal.show"
                    :required="ui.decimal.required"
                    :maxlength="ui.decimal.maxlength"
                    :vruntime="vruntime"
                    :allow-minus="true"
                    :minimum="ui.decimal.minimum"
                    :maximum="ui.decimal.maximum"
                    :maximum-fraction-digits="6"
                    :separator="true"
                    @blur="blur"
                  />
                </td>
                <td>[{{ ui.decimal }}]</td>
              </tr>
              <tr>
                <td>Date</td>
                <td>
                  <EDate
                    :id="ui.date.id"
                    :ref="ui.date.id"
                    v-model="ui.date.value"
                    :label="ui.date.label"
                    :required="ui.date.required"
                    :disabled="ui.date.disabled"
                    :show="ui.date.show"
                    :vruntime="vruntime"
                    :minimum="ui.date.minimum"
                    :maximum="ui.date.maximum"
                    @blur="blur"
                  />
                </td>
                <td>[{{ ui.date }}]</td>
              </tr>
              <tr>
                <td>Time</td>
                <td>
                  <ETime
                    :id="ui.time.id"
                    :ref="ui.time.id"
                    v-model="ui.time.value"
                    :label="ui.time.label"
                    :required="ui.time.required"
                    :disabled="ui.time.disabled"
                    :show="ui.time.show"
                    :vruntime="vruntime"
                    :minimum="ui.time.minimum"
                    :maximum="ui.time.maximum"
                    @blur="blur"
                  />
                </td>
                <td>[{{ ui.time }}]</td>
              </tr>
              <tr>
                <td>Checkbox</td>
                <td>
                  <ECheckBox
                    :id="ui.checkbox.id"
                    :ref="ui.checkbox.id"
                    v-model="ui.checkbox.value"
                    :label="ui.checkbox.label"
                    :disabled="ui.checkbox.disabled"
                    :show="ui.checkbox.show"
                    :option="ui.checkbox.option"
                    :vruntime="vruntime"
                    @blur="blur"
                  />
                  <ECheckBox
                    :id="ui.checkbox.id"
                    :ref="ui.checkbox.id"
                    v-model="ui.checkbox.value"
                    :label="ui.checkbox.label"
                    :disabled="ui.checkbox.disabled"
                    :show="ui.checkbox.show"
                    :option="ui.checkbox.option"
                    :vruntime="vruntime"
                    @blur="blur"
                  />
                  <ECheckBox
                    :id="ui.checkbox.id"
                    :ref="ui.checkbox.id"
                    v-model="ui.checkbox.value"
                    :label="ui.checkbox.label"
                    :disabled="ui.checkbox.disabled"
                    :show="ui.checkbox.show"
                    :option="ui.checkbox.option"
                    :vruntime="vruntime"
                    @blur="blur"
                  />
                  <ECheckBox
                    :id="ui.checkbox.id"
                    :ref="ui.checkbox.id"
                    v-model="ui.checkbox.value"
                    :label="ui.checkbox.label"
                    :disabled="ui.checkbox.disabled"
                    :show="ui.checkbox.show"
                    :option="ui.checkbox.option"
                    :vruntime="vruntime"
                    @blur="blur"
                  />
                </td>
                <td>{{ ui.checkbox }}</td>
              </tr>
              <tr>
                <td>Boolean / Radio</td>
                <td>
                  <EBoolean
                    :id="ui.boolean.id"
                    :ref="ui.boolean.id"
                    v-model="ui.boolean.value"
                    :label="ui.boolean.label"
                    :required="ui.boolean.required"
                    :disabled="ui.boolean.disabled"
                    :show="ui.boolean.show"
                    :vruntime="vruntime"
                    @blur="blur"
                  />
                </td>
                <td>[{{ ui.boolean }}]</td>
              </tr>
              <tr>
                <td>Select</td>
                <td>
                  <ESelect
                    :id="ui.select.id"
                    :ref="ui.select.id"
                    v-model="ui.select.value"
                    :label="ui.select.label"
                    :required="ui.select.required"
                    :disabled="ui.select.disabled"
                    :show="ui.select.show"
                    :vruntime="vruntime"
                    :options="ui.select.options"
                    as="number"
                    @blur="blur"
                  />
                </td>
                <td>[{{ ui.select }}]</td>
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
                <td>
                  <EButton
                    id="showLoader"
                    label="Show Loader"
                    color="purple"
                    @click="loading"
                  />
                  <ELoading ref="loader" />
                </td>
              </tr>
              <tr>
                <td>Information</td>
                <td>
                  <EButton
                    id="showLoader"
                    label="Show Information"
                    color="purple"
                    @click="
                      () =>
                        this.$refs.message.error(
                          'Berhasil Menyimpan Data Informasi Debitur'
                        )
                    "
                  />
                  <EMessage ref="message" />
                </td>
              </tr>
              <tr>
                <td>Confirmation</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td>Autocomplete</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td>Card</td>
                <td>
                  <ECard
                    id="InformasiDebitur"
                    ref="InformasiDebitur"
                    label="Informasi Debitur"
                    :disabled="ui.shortText.disabled"
                  >
                    <EShortText
                      :id="ui.shortText.id"
                      :ref="ui.shortText.id"
                      v-model="ui.shortText.value"
                      :label="ui.shortText.label"
                      :maxlength="ui.shortText.maxlength"
                      :disabled="ui.shortText.disabled"
                      :show="ui.shortText.show"
                      placeholder="PlaceHoilder"
                      :required="ui.shortText.required"
                      :vruntime="vruntime"
                      @blur="blur"
                    />
                    <EMediumText
                      :id="ui.mediumText.id"
                      :ref="ui.mediumText.id"
                      v-model="ui.mediumText.value"
                      :label="ui.mediumText.label"
                      :maxlength="ui.mediumText.maxlength"
                      :disabled="ui.mediumText.disabled"
                      :show="ui.mediumText.show"
                      :required="ui.mediumText.required"
                      :vruntime="vruntime"
                      @blur="blur"
                    />
                  </ECard>
                </td>
              </tr>
            </tbody>
          </table>
        </EForm>
      </EForm>
    </EForm>
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
      ui: {
        password: {
          ...empty,
          id: 'password',
          label: 'Enter Password',
          value: '',
          maxlength: 10,
        },
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
      },
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
      this.ui.password.value = 'Reset'
      this.ui.shortText.value = 'Reset'
      this.ui.mediumText.value = 'Reset'
      this.ui.longText.value = 'Reset'
      this.ui.textArea.value = 'Reset'
      this.ui.number.value = 123
      this.ui.decimal.value = 123.123
      this.ui.date.value = new Date('1978-09-19')
      this.ui.time.value = '19:00'
      this.ui.boolean.value = false
      this.ui.select.value = 10
      this.ui.checkbox.value = true
    },
    loading() {
      this.$refs.loader.show('Fetch Data Informasi Debitur')
      setTimeout(() => {
        this.$refs.loader.fail()
      }, 5000)
    },
    validateAll() {
      this.$wrapper.validate(this.$refs.firstEntryForm)
    },
    clearError() {
      this.$wrapper.clearError(this.$refs.firstEntryForm)
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
      // this.password.disabled = !this.password.disabled
      // this.shortText.disabled = !this.shortText.disabled
      // this.mediumText.disabled = !this.mediumText.disabled
      // this.longText.disabled = !this.longText.disabled
      // this.textArea.disabled = !this.textArea.disabled
      // this.number.disabled = !this.number.disabled
      // this.decimal.disabled = !this.decimal.disabled
      // this.date.disabled = !this.date.disabled
      // this.time.disabled = !this.time.disabled
      // this.boolean.disabled = !this.boolean.disabled
      // this.button.disabled = !this.button.disabled
      // this.select.disabled = !this.select.disabled
      // this.checkbox.disabled = !this.checkbox.disabled
      // this.$refs.firstEntryForm.clearError()
    },
  },
}
</script>
