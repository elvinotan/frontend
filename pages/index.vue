<template>
  <div>
    <ETabs id="Component" :labels="tabs" selected-tab="Text">
      <EForm id="Text">
        <EText
          id="TextComponent"
          ref="TextComponent"
          v-model="text.value"
          :label="text.label"
          :placeholder="text.placeholder"
          :type="text.type"
          :required="text.required"
          :disabled="text.disabled"
          :show="text.show"
          :vruntime="text.vruntime"
        />
        <div class="text-xs">Template : {{ htmlText }}</div>
        <br />
        <div class="text-xs">Data Object : {{ text }}</div>
        <br />
        <table>
          <thead>
            <tr>
              <td>Props</td>
              <td>Try</td>
              <td>Type</td>
              <td>Required</td>
              <td>Default</td>
              <td>Description</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>id</td>
              <td>-</td>
              <td>String</td>
              <td>true</td>
              <td>null</td>
              <td>id dari component, gax perlu di binding</td>
            </tr>
            <tr>
              <td>label</td>
              <td><input v-model="text.label" type="text" /></td>
              <td>String</td>
              <td>false</td>
              <td>''</td>
              <td>
                Label untuk component, bila tidak di bind maka sign * tidak di
                tampilkan
              </td>
            </tr>
            <tr>
              <td>placeholder</td>
              <td><input v-model="text.placeholder" type="text" /></td>
              <td>String</td>
              <td>false</td>
              <td>''</td>
              <td>Place holder input, akan tampil bila data kosong</td>
            </tr>
            <tr>
              <td>type</td>
              <td>
                <select v-model="text.type">
                  <option value="short">short</option>
                  <option value="medium">medium</option>
                  <option value="long">long</option>
                  <option value="extralong">extralong</option>
                </select>
              </td>
              <td>String</td>
              <td>false</td>
              <td>short</td>
              <td>
                Type dari Text Input untuk menentukan panjang character yg bisa
                di terima. Terdapat berberapa tipe ( short=16, medium=32,
                long=64, extralong=128 ), silakan customize sesuai kebutuhan
              </td>
            </tr>
            <tr>
              <td>required</td>
              <td><input v-model="text.required" type="checkbox" /></td>
              <td>Boolean</td>
              <td>false</td>
              <td>false</td>
              <td>
                Boolean untuk menentukan required atau tidak text, error message
                akan otomatis terisi bila kosong
              </td>
            </tr>
            <tr>
              <td>disabled</td>
              <td><input v-model="text.disabled" type="checkbox" /></td>
              <td>Boolean</td>
              <td>false</td>
              <td>false</td>
              <td>Boolean untuk menentukan disabled atau tidaknya component</td>
            </tr>
            <tr>
              <td>show</td>
              <td><input v-model="text.show" type="checkbox" /></td>
              <td>Boolean</td>
              <td>false</td>
              <td>true</td>
              <td>
                Boolean untuk menentukan component tambil atau tidak. tag ini
                menggunakan v-if
              </td>
            </tr>
            <tr>
              <td>value</td>
              <td><input v-model="text.value" type="input" /></td>
              <td>String</td>
              <td>false</td>
              <td>''</td>
              <td>
                Two way data binding, saat ini data yang di input dalam bentuk
                upprcase, customize sesuai kebutuhan
              </td>
            </tr>
            <tr>
              <td>vruntime</td>
              <td>Function Callback</td>
              <td>Function</td>
              <td>false</td>
              <td>null</td>
              <td>OnType runtime validation, test ketik GAGAL untuk mencoba</td>
            </tr>
          </tbody>
        </table>
        <br />
        <table>
          <thead>
            <tr>
              <td>Method</td>
              <td>Try</td>
              <td>Result</td>
              <td>Description</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>metaData</td>
              <td>
                <button @click="metaData('TextComponent')">Click</button>
              </td>
              <td>{{ metadata }}</td>
              <td>Component Information</td>
            </tr>
            <tr>
              <td>clearError</td>
              <td>
                <button @click="clearError('TextComponent')">Click</button>
              </td>
              <td>Void</td>
              <td>Hapus error, kembalikan ke state component semula</td>
            </tr>
            <tr>
              <td>hasError</td>
              <td>
                <button @click="hasError('TextComponent')">Click</button>
              </td>
              <td>{{ haserror }}</td>
              <td>
                Flag untuk menandakan apakah component pass validasi atau tidak
              </td>
            </tr>
            <tr>
              <td>validate</td>
              <td>
                <button @click="validate('TextComponent')">Click</button>
              </td>
              <td>{{ valid }}</td>
              <td>Lakukan validasi berdasarkan required dan vruntime</td>
            </tr>
          </tbody>
        </table>
      </EForm>
      <EForm id="Password">
        <EPassword
          id="PasswordComponent"
          ref="PasswordComponent"
          v-model="password.value"
          :label="password.label"
          :placeholder="password.placeholder"
          :maxlength="password.maxlength"
          :required="password.required"
          :disabled="password.disabled"
          :show="password.show"
          :vruntime="password.vruntime"
        />
        <div class="text-xs">Template : {{ htmlPassword }}</div>
        <br />
        <div class="text-xs">Data Object : {{ password }}</div>
        <br />
        <table>
          <thead>
            <tr>
              <td>Props</td>
              <td>Try</td>
              <td>Type</td>
              <td>Required</td>
              <td>Default</td>
              <td>Description</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>id</td>
              <td>-</td>
              <td>String</td>
              <td>true</td>
              <td>null</td>
              <td>id dari component, gax perlu di binding</td>
            </tr>
            <tr>
              <td>label</td>
              <td><input v-model="password.label" type="text" /></td>
              <td>String</td>
              <td>false</td>
              <td>''</td>
              <td>
                Label untuk component, bila tidak di bind maka sign * tidak di
                tampilkan
              </td>
            </tr>
            <tr>
              <td>placeholder</td>
              <td><input v-model="password.placeholder" type="text" /></td>
              <td>String</td>
              <td>false</td>
              <td>''</td>
              <td>Place holder input, akan tampil bila data kosong</td>
            </tr>
            <tr>
              <td>maxlength</td>
              <td>
                <input v-model.number="password.maxlength" type="number" />
              </td>
              <td>Number</td>
              <td>false</td>
              <td>16</td>
              <td>Maxiumum charater yang bisa di terima oleh component</td>
            </tr>
            <tr>
              <td>required</td>
              <td><input v-model="password.required" type="checkbox" /></td>
              <td>Boolean</td>
              <td>false</td>
              <td>false</td>
              <td>
                Boolean untuk menentukan required atau tidak text, error message
                akan otomatis terisi bila kosong
              </td>
            </tr>
            <tr>
              <td>disabled</td>
              <td><input v-model="password.disabled" type="checkbox" /></td>
              <td>Boolean</td>
              <td>false</td>
              <td>false</td>
              <td>Boolean untuk menentukan disabled atau tidaknya component</td>
            </tr>
            <tr>
              <td>show</td>
              <td><input v-model="password.show" type="checkbox" /></td>
              <td>Boolean</td>
              <td>false</td>
              <td>true</td>
              <td>
                Boolean untuk menentukan component tambil atau tidak. tag ini
                menggunakan v-if
              </td>
            </tr>
            <tr>
              <td>value</td>
              <td><input v-model="password.value" type="input" /></td>
              <td>String</td>
              <td>false</td>
              <td>''</td>
              <td>
                Two way data binding, saat ini data yang di input dalam bentuk
                upprcase, customize sesuai kebutuhan
              </td>
            </tr>
            <tr>
              <td>vruntime</td>
              <td>Function Callback</td>
              <td>Function</td>
              <td>false</td>
              <td>null</td>
              <td>OnType runtime validation, test ketik GAGAL untuk mencoba</td>
            </tr>
          </tbody>
        </table>
        <br />
        <table>
          <thead>
            <tr>
              <td>Method</td>
              <td>Try</td>
              <td>Result</td>
              <td>Description</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>metaData</td>
              <td>
                <button @click="metaData('PasswordComponent')">Click</button>
              </td>
              <td>{{ metadata }}</td>
              <td>Component Information</td>
            </tr>
            <tr>
              <td>clearError</td>
              <td>
                <button @click="clearError('PasswordComponent')">Click</button>
              </td>
              <td>Void</td>
              <td>Hapus error, kembalikan ke state component semula</td>
            </tr>
            <tr>
              <td>hasError</td>
              <td>
                <button @click="hasError('PasswordComponent')">Click</button>
              </td>
              <td>{{ haserror }}</td>
              <td>
                Flag untuk menandakan apakah component pass validasi atau tidak
              </td>
            </tr>
            <tr>
              <td>validate</td>
              <td>
                <button @click="validate('PasswordComponent')">Click</button>
              </td>
              <td>{{ valid }}</td>
              <td>Lakukan validasi berdasarkan required dan vruntime</td>
            </tr>
          </tbody>
        </table>
      </EForm>
      <EForm id="TextArea">
        <ETextArea
          id="TextAreaComponent"
          ref="TextAreaComponent"
          v-model="textarea.value"
          :label="textarea.label"
          :placeholder="textarea.placeholder"
          :maxlength="textarea.maxlength"
          :required="textarea.required"
          :disabled="textarea.disabled"
          :show="textarea.show"
          :cols="textarea.cols"
          :rows="textarea.rows"
          :vruntime="textarea.vruntime"
        />
        <div class="text-xs">Template : {{ htmlTextarea }}</div>
        <br />
        <div class="text-xs">Data Object : {{ textarea }}</div>
        <br />
        <table>
          <thead>
            <tr>
              <td>Props</td>
              <td>Try</td>
              <td>Type</td>
              <td>Required</td>
              <td>Default</td>
              <td>Description</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>id</td>
              <td>-</td>
              <td>String</td>
              <td>true</td>
              <td>null</td>
              <td>id dari component, gax perlu di binding</td>
            </tr>
            <tr>
              <td>label</td>
              <td><input v-model="textarea.label" type="text" /></td>
              <td>String</td>
              <td>false</td>
              <td>''</td>
              <td>
                Label untuk component, bila tidak di bind maka sign * tidak di
                tampilkan
              </td>
            </tr>
            <tr>
              <td>placeholder</td>
              <td><input v-model="textarea.placeholder" type="text" /></td>
              <td>String</td>
              <td>false</td>
              <td>''</td>
              <td>Place holder component, akan tampil bila data kosong</td>
            </tr>
            <tr>
              <td>maxlength</td>
              <td>
                <input v-model.number="textarea.maxlength" type="number" />
              </td>
              <td>Number</td>
              <td>false</td>
              <td>100</td>
              <td>Maxiumum charater yang bisa di terima oleh component</td>
            </tr>
            <tr>
              <td>cols</td>
              <td>
                <input v-model.number="textarea.cols" type="number" />
              </td>
              <td>Number</td>
              <td>false</td>
              <td>50</td>
              <td>component width display</td>
            </tr>
            <tr>
              <td>rows</td>
              <td>
                <input v-model.number="textarea.rows" type="number" />
              </td>
              <td>Number</td>
              <td>false</td>
              <td>4</td>
              <td>component height display</td>
            </tr>
            <tr>
              <td>required</td>
              <td><input v-model="textarea.required" type="checkbox" /></td>
              <td>Boolean</td>
              <td>false</td>
              <td>false</td>
              <td>
                Boolean untuk menentukan required atau tidak text, error message
                akan otomatis terisi bila kosong
              </td>
            </tr>
            <tr>
              <td>disabled</td>
              <td><input v-model="textarea.disabled" type="checkbox" /></td>
              <td>Boolean</td>
              <td>false</td>
              <td>false</td>
              <td>Boolean untuk menentukan disabled atau tidaknya component</td>
            </tr>
            <tr>
              <td>show</td>
              <td><input v-model="textarea.show" type="checkbox" /></td>
              <td>Boolean</td>
              <td>false</td>
              <td>true</td>
              <td>
                Boolean untuk menentukan component tambil atau tidak. tag ini
                menggunakan v-if
              </td>
            </tr>
            <tr>
              <td>value</td>
              <td><input v-model="textarea.value" type="input" /></td>
              <td>String</td>
              <td>false</td>
              <td>''</td>
              <td>
                Two way data binding, saat ini data yang di input dalam bentuk
                upprcase, customize sesuai kebutuhan
              </td>
            </tr>
            <tr>
              <td>vruntime</td>
              <td>Function Callback</td>
              <td>Function</td>
              <td>false</td>
              <td>null</td>
              <td>OnType runtime validation, test ketik GAGAL untuk mencoba</td>
            </tr>
          </tbody>
        </table>
        <br />
        <table>
          <thead>
            <tr>
              <td>Method</td>
              <td>Try</td>
              <td>Result</td>
              <td>Description</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>metaData</td>
              <td>
                <button @click="metaData('TextAreaComponent')">Click</button>
              </td>
              <td>{{ metadata }}</td>
              <td>Component Information</td>
            </tr>
            <tr>
              <td>clearError</td>
              <td>
                <button @click="clearError('TextAreaComponent')">Click</button>
              </td>
              <td>Void</td>
              <td>Hapus error, kembalikan ke state component semula</td>
            </tr>
            <tr>
              <td>hasError</td>
              <td>
                <button @click="hasError('TextAreaComponent')">Click</button>
              </td>
              <td>{{ haserror }}</td>
              <td>
                Flag untuk menandakan apakah component pass validasi atau tidak
              </td>
            </tr>
            <tr>
              <td>validate</td>
              <td>
                <button @click="validate('TextAreaComponent')">Click</button>
              </td>
              <td>{{ valid }}</td>
              <td>Lakukan validasi berdasarkan required dan vruntime</td>
            </tr>
          </tbody>
        </table>
      </EForm>

      <EForm id="Button">
        <EButton
          id="ButtonComponent"
          ref="ButtonComponent"
          :label="button.label"
          :disabled="button.disabled"
          :show="button.show"
          :color="button.color"
        />
        <div class="text-xs">Template : {{ htmlButton }}</div>
        <br />
        <div class="text-xs">Data Object : {{ button }}</div>
        <br />
        <table>
          <thead>
            <tr>
              <td>Props</td>
              <td>Try</td>
              <td>Type</td>
              <td>Required</td>
              <td>Default</td>
              <td>Description</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>id</td>
              <td>-</td>
              <td>String</td>
              <td>true</td>
              <td>null</td>
              <td>id dari component, gax perlu di binding</td>
            </tr>
            <tr>
              <td>label</td>
              <td><input v-model="button.label" type="text" /></td>
              <td>String</td>
              <td>false</td>
              <td>''</td>
              <td>Label untuk component</td>
            </tr>
            <tr>
              <td>color</td>
              <td>
                <select v-model="button.color">
                  <option value="gray">gray</option>
                  <option value="green">green</option>
                  <option value="red">red</option>
                  <option value="yellow">yellow</option>
                </select>
              </td>
              <td>String</td>
              <td>false</td>
              <td>gray</td>
              <td>Component background color</td>
            </tr>
            <tr>
              <td>disabled</td>
              <td><input v-model="button.disabled" type="checkbox" /></td>
              <td>Boolean</td>
              <td>false</td>
              <td>false</td>
              <td>
                Boolean untuk menentukan disabled atau tidaknya component,
              </td>
            </tr>
            <tr>
              <td>show</td>
              <td><input v-model="button.show" type="checkbox" /></td>
              <td>Boolean</td>
              <td>false</td>
              <td>true</td>
              <td>
                Boolean untuk menentukan component tambil atau tidak. tag ini
                menggunakan v-if
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <table>
          <thead>
            <tr>
              <td>Method</td>
              <td>Try</td>
              <td>Result</td>
              <td>Description</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>metaData</td>
              <td>
                <button @click="metaData('ButtonComponent')">Click</button>
              </td>
              <td>{{ metadata }}</td>
              <td>Component Information</td>
            </tr>
          </tbody>
        </table>
      </EForm>
      <EForm id="Number">
        <ENumber
          id="NumberComponent"
          ref="NumberComponent"
          v-model.number="number.value"
          :label="number.label"
          :placeholder="number.placeholder"
          :maxlength="number.maxlength"
          :required="number.required"
          :disabled="number.disabled"
          :show="number.show"
          :vruntime="number.vruntime"
          :allow-minus="number.allowMinus"
          :separator="number.separator"
          :minimum="number.minimum"
          :maximum="number.maximum"
        />
        <div class="text-xs">Template : {{ htmlNumber }}</div>
        <br />
        <div class="text-xs">Data Object : {{ number }}</div>
        <br />
        <table>
          <thead>
            <tr>
              <td>Props</td>
              <td>Try</td>
              <td>Type</td>
              <td>Required</td>
              <td>Default</td>
              <td>Description</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>id</td>
              <td>-</td>
              <td>String</td>
              <td>true</td>
              <td>null</td>
              <td>id dari component, gax perlu di binding</td>
            </tr>
            <tr>
              <td>label</td>
              <td><input v-model="number.label" type="text" /></td>
              <td>String</td>
              <td>false</td>
              <td>''</td>
              <td>Label untuk component</td>
            </tr>
            <tr>
              <td>placeholder</td>
              <td><input v-model="number.placeholder" type="text" /></td>
              <td>String</td>
              <td>false</td>
              <td>''</td>
              <td>Place holder input, akan tampil bila data kosong</td>
            </tr>
            <tr>
              <td>maxlength</td>
              <td>
                <input v-model.number="number.maxlength" type="number" />
              </td>
              <td>Number</td>
              <td>false</td>
              <td>15</td>
              <td>
                Maxiumum charater yang bisa di terima oleh component, termasuk
                separarator and sign
              </td>
            </tr>
            <tr>
              <td>disabled</td>
              <td><input v-model="number.disabled" type="checkbox" /></td>
              <td>Boolean</td>
              <td>false</td>
              <td>false</td>
              <td>
                Boolean untuk menentukan disabled atau tidaknya component,
              </td>
            </tr>
            <tr>
              <td>required</td>
              <td><input v-model="number.required" type="checkbox" /></td>
              <td>Boolean</td>
              <td>false</td>
              <td>false</td>
              <td>
                Boolean untuk menentukan required atau tidak text, error message
                akan otomatis terisi bila kosong
              </td>
            </tr>
            <tr>
              <td>show</td>
              <td><input v-model="number.show" type="checkbox" /></td>
              <td>Boolean</td>
              <td>false</td>
              <td>true</td>
              <td>
                Boolean untuk menentukan component tambil atau tidak. tag ini
                menggunakan v-if
              </td>
            </tr>
            <tr>
              <td>vruntime</td>
              <td>Function Callback</td>
              <td>Function</td>
              <td>false</td>
              <td>null</td>
              <td>OnType runtime validation, test ketik 666 untuk mencoba</td>
            </tr>
            <tr>
              <td>value</td>
              <td><input v-model.number="number.value" type="input" /></td>
              <td>String</td>
              <td>false</td>
              <td>''</td>
              <td>
                Two way data binding, saat ini data yang di input dalam bentuk
                upprcase, customize sesuai kebutuhan
              </td>
            </tr>
            <tr>
              <td>allowMinus</td>
              <td><input v-model="number.allowMinus" type="checkbox" /></td>
              <td>Boolean</td>
              <td>false</td>
              <td>false</td>
              <td>Boleah tidaknya menggunakan sign minus(-)</td>
            </tr>
            <tr>
              <td>separator</td>
              <td><input v-model="number.separator" type="checkbox" /></td>
              <td>Boolean</td>
              <td>false</td>
              <td>false</td>
              <td>
                Number formated dengan separator default menggunakan config US,
                koma untuk ribuan dan . untuk fraksi
              </td>
            </tr>
            <tr>
              <td>minimum</td>
              <td>
                <input v-model.number="number.minimum" type="number" />
              </td>
              <td>Number</td>
              <td>false</td>
              <td>null</td>
              <td>Validasi minumum angka yang bisa di input</td>
            </tr>
            <tr>
              <td>maxlength</td>
              <td>
                <input v-model.number="number.maximum" type="number" />
              </td>
              <td>Number</td>
              <td>false</td>
              <td>null</td>
              <td>Validasi maximum angka yang bisa di input</td>
            </tr>
          </tbody>
        </table>
        <br />
        <table>
          <thead>
            <tr>
              <td>Method</td>
              <td>Try</td>
              <td>Result</td>
              <td>Description</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>metaData</td>
              <td>
                <button @click="metaData('NumberComponent')">Click</button>
              </td>
              <td>{{ metadata }}</td>
              <td>Component Information</td>
            </tr>
            <tr>
              <td>clearError</td>
              <td>
                <button @click="clearError('NumberComponent')">Click</button>
              </td>
              <td>Void</td>
              <td>Hapus error, kembalikan ke state component semula</td>
            </tr>
            <tr>
              <td>hasError</td>
              <td>
                <button @click="hasError('NumberComponent')">Click</button>
              </td>
              <td>{{ haserror }}</td>
              <td>
                Flag untuk menandakan apakah component pass validasi atau tidak
              </td>
            </tr>
            <tr>
              <td>validate</td>
              <td>
                <button @click="validate('NumberComponent')">Click</button>
              </td>
              <td>{{ valid }}</td>
              <td>Lakukan validasi berdasarkan required dan vruntime</td>
            </tr>
          </tbody>
        </table>
      </EForm>
      <EForm id="Decimal">
        <EDecimal
          id="DecimalComponent"
          ref="DecimalComponent"
          v-model.number="decimal.value"
          :label="decimal.label"
          :placeholder="decimal.placeholder"
          :maxlength="decimal.maxlength"
          :required="decimal.required"
          :disabled="decimal.disabled"
          :show="decimal.show"
          :vruntime="decimal.vruntime"
          :allow-minus="decimal.allowMinus"
          :separator="decimal.separator"
          :minimum="decimal.minimum"
          :maximum="decimal.maximum"
          :minimum-fraction-digits="decimal.minimumFractionDigits"
          :maximum-fraction-digits="decimal.maximumFractionDigits"
        />
        <div class="text-xs">Template : {{ htmlDecimal }}</div>
        <br />
        <div class="text-xs">Data Object : {{ decimal }}</div>
        <br />
        <table>
          <thead>
            <tr>
              <td>Props</td>
              <td>Try</td>
              <td>Type</td>
              <td>Required</td>
              <td>Default</td>
              <td>Description</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>id</td>
              <td>-</td>
              <td>String</td>
              <td>true</td>
              <td>null</td>
              <td>id dari component, gax perlu di binding</td>
            </tr>
            <tr>
              <td>label</td>
              <td><input v-model="decimal.label" type="text" /></td>
              <td>String</td>
              <td>false</td>
              <td>''</td>
              <td>Label untuk component</td>
            </tr>
            <tr>
              <td>placeholder</td>
              <td><input v-model="decimal.placeholder" type="text" /></td>
              <td>String</td>
              <td>false</td>
              <td>''</td>
              <td>Place holder input, akan tampil bila data kosong</td>
            </tr>
            <tr>
              <td>maxlength</td>
              <td>
                <input v-model.number="decimal.maxlength" type="number" />
              </td>
              <td>Number</td>
              <td>false</td>
              <td>18</td>
              <td>
                Maxiumum charater yang bisa di terima oleh component, termasuk
                separarator and sign
              </td>
            </tr>
            <tr>
              <td>disabled</td>
              <td><input v-model="decimal.disabled" type="checkbox" /></td>
              <td>Boolean</td>
              <td>false</td>
              <td>false</td>
              <td>
                Boolean untuk menentukan disabled atau tidaknya component,
              </td>
            </tr>
            <tr>
              <td>required</td>
              <td><input v-model="decimal.required" type="checkbox" /></td>
              <td>Boolean</td>
              <td>false</td>
              <td>false</td>
              <td>
                Boolean untuk menentukan required atau tidak text, error message
                akan otomatis terisi bila kosong
              </td>
            </tr>
            <tr>
              <td>show</td>
              <td><input v-model="decimal.show" type="checkbox" /></td>
              <td>Boolean</td>
              <td>false</td>
              <td>true</td>
              <td>
                Boolean untuk menentukan component tambil atau tidak. tag ini
                menggunakan v-if
              </td>
            </tr>
            <tr>
              <td>vruntime</td>
              <td>Function Callback</td>
              <td>Function</td>
              <td>false</td>
              <td>null</td>
              <td>OnType runtime validation, test ketik 666 untuk mencoba</td>
            </tr>
            <tr>
              <td>value</td>
              <td><input v-model.number="decimal.value" type="input" /></td>
              <td>String</td>
              <td>false</td>
              <td>''</td>
              <td>
                Two way data binding, saat ini data yang di input dalam bentuk
                upprcase, customize sesuai kebutuhan
              </td>
            </tr>
            <tr>
              <td>allowMinus</td>
              <td><input v-model="decimal.allowMinus" type="checkbox" /></td>
              <td>Boolean</td>
              <td>false</td>
              <td>false</td>
              <td>Boleah tidaknya menggunakan sign minus(-)</td>
            </tr>
            <tr>
              <td>separator</td>
              <td><input v-model="decimal.separator" type="checkbox" /></td>
              <td>Boolean</td>
              <td>false</td>
              <td>false</td>
              <td>
                Number formated dengan separator default menggunakan config US,
                koma untuk ribuan dan . untuk fraksi
              </td>
            </tr>
            <tr>
              <td>minimum</td>
              <td>
                <input v-model.number="decimal.minimum" type="number" />
              </td>
              <td>Number</td>
              <td>false</td>
              <td>null</td>
              <td>Validasi minumum angka yang bisa di input</td>
            </tr>
            <tr>
              <td>maxlength</td>
              <td>
                <input v-model.number="decimal.maximum" type="number" />
              </td>
              <td>Number</td>
              <td>false</td>
              <td>null</td>
              <td>Validasi maximum angka yang bisa di input</td>
            </tr>
            <tr>
              <td>minimumFractionDigits</td>
              <td>
                <input
                  v-model.number="decimal.minimumFractionDigits"
                  type="number"
                />
              </td>
              <td>Number</td>
              <td>false</td>
              <td>0</td>
              <td>Minimum fraksi digit</td>
            </tr>

            <tr>
              <td>maximumFractionDigits</td>
              <td>
                <input
                  v-model.number="decimal.maximumFractionDigits"
                  type="number"
                />
              </td>
              <td>Number</td>
              <td>false</td>
              <td>2</td>
              <td>Maximum fraksi digit</td>
            </tr>
          </tbody>
        </table>
        <br />
        <table>
          <thead>
            <tr>
              <td>Method</td>
              <td>Try</td>
              <td>Result</td>
              <td>Description</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>metaData</td>
              <td>
                <button @click="metaData('DecimalComponent')">Click</button>
              </td>
              <td>{{ metadata }}</td>
              <td>Component Information</td>
            </tr>
            <tr>
              <td>clearError</td>
              <td>
                <button @click="clearError('DecimalComponent')">Click</button>
              </td>
              <td>Void</td>
              <td>Hapus error, kembalikan ke state component semula</td>
            </tr>
            <tr>
              <td>hasError</td>
              <td>
                <button @click="hasError('DecimalComponent')">Click</button>
              </td>
              <td>{{ haserror }}</td>
              <td>
                Flag untuk menandakan apakah component pass validasi atau tidak
              </td>
            </tr>
            <tr>
              <td>validate</td>
              <td>
                <button @click="validate('DecimalComponent')">Click</button>
              </td>
              <td>{{ valid }}</td>
              <td>Lakukan validasi berdasarkan required dan vruntime</td>
            </tr>
          </tbody>
        </table>
      </EForm>
      <EForm id="Date">
        <EDate
          id="DateComponent"
          ref="DateComponent"
          v-model="date.value"
          :label="date.label"
          :required="date.required"
          :disabled="date.disabled"
          :show="date.show"
          :vruntime="date.vruntime"
          :minimum="date.minimum"
          :maximum="date.maximum"
        />
        <div class="text-xs">Template : {{ htmlDate }}</div>
        <br />
        <div class="text-xs">Data Object : {{ date }}</div>
        <br />
        <table>
          <thead>
            <tr>
              <td>Props</td>
              <td>Try</td>
              <td>Type</td>
              <td>Required</td>
              <td>Default</td>
              <td>Description</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>id</td>
              <td>-</td>
              <td>String</td>
              <td>true</td>
              <td>null</td>
              <td>id dari component, gax perlu di binding</td>
            </tr>
            <tr>
              <td>label</td>
              <td><input v-model="date.label" type="text" /></td>
              <td>String</td>
              <td>false</td>
              <td>''</td>
              <td>Label untuk component</td>
            </tr>
            <tr>
              <td>disabled</td>
              <td><input v-model="date.disabled" type="checkbox" /></td>
              <td>Boolean</td>
              <td>false</td>
              <td>false</td>
              <td>
                Boolean untuk menentukan disabled atau tidaknya component,
              </td>
            </tr>
            <tr>
              <td>required</td>
              <td><input v-model="date.required" type="checkbox" /></td>
              <td>Boolean</td>
              <td>false</td>
              <td>false</td>
              <td>
                Boolean untuk menentukan required atau tidak text, error message
                akan otomatis terisi bila kosong
              </td>
            </tr>
            <tr>
              <td>show</td>
              <td><input v-model="date.show" type="checkbox" /></td>
              <td>Boolean</td>
              <td>false</td>
              <td>true</td>
              <td>
                Boolean untuk menentukan component tambil atau tidak. tag ini
                menggunakan v-if
              </td>
            </tr>
            <tr>
              <td>vruntime</td>
              <td>Function Callback</td>
              <td>Function</td>
              <td>false</td>
              <td>null</td>
              <td>OnType runtime validation, test ketik 666 untuk mencoba</td>
            </tr>
            <tr>
              <td>value</td>
              <td><input v-model.number="date.value" type="input" /></td>
              <td>String</td>
              <td>false</td>
              <td>''</td>
              <td>
                Two way data binding, saat ini data yang di input dalam bentuk
                upprcase, customize sesuai kebutuhan
              </td>
            </tr>
            <tr>
              <td>minimum</td>
              <td>2021-09-01</td>
              <td>Number</td>
              <td>false</td>
              <td>null</td>
              <td>Validasi minumum tanggal yang bisa di input</td>
            </tr>
            <tr>
              <td>maxlength</td>
              <td>2021-09-30</td>
              <td>Number</td>
              <td>false</td>
              <td>null</td>
              <td>Validasi maximum tanggal yang bisa di input</td>
            </tr>
          </tbody>
        </table>
        <br />
        <table>
          <thead>
            <tr>
              <td>Method</td>
              <td>Try</td>
              <td>Result</td>
              <td>Description</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>metaData</td>
              <td>
                <button @click="metaData('DateComponent')">Click</button>
              </td>
              <td>{{ metadata }}</td>
              <td>Component Information</td>
            </tr>
            <tr>
              <td>clearError</td>
              <td>
                <button @click="clearError('DateComponent')">Click</button>
              </td>
              <td>Void</td>
              <td>Hapus error, kembalikan ke state component semula</td>
            </tr>
            <tr>
              <td>hasError</td>
              <td>
                <button @click="hasError('DateComponent')">Click</button>
              </td>
              <td>{{ haserror }}</td>
              <td>
                Flag untuk menandakan apakah component pass validasi atau tidak
              </td>
            </tr>
            <tr>
              <td>validate</td>
              <td>
                <button @click="validate('DateComponent')">Click</button>
              </td>
              <td>{{ valid }}</td>
              <td>Lakukan validasi berdasarkan required dan vruntime</td>
            </tr>
          </tbody>
        </table>
      </EForm>
      <EForm id="Time">
        <ETime
          id="TimeComponent"
          ref="TimeComponent"
          v-model="time.value"
          :label="time.label"
          :required="time.required"
          :disabled="time.disabled"
          :show="time.show"
          :vruntime="time.vruntime"
          :minimum="time.minimum"
          :maximum="time.maximum"
        />
        <div class="text-xs">Template : {{ htmlTime }}</div>
        <br />
        <div class="text-xs">Data Object : {{ time }}</div>
        <br />
        <table>
          <thead>
            <tr>
              <td>Props</td>
              <td>Try</td>
              <td>Type</td>
              <td>Required</td>
              <td>Default</td>
              <td>Description</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>id</td>
              <td>-</td>
              <td>String</td>
              <td>true</td>
              <td>null</td>
              <td>id dari component, gax perlu di binding</td>
            </tr>
            <tr>
              <td>label</td>
              <td><input v-model="time.label" type="text" /></td>
              <td>String</td>
              <td>false</td>
              <td>''</td>
              <td>Label untuk component</td>
            </tr>
            <tr>
              <td>disabled</td>
              <td><input v-model="time.disabled" type="checkbox" /></td>
              <td>Boolean</td>
              <td>false</td>
              <td>false</td>
              <td>
                Boolean untuk menentukan disabled atau tidaknya component,
              </td>
            </tr>
            <tr>
              <td>required</td>
              <td><input v-model="time.required" type="checkbox" /></td>
              <td>Boolean</td>
              <td>false</td>
              <td>false</td>
              <td>
                Boolean untuk menentukan required atau tidak text, error message
                akan otomatis terisi bila kosong
              </td>
            </tr>
            <tr>
              <td>show</td>
              <td><input v-model="time.show" type="checkbox" /></td>
              <td>Boolean</td>
              <td>false</td>
              <td>true</td>
              <td>
                Boolean untuk menentukan component tambil atau tidak. tag ini
                menggunakan v-if
              </td>
            </tr>
            <tr>
              <td>vruntime</td>
              <td>Function Callback</td>
              <td>Function</td>
              <td>false</td>
              <td>null</td>
              <td>OnType runtime validation, test ketik 666 untuk mencoba</td>
            </tr>
            <tr>
              <td>value</td>
              <td><input v-model="time.value" type="input" /></td>
              <td>String</td>
              <td>false</td>
              <td>''</td>
              <td>
                Two way data binding, saat ini data yang di input dalam bentuk
                upprcase, customize sesuai kebutuhan
              </td>
            </tr>
            <tr>
              <td>minimum</td>
              <td><input v-model="time.minimum" type="input" /></td>
              <td>String</td>
              <td>false</td>
              <td>null</td>
              <td>
                Validasi minumum jam/menit yang bisa di input, format HH:mm
              </td>
            </tr>
            <tr>
              <td>maximum</td>
              <td><input v-model="time.maximum" type="input" /></td>
              <td>String</td>
              <td>false</td>
              <td>null</td>
              <td>
                Validasi maximum jam/menit yang bisa di input, format HH:mm
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <table>
          <thead>
            <tr>
              <td>Method</td>
              <td>Try</td>
              <td>Result</td>
              <td>Description</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>metaData</td>
              <td>
                <button @click="metaData('TimeComponent')">Click</button>
              </td>
              <td>{{ metadata }}</td>
              <td>Component Information</td>
            </tr>
            <tr>
              <td>clearError</td>
              <td>
                <button @click="clearError('TimeComponent')">Click</button>
              </td>
              <td>Void</td>
              <td>Hapus error, kembalikan ke state component semula</td>
            </tr>
            <tr>
              <td>hasError</td>
              <td>
                <button @click="hasError('TimeComponent')">Click</button>
              </td>
              <td>{{ haserror }}</td>
              <td>
                Flag untuk menandakan apakah component pass validasi atau tidak
              </td>
            </tr>
            <tr>
              <td>validate</td>
              <td>
                <button @click="validate('TimeComponent')">Click</button>
              </td>
              <td>{{ valid }}</td>
              <td>Lakukan validasi berdasarkan required dan vruntime</td>
            </tr>
          </tbody>
        </table>
      </EForm>
      <EForm id="Checkbox">
        <ECheckBox
          id="CheckboxComponent"
          ref="CheckboxComponent"
          v-model.number="checkbox.value"
          :label="checkbox.label"
          :disabled="checkbox.disabled"
          :show="checkbox.show"
          :vruntime="checkbox.vruntime"
          :selected="checkbox.selected"
          :unselected="checkbox.unselected"
        />
        <div class="text-xs">Template : {{ htmlCheckbox }}</div>
        <br />
        <div class="text-xs">Data Object : {{ checkbox }}</div>
        <br />
        <table>
          <thead>
            <tr>
              <td>Props</td>
              <td>Try</td>
              <td>Type</td>
              <td>Required</td>
              <td>Default</td>
              <td>Description</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>id</td>
              <td>-</td>
              <td>String</td>
              <td>true</td>
              <td>null</td>
              <td>id dari component, gax perlu di binding</td>
            </tr>
            <tr>
              <td>label</td>
              <td><input v-model="checkbox.label" type="text" /></td>
              <td>String</td>
              <td>false</td>
              <td>''</td>
              <td>Label untuk component</td>
            </tr>
            <tr>
              <td>disabled</td>
              <td><input v-model="checkbox.disabled" type="checkbox" /></td>
              <td>Boolean</td>
              <td>false</td>
              <td>false</td>
              <td>
                Boolean untuk menentukan disabled atau tidaknya component,
              </td>
            </tr>
            <tr>
              <td>show</td>
              <td><input v-model="checkbox.show" type="checkbox" /></td>
              <td>Boolean</td>
              <td>false</td>
              <td>true</td>
              <td>
                Boolean untuk menentukan component tambil atau tidak. tag ini
                menggunakan v-if
              </td>
            </tr>
            <tr>
              <td>vruntime</td>
              <td>Function Callback</td>
              <td>Function</td>
              <td>false</td>
              <td>null</td>
              <td>OnType runtime validation, test ketik 666 untuk mencoba</td>
            </tr>
            <tr>
              <td>value</td>
              <td><input v-model="checkbox.value" type="input" /></td>
              <td>String</td>
              <td>false</td>
              <td>''</td>
              <td>
                Two way data binding, saat ini data yang di input dalam bentuk
                upprcase, customize sesuai kebutuhan
              </td>
            </tr>
            <tr>
              <td>selected</td>
              <td><input v-model="checkbox.selected" type="text" /></td>
              <td>[String, Number, Boolean]</td>
              <td>false</td>
              <td>true</td>
              <td>Value yang ke set pada model, apabila checkbok terpilih</td>
            </tr>
            <tr>
              <td>unselected</td>
              <td><input v-model="checkbox.unselected" type="text" /></td>
              <td>[String, Number, Boolean]</td>
              <td>false</td>
              <td>false</td>
              <td>
                Value yang ke set pada model, apabila checkbok tidak terpilih
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <table>
          <thead>
            <tr>
              <td>Method</td>
              <td>Try</td>
              <td>Result</td>
              <td>Description</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>metaData</td>
              <td>
                <button @click="metaData('CheckboxComponent')">Click</button>
              </td>
              <td>{{ metadata }}</td>
              <td>Component Information</td>
            </tr>
          </tbody>
        </table>
      </EForm>
      <EForm id="Boolean">
        <EBoolean
          id="BooleanComponent"
          ref="BooleanComponent"
          v-model="boolean.value"
          :label="boolean.label"
          :placeholder="boolean.placeholder"
          :required="boolean.required"
          :disabled="boolean.disabled"
          :show="boolean.show"
          :vruntime="boolean.vruntime"
          :type="boolean.type"
        />
        <div class="text-xs">Template : {{ htmlBoolean }}</div>
        <br />
        <div class="text-xs">Data Object : {{ boolean }}</div>
        <br />
        <table>
          <thead>
            <tr>
              <td>Props</td>
              <td>Try</td>
              <td>Type</td>
              <td>Required</td>
              <td>Default</td>
              <td>Description</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>id</td>
              <td>-</td>
              <td>String</td>
              <td>true</td>
              <td>null</td>
              <td>id dari component, gax perlu di binding</td>
            </tr>
            <tr>
              <td>label</td>
              <td><input v-model="boolean.label" type="text" /></td>
              <td>String</td>
              <td>false</td>
              <td>''</td>
              <td>Label untuk component</td>
            </tr>
            <tr>
              <td>placeholder</td>
              <td><input v-model="boolean.placeholder" type="text" /></td>
              <td>String</td>
              <td>false</td>
              <td>''</td>
              <td>Place holder input, akan tampil bila data kosong</td>
            </tr>
            <tr>
              <td>required</td>
              <td><input v-model="boolean.required" type="checkbox" /></td>
              <td>Boolean</td>
              <td>false</td>
              <td>false</td>
              <td>
                Boolean untuk menentukan required atau tidak text, error message
                akan otomatis terisi bila kosong
              </td>
            </tr>
            <tr>
              <td>disabled</td>
              <td><input v-model="boolean.disabled" type="checkbox" /></td>
              <td>Boolean</td>
              <td>false</td>
              <td>false</td>
              <td>
                Boolean untuk menentukan disabled atau tidaknya component,
              </td>
            </tr>
            <tr>
              <td>show</td>
              <td><input v-model="boolean.show" type="checkbox" /></td>
              <td>Boolean</td>
              <td>false</td>
              <td>true</td>
              <td>
                Boolean untuk menentukan component tambil atau tidak. tag ini
                menggunakan v-if
              </td>
            </tr>
            <tr>
              <td>vruntime</td>
              <td>Function Callback</td>
              <td>Function</td>
              <td>false</td>
              <td>null</td>
              <td>OnType runtime validation, test ketik 666 untuk mencoba</td>
            </tr>
            <tr>
              <td>value</td>
              <td><input v-model="boolean.value" type="input" /></td>
              <td>String</td>
              <td>false</td>
              <td>''</td>
              <td>
                Two way data binding, saat ini data yang di input dalam bentuk
                upprcase, customize sesuai kebutuhan
              </td>
            </tr>
            <tr>
              <td>type</td>
              <td>
                <select v-model="boolean.type">
                  <option value="TrueFalse">TrueFalse</option>
                  <option value="YesNo">YesNo</option>
                  <option value="ActiveInActive">ActiveInActive</option>
                </select>
              </td>
              <td>String</td>
              <td>false</td>
              <td>TrueFalse</td>
              <td>Type select drop down option, terdapat 3 jenis type</td>
            </tr>
          </tbody>
        </table>
        <br />
        <table>
          <thead>
            <tr>
              <td>Method</td>
              <td>Try</td>
              <td>Result</td>
              <td>Description</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>metaData</td>
              <td>
                <button @click="metaData('BooleanComponent')">Click</button>
              </td>
              <td>{{ metadata }}</td>
              <td>Component Information</td>
            </tr>
            <tr>
              <td>clearError</td>
              <td>
                <button @click="clearError('BooleanComponent')">Click</button>
              </td>
              <td>Void</td>
              <td>Hapus error, kembalikan ke state component semula</td>
            </tr>
            <tr>
              <td>hasError</td>
              <td>
                <button @click="hasError('BooleanComponent')">Click</button>
              </td>
              <td>{{ haserror }}</td>
              <td>
                Flag untuk menandakan apakah component pass validasi atau tidak
              </td>
            </tr>
            <tr>
              <td>validate</td>
              <td>
                <button @click="validate('BooleanComponent')">Click</button>
              </td>
              <td>{{ valid }}</td>
              <td>Lakukan validasi berdasarkan required dan vruntime</td>
            </tr>
          </tbody>
        </table>
      </EForm>
    </ETabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      htmlText:
        '<EText id="" ref="" v-model="" :label="" :placeholder="" :type="" :required="" :disabled="" :show="" />',
      htmlPassword:
        '<EPassword id="" ref="" v-model="" :label="" :placeholder="" :maxlength="" :required="" :disabled="" :show="" />',
      htmlTextarea:
        '<ETextArea id="" ref="" v-model="" :label="" :placeholder="" :maxlength="" :required="" :disabled="" :cols="" :rows="" :show="" />',
      htmlButton:
        '<EButton id="" ref="" :label="" :disabled="" :color="" :show="" />',
      htmlNumber:
        '<ENumber id="" ref="" v-model="" :label="" :placeholder="" :maxlength="" :required="" :disabled="" :show="" :allowMinus="" :separator="" :minimum="" :maximum=""/>',
      htmlDecimal:
        '<EDecimal id="" ref="" v-model="" :label="" :placeholder="" :maxlength="" :required="" :disabled="" :show="" :allowMinus="" :separator="" :minimum="" :maximum="" :minimumFractionDigits="" :maximumFractionDigits=""/>',
      htmlDate:
        '<EDate id="" ref="" v-model="" :label="" :required="" :disabled="" :show="" :minimum="" :maximum=""/>',
      htmlTime:
        '<ETime id="" ref="" v-model="" :label="" :required="" :disabled="" :show="" :minimum="" :maximum=""/>',
      htmlCheckbox:
        '<ECheckBox id="" ref="" v-model="" :label="" :disabled="" :show="" :selected="" :unselected=""/>',
      htmlBoolean:
        '<EBoolean id="" ref="" v-model="" :label="" :placeholder="" :required="" :disabled="" :show="" :type="" />',
      haserror: null,
      metadata: null,
      valid: null,
      tabs: [
        { label: 'Text' },
        { label: 'Password' },
        { label: 'TextArea' },
        { label: 'Button' },
        { label: 'Number' },
        { label: 'Decimal' },
        { label: 'Date' },
        { label: 'Time' },
        { label: 'Checkbox' },
        { label: 'Boolean' },
        { label: 'Select' },
        { label: 'LocalPagination' },
        { label: 'ServerPagination' },
        { label: 'Dialog' },
        { label: 'Loading' },
        { label: 'Message' },
        { label: 'Confirmation' },
        { label: 'Card' },
        { label: 'Tabs' },
        { label: 'PageLoader' },
        { label: 'Form' },
        { label: 'Col' },
      ],
      text: {
        label: 'Full Name',
        placeholder: 'Placeholder',
        type: 'short',
        required: true,
        disabled: false,
        show: true,
        value: '',
        vruntime: (data) => {
          if (data === 'GAGAL') return 'Tidak boleah input GAGAL'
        },
      },
      password: {
        label: 'Masukan Password',
        placeholder: 'Placeholder',
        maxlength: 10,
        required: true,
        disabled: false,
        show: true,
        value: '',
        vruntime: (data) => {
          if (data === 'GAGAL') return 'Tidak boleah input GAGAL'
        },
      },
      textarea: {
        label: 'Blog',
        placeholder: 'Placeholder',
        maxlength: 100,
        required: true,
        disabled: false,
        show: true,
        value: '',
        cols: 50,
        rows: 4,
        vruntime: (data) => {
          if (data === 'GAGAL') return 'Tidak boleah input GAGAL'
        },
      },
      button: {
        label: 'Save',
        color: 'gray',
        disabled: false,
        show: true,
      },
      number: {
        label: 'Tax',
        placeholder: 'Input you yearly Tax',
        maxlength: 15,
        required: false,
        disabled: false,
        show: true,
        value: 0,
        allowMinus: false,
        separator: false,
        minimum: null,
        maximum: null,
        vruntime: (data) => {
          if (data === 666) return 'Tidak boleah input 666'
        },
      },
      decimal: {
        label: 'Price',
        placeholder: 'Input your price',
        maxlength: 18,
        required: false,
        disabled: false,
        show: true,
        value: 0,
        allowMinus: false,
        separator: false,
        minimum: null,
        maximum: null,
        minimumFractionDigits: 0,
        maximumFractionDigits: 5,
        vruntime: (data) => {
          if (data === 666) return 'Tidak boleah input 666'
        },
      },
      date: {
        label: 'BirthDate',
        placeholder: 'Happy Birthday',
        required: false,
        disabled: false,
        show: true,
        value: new Date(),
        minimum: new Date(2021, 9, 15),
        maximum: new Date(2021, 9, 20),
        vruntime: (data) => {
          if (data === 666) return 'Tidak boleah input 666'
        },
      },
      time: {
        label: 'BirthTime',
        placeholder: 'Masukan Jam Menit',
        required: false,
        disabled: false,
        show: true,
        value: '10:30',
        minimum: '10:15',
        maximum: '11:15',
        vruntime: (data) => {
          if (data === 666) return 'Tidak boleah input 666'
        },
      },
      checkbox: {
        label: 'Active',
        disabled: false,
        show: true,
        value: null,
        selected: 'Yes, Active',
        unselected: 'No, Inactive',
        vruntime: (data) => {
          console.log(data)
        },
      },
      boolean: {
        label: 'Sudah Nikah',
        placeholder: 'Please Select...',
        required: false,
        disabled: false,
        show: true,
        value: null,
        type: 'TrueFalse',
        vruntime: (data) => {
          console.log(data)
        },
      },
    }
  },
  methods: {
    clearError(ref) {
      this.$refs[ref].clearError()
    },
    metaData(ref) {
      this.metadata = this.$refs[ref].metaData()
    },
    validate(ref) {
      this.valid = this.$refs[ref].validate()
    },
    hasError(ref) {
      this.haserror = this.$refs[ref].hasError()
    },
  },
}
</script>
<style scoped>
table,
th,
td {
  border: 1px solid black;
}
</style>
