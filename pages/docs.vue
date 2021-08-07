<template>
  <div>
    <ETabs id="Showroom" :labels="[{ label: 'Component' }, { label: 'Plugin' }, { label: 'Demo List' }, { label: 'Demo Entry' }]" selected-tab="Component">
      <EForm id="Component">
        <ETabs id="Component" :labels="tabs" selected-tab="EText">
          <EForm id="EText">
            <EText id="TextComponent" ref="TextComponent" v-model="text.value" :label="text.label" :placeholder="text.placeholder" :type="text.type" :required="text.required" :disabled="text.disabled" :show="text.show" :vruntime="text.vruntime" />
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
                  <td>Label untuk component, bila tidak di bind maka sign * tidak di tampilkan</td>
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
                  <td>Type dari Text Input untuk menentukan panjang character yg bisa di terima. Terdapat berberapa tipe ( short=16, medium=32, long=64, extralong=128 ), silakan customize sesuai kebutuhan</td>
                </tr>
                <tr>
                  <td>required</td>
                  <td><input v-model="text.required" type="checkbox" /></td>
                  <td>Boolean</td>
                  <td>false</td>
                  <td>false</td>
                  <td>Boolean untuk menentukan required atau tidak text, error message akan otomatis terisi bila kosong</td>
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
                  <td>Boolean untuk menentukan component tampil atau tidak. tag ini menggunakan v-if</td>
                </tr>
                <tr>
                  <td>value</td>
                  <td><input v-model="text.value" type="input" /></td>
                  <td>String</td>
                  <td>false</td>
                  <td>''</td>
                  <td>Two way data binding, saat ini data yang di input dalam bentuk upprcase, customize sesuai kebutuhan</td>
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
                  <td>Flag untuk menandakan apakah component pass validasi atau tidak</td>
                </tr>
                <tr>
                  <td>addError</td>
                  <td>
                    <button @click="addError('TextComponent')">Click</button>
                  </td>
                  <td>-</td>
                  <td>Penambahan error secara manual, programtically</td>
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
          <EForm id="EPassword">
            <EPassword id="PasswordComponent" ref="PasswordComponent" v-model="password.value" :label="password.label" :placeholder="password.placeholder" :maxlength="password.maxlength" :required="password.required" :disabled="password.disabled" :show="password.show" :vruntime="password.vruntime" />
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
                  <td>Label untuk component, bila tidak di bind maka sign * tidak di tampilkan</td>
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
                  <td>Boolean untuk menentukan required atau tidak text, error message akan otomatis terisi bila kosong</td>
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
                  <td>Boolean untuk menentukan component tampil atau tidak. tag ini menggunakan v-if</td>
                </tr>
                <tr>
                  <td>value</td>
                  <td><input v-model="password.value" type="input" /></td>
                  <td>String</td>
                  <td>false</td>
                  <td>''</td>
                  <td>Two way data binding, saat ini data yang di input dalam bentuk upprcase, customize sesuai kebutuhan</td>
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
                  <td>Flag untuk menandakan apakah component pass validasi atau tidak</td>
                </tr>
                <tr>
                  <td>addError</td>
                  <td>
                    <button @click="addError('PasswordComponent')">Click</button>
                  </td>
                  <td>-</td>
                  <td>Penambahan error secara manual, programtically</td>
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
          <EForm id="ETextArea">
            <ETextArea id="TextAreaComponent" ref="TextAreaComponent" v-model="textarea.value" :label="textarea.label" :placeholder="textarea.placeholder" :maxlength="textarea.maxlength" :required="textarea.required" :disabled="textarea.disabled" :show="textarea.show" :cols="textarea.cols" :rows="textarea.rows" :vruntime="textarea.vruntime" />
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
                  <td>Label untuk component, bila tidak di bind maka sign * tidak di tampilkan</td>
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
                  <td>Boolean untuk menentukan required atau tidak text, error message akan otomatis terisi bila kosong</td>
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
                  <td>Boolean untuk menentukan component tampil atau tidak. tag ini menggunakan v-if</td>
                </tr>
                <tr>
                  <td>value</td>
                  <td><input v-model="textarea.value" type="input" /></td>
                  <td>String</td>
                  <td>false</td>
                  <td>''</td>
                  <td>Two way data binding, saat ini data yang di input dalam bentuk upprcase, customize sesuai kebutuhan</td>
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
                  <td>Flag untuk menandakan apakah component pass validasi atau tidak</td>
                </tr>
                <tr>
                  <td>addError</td>
                  <td>
                    <button @click="addError('TextAreaComponent')">Click</button>
                  </td>
                  <td>-</td>
                  <td>Penambahan error secara manual, programtically</td>
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
          <EForm id="EButton">
            <EButton id="ButtonComponent" ref="ButtonComponent" :label="button.label" :disabled="button.disabled" :show="button.show" :color="button.color" />
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
                  <td>Boolean untuk menentukan disabled atau tidaknya component,</td>
                </tr>
                <tr>
                  <td>show</td>
                  <td><input v-model="button.show" type="checkbox" /></td>
                  <td>Boolean</td>
                  <td>false</td>
                  <td>true</td>
                  <td>Boolean untuk menentukan component tampil atau tidak. tag ini menggunakan v-if</td>
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
          <EForm id="ENumber">
            <ENumber id="NumberComponent" ref="NumberComponent" v-model.number="number.value" :label="number.label" :placeholder="number.placeholder" :maxlength="number.maxlength" :required="number.required" :disabled="number.disabled" :show="number.show" :vruntime="number.vruntime" :allow-minus="number.allowMinus" :separator="number.separator" :minimum="number.minimum" :maximum="number.maximum" />
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
                  <td>Maxiumum charater yang bisa di terima oleh component, termasuk separarator and sign</td>
                </tr>
                <tr>
                  <td>disabled</td>
                  <td><input v-model="number.disabled" type="checkbox" /></td>
                  <td>Boolean</td>
                  <td>false</td>
                  <td>false</td>
                  <td>Boolean untuk menentukan disabled atau tidaknya component,</td>
                </tr>
                <tr>
                  <td>required</td>
                  <td><input v-model="number.required" type="checkbox" /></td>
                  <td>Boolean</td>
                  <td>false</td>
                  <td>false</td>
                  <td>Boolean untuk menentukan required atau tidak text, error message akan otomatis terisi bila kosong</td>
                </tr>
                <tr>
                  <td>show</td>
                  <td><input v-model="number.show" type="checkbox" /></td>
                  <td>Boolean</td>
                  <td>false</td>
                  <td>true</td>
                  <td>Boolean untuk menentukan component tampil atau tidak. tag ini menggunakan v-if</td>
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
                  <td>Two way data binding, saat ini data yang di input dalam bentuk upprcase, customize sesuai kebutuhan</td>
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
                  <td>Number formated dengan separator default menggunakan config US, koma untuk ribuan dan . untuk fraksi</td>
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
                  <td>Flag untuk menandakan apakah component pass validasi atau tidak</td>
                </tr>
                <tr>
                  <td>addError</td>
                  <td>
                    <button @click="addError('NumberComponent')">Click</button>
                  </td>
                  <td>-</td>
                  <td>Penambahan error secara manual, programtically</td>
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
          <EForm id="EDecimal">
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
                  <td>Maxiumum charater yang bisa di terima oleh component, termasuk separarator and sign</td>
                </tr>
                <tr>
                  <td>disabled</td>
                  <td><input v-model="decimal.disabled" type="checkbox" /></td>
                  <td>Boolean</td>
                  <td>false</td>
                  <td>false</td>
                  <td>Boolean untuk menentukan disabled atau tidaknya component,</td>
                </tr>
                <tr>
                  <td>required</td>
                  <td><input v-model="decimal.required" type="checkbox" /></td>
                  <td>Boolean</td>
                  <td>false</td>
                  <td>false</td>
                  <td>Boolean untuk menentukan required atau tidak text, error message akan otomatis terisi bila kosong</td>
                </tr>
                <tr>
                  <td>show</td>
                  <td><input v-model="decimal.show" type="checkbox" /></td>
                  <td>Boolean</td>
                  <td>false</td>
                  <td>true</td>
                  <td>Boolean untuk menentukan component tampil atau tidak. tag ini menggunakan v-if</td>
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
                  <td>Two way data binding, saat ini data yang di input dalam bentuk upprcase, customize sesuai kebutuhan</td>
                </tr>
                <tr>
                  <td>allowMinus</td>
                  <td>
                    <input v-model="decimal.allowMinus" type="checkbox" />
                  </td>
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
                  <td>Number formated dengan separator default menggunakan config US, koma untuk ribuan dan . untuk fraksi</td>
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
                    <input v-model.number="decimal.minimumFractionDigits" type="number" />
                  </td>
                  <td>Number</td>
                  <td>false</td>
                  <td>0</td>
                  <td>Minimum fraksi digit</td>
                </tr>

                <tr>
                  <td>maximumFractionDigits</td>
                  <td>
                    <input v-model.number="decimal.maximumFractionDigits" type="number" />
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
                  <td>Flag untuk menandakan apakah component pass validasi atau tidak</td>
                </tr>
                <tr>
                  <td>addError</td>
                  <td>
                    <button @click="addError('DecimalComponent')">Click</button>
                  </td>
                  <td>-</td>
                  <td>Penambahan error secara manual, programtically</td>
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
          <EForm id="EDate">
            <EDate id="DateComponent" ref="DateComponent" v-model="date.value" :label="date.label" :required="date.required" :disabled="date.disabled" :show="date.show" :vruntime="date.vruntime" :minimum="date.minimum" :maximum="date.maximum" />
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
                  <td>Boolean untuk menentukan disabled atau tidaknya component,</td>
                </tr>
                <tr>
                  <td>required</td>
                  <td><input v-model="date.required" type="checkbox" /></td>
                  <td>Boolean</td>
                  <td>false</td>
                  <td>false</td>
                  <td>Boolean untuk menentukan required atau tidak text, error message akan otomatis terisi bila kosong</td>
                </tr>
                <tr>
                  <td>show</td>
                  <td><input v-model="date.show" type="checkbox" /></td>
                  <td>Boolean</td>
                  <td>false</td>
                  <td>true</td>
                  <td>Boolean untuk menentukan component tampil atau tidak. tag ini menggunakan v-if</td>
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
                  <td>Two way data binding, saat ini data yang di input dalam bentuk upprcase, customize sesuai kebutuhan</td>
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
                  <td>Flag untuk menandakan apakah component pass validasi atau tidak</td>
                </tr>
                <tr>
                  <td>addError</td>
                  <td>
                    <button @click="addError('DateComponent')">Click</button>
                  </td>
                  <td>-</td>
                  <td>Penambahan error secara manual, programtically</td>
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
          <EForm id="ETime">
            <ETime id="TimeComponent" ref="TimeComponent" v-model="time.value" :label="time.label" :required="time.required" :disabled="time.disabled" :show="time.show" :vruntime="time.vruntime" :minimum="time.minimum" :maximum="time.maximum" />
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
                  <td>Boolean untuk menentukan disabled atau tidaknya component,</td>
                </tr>
                <tr>
                  <td>required</td>
                  <td><input v-model="time.required" type="checkbox" /></td>
                  <td>Boolean</td>
                  <td>false</td>
                  <td>false</td>
                  <td>Boolean untuk menentukan required atau tidak text, error message akan otomatis terisi bila kosong</td>
                </tr>
                <tr>
                  <td>show</td>
                  <td><input v-model="time.show" type="checkbox" /></td>
                  <td>Boolean</td>
                  <td>false</td>
                  <td>true</td>
                  <td>Boolean untuk menentukan component tampil atau tidak. tag ini menggunakan v-if</td>
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
                  <td>Two way data binding, saat ini data yang di input dalam bentuk upprcase, customize sesuai kebutuhan</td>
                </tr>
                <tr>
                  <td>minimum</td>
                  <td><input v-model="time.minimum" type="input" /></td>
                  <td>String</td>
                  <td>false</td>
                  <td>null</td>
                  <td>Validasi minumum jam/menit yang bisa di input, format HH:mm</td>
                </tr>
                <tr>
                  <td>maximum</td>
                  <td><input v-model="time.maximum" type="input" /></td>
                  <td>String</td>
                  <td>false</td>
                  <td>null</td>
                  <td>Validasi maximum jam/menit yang bisa di input, format HH:mm</td>
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
                  <td>Flag untuk menandakan apakah component pass validasi atau tidak</td>
                </tr>
                <tr>
                  <td>addError</td>
                  <td>
                    <button @click="addError('TimeComponent')">Click</button>
                  </td>
                  <td>-</td>
                  <td>Penambahan error secara manual, programtically</td>
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
          <EForm id="ECheckbox">
            <ECheckBox id="CheckboxComponent" ref="CheckboxComponent" v-model.number="checkbox.value" :label="checkbox.label" :disabled="checkbox.disabled" :show="checkbox.show" :vruntime="checkbox.vruntime" :selected="checkbox.selected" :unselected="checkbox.unselected" />
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
                  <td>Boolean untuk menentukan disabled atau tidaknya component,</td>
                </tr>
                <tr>
                  <td>show</td>
                  <td><input v-model="checkbox.show" type="checkbox" /></td>
                  <td>Boolean</td>
                  <td>false</td>
                  <td>true</td>
                  <td>Boolean untuk menentukan component tampil atau tidak. tag ini menggunakan v-if</td>
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
                  <td>Two way data binding, saat ini data yang di input dalam bentuk upprcase, customize sesuai kebutuhan</td>
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
                  <td>Value yang ke set pada model, apabila checkbok tidak terpilih</td>
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
          <EForm id="EBoolean">
            <EBoolean id="BooleanComponent" ref="BooleanComponent" v-model="boolean.value" :label="boolean.label" :placeholder="boolean.placeholder" :required="boolean.required" :disabled="boolean.disabled" :show="boolean.show" :vruntime="boolean.vruntime" :type="boolean.type" />
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
                  <td>Boolean untuk menentukan required atau tidak text, error message akan otomatis terisi bila kosong</td>
                </tr>
                <tr>
                  <td>disabled</td>
                  <td><input v-model="boolean.disabled" type="checkbox" /></td>
                  <td>Boolean</td>
                  <td>false</td>
                  <td>false</td>
                  <td>Boolean untuk menentukan disabled atau tidaknya component,</td>
                </tr>
                <tr>
                  <td>show</td>
                  <td><input v-model="boolean.show" type="checkbox" /></td>
                  <td>Boolean</td>
                  <td>false</td>
                  <td>true</td>
                  <td>Boolean untuk menentukan component tampil atau tidak. tag ini menggunakan v-if</td>
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
                  <td>Two way data binding, saat ini data yang di input dalam bentuk upprcase, customize sesuai kebutuhan</td>
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
                  <td>Flag untuk menandakan apakah component pass validasi atau tidak</td>
                </tr>
                <tr>
                  <td>addError</td>
                  <td>
                    <button @click="addError('BooleanComponent')">Click</button>
                  </td>
                  <td>-</td>
                  <td>Penambahan error secara manual, programtically</td>
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
          <EForm id="ESelect">
            <ESelect id="SelectComponent" ref="SelectComponent" v-model="select.value" :label="select.label" :placeholder="select.placeholder" :required="select.required" :disabled="select.disabled" :show="select.show" :as="select.as" :vruntime="select.vruntime" :options="select.options" />
            <div class="text-xs">Template : {{ htmlSelect }}</div>
            <br />
            <div class="text-xs">Data Object : {{ select }}</div>
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
                  <td><input v-model="select.label" type="text" /></td>
                  <td>String</td>
                  <td>false</td>
                  <td>''</td>
                  <td>Label untuk component</td>
                </tr>
                <tr>
                  <td>placeholder</td>
                  <td><input v-model="select.placeholder" type="text" /></td>
                  <td>String</td>
                  <td>false</td>
                  <td>''</td>
                  <td>Place holder input, akan tampil bila data kosong</td>
                </tr>
                <tr>
                  <td>required</td>
                  <td><input v-model="select.required" type="checkbox" /></td>
                  <td>Boolean</td>
                  <td>false</td>
                  <td>false</td>
                  <td>Boolean untuk menentukan required atau tidak text, error message akan otomatis terisi bila kosong</td>
                </tr>
                <tr>
                  <td>disabled</td>
                  <td><input v-model="select.disabled" type="checkbox" /></td>
                  <td>Boolean</td>
                  <td>false</td>
                  <td>false</td>
                  <td>Boolean untuk menentukan disabled atau tidaknya component,</td>
                </tr>
                <tr>
                  <td>show</td>
                  <td><input v-model="select.show" type="checkbox" /></td>
                  <td>Boolean</td>
                  <td>false</td>
                  <td>true</td>
                  <td>Boolean untuk menentukan component tampil atau tidak. tag ini menggunakan v-if</td>
                </tr>
                <tr>
                  <td>as</td>
                  <td>
                    <select v-model="select.as">
                      <option value="string">string</option>
                      <option value="number">number</option>
                    </select>
                  </td>
                  <td>String</td>
                  <td>false</td>
                  <td>string</td>
                  <td>Tipe data converter, bila tidak di provide maka tipe data sesuai option, bila di sediakan makan nilai value akan di convert</td>
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
                  <td><input v-model="select.value" type="input" /></td>
                  <td>String</td>
                  <td>false</td>
                  <td>''</td>
                  <td>Two way data binding, saat ini data yang di input dalam bentuk upprcase, customize sesuai kebutuhan</td>
                </tr>
                <tr>
                  <td>options</td>
                  <td>-</td>
                  <td>Array</td>
                  <td>false</td>
                  <td>''</td>
                  <td>Data Option pilihan dengan format { value: null, description: null }</td>
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
                    <button @click="metaData('SelectComponent')">Click</button>
                  </td>
                  <td>{{ metadata }}</td>
                  <td>Component Information</td>
                </tr>
                <tr>
                  <td>clearError</td>
                  <td>
                    <button @click="clearError('SelectComponent')">Click</button>
                  </td>
                  <td>Void</td>
                  <td>Hapus error, kembalikan ke state component semula</td>
                </tr>
                <tr>
                  <td>hasError</td>
                  <td>
                    <button @click="hasError('SelectComponent')">Click</button>
                  </td>
                  <td>{{ haserror }}</td>
                  <td>Flag untuk menandakan apakah component pass validasi atau tidak</td>
                </tr>
                <tr>
                  <td>addError</td>
                  <td>
                    <button @click="addError('SelectComponent')">Click</button>
                  </td>
                  <td>-</td>
                  <td>Penambahan error secara manual, programtically</td>
                </tr>
                <tr>
                  <td>validate</td>
                  <td>
                    <button @click="validate('SelectComponent')">Click</button>
                  </td>
                  <td>{{ valid }}</td>
                  <td>Lakukan validasi berdasarkan required dan vruntime</td>
                </tr>
              </tbody>
            </table>
          </EForm>
          <EForm id="ELookup">
            <ELookup id="LookupComponent" ref="LookupComponent" v-model="lookup.value" :label="lookup.label" :group="lookup.group" :placeholder="lookup.placeholder" :required="lookup.required" :disabled="lookup.disabled" :show="lookup.show" :as="lookup.as" :vruntime="lookup.vruntime" :filter="lookup.filter" :lookup-group="lookup.lookupGroup" />
            <div class="text-xs">Template : {{ htmlLookup }}</div>
            <br />
            <div class="text-xs">Data Object : {{ lookup }}</div>
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
                  <td><input v-model="lookup.label" type="text" /></td>
                  <td>String</td>
                  <td>false</td>
                  <td>''</td>
                  <td>Label untuk component</td>
                </tr>
                <tr>
                  <td>placeholder</td>
                  <td><input v-model="lookup.placeholder" type="text" /></td>
                  <td>String</td>
                  <td>false</td>
                  <td>''</td>
                  <td>Place holder input, akan tampil bila data kosong</td>
                </tr>
                <tr>
                  <td>required</td>
                  <td><input v-model="lookup.required" type="checkbox" /></td>
                  <td>Boolean</td>
                  <td>false</td>
                  <td>false</td>
                  <td>Boolean untuk menentukan required atau tidak text, error message akan otomatis terisi bila kosong</td>
                </tr>
                <tr>
                  <td>disabled</td>
                  <td><input v-model="lookup.disabled" type="checkbox" /></td>
                  <td>Boolean</td>
                  <td>false</td>
                  <td>false</td>
                  <td>Boolean untuk menentukan disabled atau tidaknya component,</td>
                </tr>
                <tr>
                  <td>show</td>
                  <td><input v-model="lookup.show" type="checkbox" /></td>
                  <td>Boolean</td>
                  <td>false</td>
                  <td>true</td>
                  <td>Boolean untuk menentukan component tampil atau tidak. tag ini menggunakan v-if</td>
                </tr>
                <tr>
                  <td>as</td>
                  <td>
                    <select v-model="lookup.as">
                      <option value="string">string</option>
                      <option value="number">number</option>
                    </select>
                  </td>
                  <td>String</td>
                  <td>false</td>
                  <td>string</td>
                  <td>Tipe data converter, bila tidak di provide maka tipe data sesuai option, bila di sediakan makan nilai value akan di convert</td>
                </tr>
                <tr>
                  <td>lookupGrup</td>
                  <td>
                    <select v-model="lookup.lookupGroup">
                      <option value="SEX">SEX</option>
                      <option value="EDUCATION">EDUCATION</option>
                      <option value="EXP">EXP</option>
                    </select>
                  </td>
                  <td>String</td>
                  <td>false</td>
                  <td>''</td>
                  <td>Tipe Lookup Group yang akan di fetching dari server, kemudaian di cache di sisi vuex</td>
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
                  <td><input v-model="lookup.value" type="input" /></td>
                  <td>String</td>
                  <td>false</td>
                  <td>''</td>
                  <td>Two way data binding, saat ini data yang di input dalam bentuk upprcase, customize sesuai kebutuhan</td>
                </tr>
                <tr>
                  <td>filter</td>
                  <td>-</td>
                  <td>Function</td>
                  <td>false</td>
                  <td>(lookupGroup, options) => { return options }</td>
                  <td>Kadang kita tidak ingin menampilkan seluruh data lookup, krn logic businsess, pd function ini kita dapat melakukan filtering tambahan</td>
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
                    <button @click="metaData('LookupComponent')">Click</button>
                  </td>
                  <td>{{ metadata }}</td>
                  <td>Component Information</td>
                </tr>
                <tr>
                  <td>clearError</td>
                  <td>
                    <button @click="clearError('LookupComponent')">Click</button>
                  </td>
                  <td>Void</td>
                  <td>Hapus error, kembalikan ke state component semula</td>
                </tr>
                <tr>
                  <td>hasError</td>
                  <td>
                    <button @click="hasError('LookupComponent')">Click</button>
                  </td>
                  <td>{{ haserror }}</td>
                  <td>Flag untuk menandakan apakah component pass validasi atau tidak</td>
                </tr>
                <tr>
                  <td>addError</td>
                  <td>
                    <button @click="addError('LookupComponent')">Click</button>
                  </td>
                  <td>-</td>
                  <td>Penambahan error secara manual, programtically</td>
                </tr>
                <tr>
                  <td>validate</td>
                  <td>
                    <button @click="validate('LookupComponent')">Click</button>
                  </td>
                  <td>{{ valid }}</td>
                  <td>Lakukan validasi berdasarkan required dan vruntime</td>
                </tr>
              </tbody>
            </table>
          </EForm>
          <EForm id="EDialog">
            <EDialog id="DialogComponent" ref="DialogComponent" :title="dialog.title" :width="dialog.width" :height="dialog.height" :buttons="dialog.buttons" @EmitSimpan="SimpanClicked" @Submit="SubmitClicked" />
            <div class="text-xs">Template : {{ htmlDialog }}</div>
            <br />
            <div class="text-xs">Data Object : {{ dialog }}</div>
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
                  <td>title</td>
                  <td><input v-model="dialog.title" type="text" /></td>
                  <td>String</td>
                  <td>false</td>
                  <td>Please Provide title..</td>
                  <td>Title dari dialog</td>
                </tr>
                <tr>
                  <td>width</td>
                  <td><input v-model="dialog.width" type="number" /></td>
                  <td>Number</td>
                  <td>false</td>
                  <td>500</td>
                  <td>Lebar dari dialog</td>
                </tr>
                <tr>
                  <td>height</td>
                  <td><input v-model="dialog.height" type="number" /></td>
                  <td>Number</td>
                  <td>false</td>
                  <td>500</td>
                  <td>Tinggi dari dialog</td>
                </tr>
                <tr>
                  <td>buttons</td>
                  <td><input v-model="dialog.height" type="number" /></td>
                  <td>Array</td>
                  <td>false</td>
                  <td>[{ label: null, color: null, emit: optional }]</td>
                  <td>List of button yang akan muncul pada dialog, untuk close sudah ada default button, untuk masing-masing button akan trigger emit berdadarkan label buttons.</td>
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
                    <button @click="metaData('DialogComponent')">Click</button>
                  </td>
                  <td>{{ metadata }}</td>
                  <td>Component Information</td>
                </tr>
                <tr>
                  <td>open</td>
                  <td>
                    <button @click="openDialog('DialogComponent')">Click</button>
                  </td>
                  <td>Void</td>
                  <td>Show popup dialog container</td>
                </tr>
                <tr>
                  <td>close</td>
                  <td>
                    <button @click="closeDialog('DialogComponent')">Click</button>
                  </td>
                  <td>Void</td>
                  <td>Hide popup dialog container</td>
                </tr>
              </tbody>
            </table>
          </EForm>
          <EForm id="ELoading">
            <ELoading ref="LoadingComponent" />
            <div class="text-xs">Template : {{ htmlLoading }}</div>
            <br />
            <div class="text-xs">Data Object : none</div>
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
                    <button @click="metaData('LoadingComponent')">Click</button>
                  </td>
                  <td>{{ metadata }}</td>
                  <td>Component Information</td>
                </tr>
                <tr>
                  <td>show</td>
                  <td>
                    <button @click="showLoading('LoadingComponent')">Click</button>
                  </td>
                  <td>Void</td>
                  <td>Show popup loading</td>
                </tr>
                <tr>
                  <td>success</td>
                  <td>
                    <button @click="successLoading('LoadingComponent')">Click</button>
                  </td>
                  <td>Void</td>
                  <td>Close Loading dan info operation success label</td>
                </tr>
                <tr>
                  <td>fail</td>
                  <td>
                    <button @click="failLoading('LoadingComponent')">Click</button>
                  </td>
                  <td>Void</td>
                  <td>Close Loading dan info operation fail label</td>
                </tr>
              </tbody>
            </table>
          </EForm>
          <EForm id="EMessage">
            <EMessage id="MessageComponent" ref="MessageComponent" />
            <div class="text-xs">Template : {{ htmlMessage }}</div>
            <br />
            <div class="text-xs">Data Object : none</div>
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
                    <button @click="metaData('MessageComponent')">Click</button>
                  </td>
                  <td>{{ metadata }}</td>
                  <td>Component Information</td>
                </tr>
                <tr>
                  <td>success</td>
                  <td>
                    <button @click="successMessage('MessageComponent')">Click</button>
                  </td>
                  <td>Promise</td>
                  <td>Tampilkan success message</td>
                </tr>
                <tr>
                  <td>error</td>
                  <td>
                    <button @click="errorMessage('MessageComponent')">Click</button>
                  </td>
                  <td>Promise</td>
                  <td>Tampilkan error message</td>
                </tr>
                <tr>
                  <td>close</td>
                  <td>
                    <button @click="closeMessage('MessageComponent')">Click</button>
                  </td>
                  <td>Void</td>
                  <td>Tutup popup message</td>
                </tr>
              </tbody>
            </table>
          </EForm>
          <EForm id="EConfirmation">
            <EConfirmation id="ConfirmationComponent" ref="ConfirmationComponent" :positive="confirmation.positive" :negative="confirmation.negative" />
            <div class="text-xs">Template : {{ htmlConfirmation }}</div>
            <br />
            <div class="text-xs">Data Object : {{ confirmation }}</div>
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
                  <td>positive</td>
                  <td><input v-model="confirmation.positive" type="text" /></td>
                  <td>String</td>
                  <td>false</td>
                  <td>Yes</td>
                  <td>Positive label button</td>
                </tr>
                <tr>
                  <td>negative</td>
                  <td><input v-model="confirmation.negative" type="text" /></td>
                  <td>String</td>
                  <td>false</td>
                  <td>No</td>
                  <td>Negative label button</td>
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
                    <button @click="metaData('ConfirmationComponent')">Click</button>
                  </td>
                  <td>{{ metadata }}</td>
                  <td>Component Information</td>
                </tr>
                <tr>
                  <td>confirm</td>
                  <td>
                    <button @click="confirmConfirmation('ConfirmationComponent')">Click</button>
                  </td>
                  <td>Promise</td>
                  <td>Tampilkan success message</td>
                </tr>
                <tr>
                  <td>close</td>
                  <td>
                    <button @click="closeConfirmation('ConfirmationComponent')">Click</button>
                  </td>
                  <td>Promise</td>
                  <td>Tutup confimration dialog</td>
                </tr>
              </tbody>
            </table>
          </EForm>
          <EForm id="ECard">
            <ECard id="CardComponent" ref="CardComponent" :label="card.label" :disabled="card.disabled" :show="card.show">
              <EText id="TextComponent2" ref="TextComponent2" v-model="text.value" :label="text.label" :placeholder="text.placeholder" :type="text.type" :required="text.required" :disabled="text.disabled" :show="text.show" :vruntime="text.vruntime" />
            </ECard>
            <div class="text-xs">Template : {{ htmlCard }}</div>
            <br />
            <div class="text-xs">Data Object : {{ card }}</div>
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
                  <td>label</td>
                  <td><input v-model="card.label" type="text" /></td>
                  <td>String</td>
                  <td>false</td>
                  <td>''</td>
                  <td>Label untuk component</td>
                </tr>
                <tr>
                  <td>disabled</td>
                  <td><input v-model="card.disabled" type="checkbox" /></td>
                  <td>Boolean</td>
                  <td>false</td>
                  <td>false</td>
                  <td>Boolean untuk menentukan disabled atau tidaknya component</td>
                </tr>
                <tr>
                  <td>show</td>
                  <td><input v-model="card.show" type="checkbox" /></td>
                  <td>Boolean</td>
                  <td>false</td>
                  <td>true</td>
                  <td>Boolean untuk menentukan component tampil atau tidak. tag ini menggunakan v-if</td>
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
                    <button @click="metaData('ConfirmationComponent')">Click</button>
                  </td>
                  <td>{{ metadata }}</td>
                  <td>Component Information</td>
                </tr>
              </tbody>
            </table>
          </EForm>
          <EForm id="ETabs">
            <ETabs id="TabsComponent" ref="TabsComponent" :labels="tabss.labels" :selected-tab="tabss.selectedTab" :show="tabss.show" :disabled="tabss.disabled">
              <EForm id="Customer">
                <div>Customer</div>
              </EForm>
              <EForm id="Order">
                <div>Order</div>
              </EForm>
              <EForm id="Transaction">
                <div>Transaction</div>
              </EForm>
              <EForm id="Delivery">
                <div>Delivery</div>
              </EForm>
            </ETabs>
            <div class="text-xs">Template : {{ htmlTabs }}</div>
            <br />
            <div class="text-xs">Data Object : {{ tabss }}</div>
            <br />
            <div class="text-xs">Important !! Untuk masing-masing content pada Tab, gunakan EForm dgn id sesuai dengan label tabs, menggunakan EForm agar behaviour ui bisa di buat central</div>
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
                  <td>labels</td>
                  <td>-</td>
                  <td>Arrays</td>
                  <td>false</td>
                  <td>[]</td>
                  <td>Label untuk tab name, berupa arrays string</td>
                </tr>
                <tr>
                  <td>disabled</td>
                  <td><input v-model="tabss.disabled" type="checkbox" /></td>
                  <td>Boolean</td>
                  <td>false</td>
                  <td>false</td>
                  <td>Boolean untuk menentukan disabled atau tidaknya component</td>
                </tr>
                <tr>
                  <td>show</td>
                  <td><input v-model="tabss.show" type="checkbox" /></td>
                  <td>Boolean</td>
                  <td>false</td>
                  <td>true</td>
                  <td>Boolean untuk menentukan component tampil atau tidak. tag ini menggunakan v-if</td>
                </tr>
                <tr>
                  <td>selectedTab</td>
                  <td>
                    <select v-model="tabss.selectedTab">
                      <option value="Customer">Customer</option>
                      <option value="Order">Order</option>
                      <option value="Transaction">Transaction</option>
                    </select>
                  </td>
                  <td>String</td>
                  <td>false</td>
                  <td>null</td>
                  <td>Set default selected tab for the first time</td>
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
                    <button @click="metaData('TabsComponent')">Click</button>
                  </td>
                  <td>{{ metadata }}</td>
                  <td>Component Information</td>
                </tr>
                <tr>
                  <td>setSelectedTab</td>
                  <td>
                    <button @click="setSelectedTab('TabsComponent')">Click</button>
                  </td>
                  <td>Transaction Tab selected</td>
                  <td>Set selected tab progamatically</td>
                </tr>
                <tr>
                  <td>-</td>
                  <td>
                    <button @click="addNewTab()">Click</button>
                  </td>
                  <td>Tambah new Tab, Customer Tab Enabled, Order Tab Disabled</td>
                  <td>Ini bukan component ini hanya untuk test saja</td>
                </tr>
              </tbody>
            </table>
          </EForm>
          <EForm id="EFilter">
            <EFilter id="FilterComponent" :title="filter.title" :disabled="filter.disabled" :show="filter.show" @Clear="filterClear" @Search="filterSearch">
              <ECol :col="3">
                <div style="background: yellow">Filter Component 1</div>
                <div style="background: yellow">Filter Component 2</div>
                <ECol :col="2">
                  <div style="background: yellow">Filter Component 3</div>
                  <div style="background: yellow">Filter Component 4</div>
                </ECol>
              </ECol>
            </EFilter>
            <br />
            <div class="text-xs">Template : {{ htmlFilter }}</div>
            <br />
            <div class="text-xs">Data Object : {{ filter }}</div>
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
                  <td>title</td>
                  <td><input v-model="filter.title" type="text" /></td>
                  <td>String</td>
                  <td>false</td>
                  <td>''</td>
                  <td>Title untuk search pane</td>
                </tr>
                <tr>
                  <td>disabled</td>
                  <td><input v-model="filter.disabled" type="checkbox" /></td>
                  <td>Boolean</td>
                  <td>false</td>
                  <td>false</td>
                  <td>Boolean untuk menentukan disabled atau tidaknya component</td>
                </tr>
                <tr>
                  <td>show</td>
                  <td><input v-model="filter.show" type="checkbox" /></td>
                  <td>Boolean</td>
                  <td>false</td>
                  <td>true</td>
                  <td>Boolean untuk menentukan component tampil atau tidak. tag ini menggunakan v-if</td>
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
                    <button @click="metaData('FilterComponent')">Click</button>
                  </td>
                  <td>{{ metadata }}</td>
                  <td>Component Information</td>
                </tr>
              </tbody>
            </table>
          </EForm>
          <EForm id="EPageLoader">
            <EPageLoader id="PageLoaderComponent" ref="PageLoaderComponent" :label="pageLoader.label" :fetcher="pageLoaderfetcher">
              <div>Content ini akan di tampil, Bila EPageLoader success melakukan rest call</div>
            </EPageLoader>
            <br />
            <div class="text-xs">Template : {{ htmlPageLoader }}</div>
            <br />
            <div class="text-xs">Data Object : {{ pageLoader }}</div>
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
                  <td><input v-model="pageLoader.label" type="text" /></td>
                  <td>String</td>
                  <td>false</td>
                  <td>''</td>
                  <td>Label untuk component</td>
                </tr>
                <tr>
                  <td>fetcher</td>
                  <td>-</td>
                  <td>Function</td>
                  <td>true</td>
                  <td>Empty Function</td>
                  <td>Server Call yang returnnya harus berupa boolean, true bila success, dan false bila gagal</td>
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
                    <button @click="metaData('PageLoaderComponent')">Click</button>
                  </td>
                  <td>{{ metadata }}</td>
                  <td>Component Information</td>
                </tr>
              </tbody>
            </table>
          </EForm>
          <EForm id="EUpload"> https://medium.com/js-dojo/how-to-upload-base64-images-in-vue-nodejs-4e89635daebc </EForm>
          <EForm id="ELocalPagination">
            <ELocalPagination
              id="LocalPaginationComponent"
              ref="LocalPaginationComponent"
              :label="localPagination.label"
              :show="localPagination.show"
              :disabled="localPagination.disabled"
              :columns="localPagination.columns"
              :rows="localPagination.rows"
              :actions="localPagination.actions"
              :buttons="localPagination.buttons"
              :initial-sort-by="localPagination.initialSortBy"
              :disabled-action="localPaginationDisabledAction"
              :add-new-data="localPaginationAddNewData"
              :save-state="localPaginationSaveState"
              @RowClick="localPaginationRowClick"
              @Delete="localPaginationDelete"
              @Edit="localPaginationEdit"
              @View="localPaginationView"
              @Process="localPaginationProcess"
              @Migrate="localPaginationMigrate"
            />
            <br />
            <div class="text-xs">Template : {{ htmlLocalPagination }}</div>
            <br />
            <div class="text-xs">Column : {{ htmlLocalPaginationColumn }}</div>
            <br />
            <div class="text-xs">Actions : {{ htmlLocalPaginationActions }}</div>
            <br />
            <div class="text-xs">initialSortBy : {{ htmlLocalPaginationinitialSortBy }}</div>
            <br />
            <div class="text-xs">Buttons : {{ htmlLocalPaginationButtons }}</div>
            <br />
            <div class="text-xs">Data Object : {{ localPagination }}</div>
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
                  <td><input v-model="localPagination.label" type="text" /></td>
                  <td>String</td>
                  <td>false</td>
                  <td>Please Provide Table title...</td>
                  <td>Label untuk component</td>
                </tr>
                <tr>
                  <td>show</td>
                  <td>
                    <input v-model="localPagination.show" type="checkbox" />
                  </td>
                  <td>Boolean</td>
                  <td>false</td>
                  <td>true</td>
                  <td>Boolean untuk menentukan component tampil atau tidak. tag ini menggunakan v-if</td>
                </tr>
                <tr>
                  <td>disabled</td>
                  <td>
                    <input v-model="localPagination.disabled" type="checkbox" />
                  </td>
                  <td>Boolean</td>
                  <td>false</td>
                  <td>false</td>
                  <td>Boolean untuk menentukan disabled atau tidaknya component,</td>
                </tr>
                <tr>
                  <td>columns</td>
                  <td>-</td>
                  <td>Array</td>
                  <td>false</td>
                  <td>[]</td>
                  <td>Colum configuration berupa array dgn format { label: null, field: null, sortable: null, width: null, tooltip: null, type: null} untuk type meng-support text, date, number, decimal, percentage, boolean</td>
                </tr>
                <tr>
                  <td>row</td>
                  <td>-</td>
                  <td>Array</td>
                  <td>false</td>
                  <td>[]</td>
                  <td>Data rows yang akan di tampilkan base on columns configuration</td>
                </tr>
                <tr>
                  <td>actions</td>
                  <td>-</td>
                  <td>Array</td>
                  <td>false</td>
                  <td>[]</td>
                  <td>Action/ Tindakan yang bisa di perlakukan terhadap data, dimana akan tigger emit berdasarkan label button</td>
                </tr>
                <tr>
                  <td>disabledAction</td>
                  <td>-</td>
                  <td>Function</td>
                  <td>false</td>
                  <td>() => return false</td>
                  <td>Function callback untuk menentukan apakah button action enabled atau disabled Ex : disabledAction(action: { label}, prop: { column, row })</td>
                </tr>
                <tr>
                  <td>buttons</td>
                  <td>-</td>
                  <td>Array</td>
                  <td>false</td>
                  <td>[]</td>
                  <td>Button pada footer, yang bertujuan untuk execute process secara bulk, bukan per-row, dimana akan tigger emit berdasarkan label button, dan akan mengirim selectedData, checkbox hanya akan muncul bila buttons di provide</td>
                </tr>
                <tr>
                  <td>initialSortBy</td>
                  <td>-</td>
                  <td>Array</td>
                  <td>false</td>
                  <td>[]</td>
                  <td>Configurasi, untuk sort data pada saat pertama kali di tampilkan</td>
                </tr>
                <tr>
                  <td>addNewData</td>
                  <td>-</td>
                  <td>Function</td>
                  <td>false</td>
                  <td>null</td>
                  <td>Akan menambahkan button pada header table, yang bertujuan untuk action Tambah data</td>
                </tr>
                <tr>
                  <td>saveState</td>
                  <td>-</td>
                  <td>Function</td>
                  <td>false</td>
                  <td>null</td>
                  <td>Penambahan colum pada sisi kiri, untuk menandakan apakah data sudah terpersist ke db atau belum, agar user tau yang mana yang sudah ke save dan blm</td>
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
                    <button @click="metaData('LocalPaginationComponent')">Click</button>
                  </td>
                  <td>{{ metadata }}</td>
                  <td>Component Information</td>
                </tr>
              </tbody>
            </table>
          </EForm>
          <EForm id="EServerPagination">
            <EServerPagination
              id="ServerPaginationComponent"
              ref="ServerPaginationComponent"
              :columns="serverPagination.columns"
              :label="serverPagination.label"
              :show="serverPagination.show"
              :disabled="serverPagination.disabled"
              :auto-load="serverPagination.autoLoad"
              :picker="serverPagination.picker"
              :actions="serverPagination.actions"
              :buttons="serverPagination.buttons"
              :filter="serverPagination.filter"
              :initial-sort-by="serverPagination.initialSortBy"
              :disabled-action="serverPaginationDisabledAction"
              :add-new-data="serverPaginationAddNewData"
              @RowClick="serverPaginationRowClick"
              @Delete="serverPaginationDelete"
              @Edit="serverPaginationEdit"
              @View="serverPaginationView"
              @Process="serverPaginationProcess"
              @Migrate="serverPaginationMigrate"
            />
            <br />
            <div class="text-xs">Template : {{ htmlServerPagination }}</div>
            <br />
            <div class="text-xs">Colums : {{ htmlServerPaginationColumn }}</div>
            <br />
            <div class="text-xs">Actions : {{ htmlServerPaginationActions }}</div>
            <br />
            <div class="text-xs">initialSortBy : {{ htmlServerPaginationinitialSortBy }}</div>
            <br />
            <div class="text-xs">Buttons : {{ htmlServerPaginationButtons }}</div>
            <br />
            <div class="text-xs">Data Object : {{ serverPagination }}</div>
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
                  <td>
                    <input v-model="serverPagination.label" type="text" />
                  </td>
                  <td>String</td>
                  <td>false</td>
                  <td>Please Provide Table title...</td>
                  <td>Label untuk component</td>
                </tr>
                <tr>
                  <td>show</td>
                  <td>
                    <input v-model="serverPagination.show" type="checkbox" />
                  </td>
                  <td>Boolean</td>
                  <td>false</td>
                  <td>true</td>
                  <td>Boolean untuk menentukan component tampil atau tidak. tag ini menggunakan v-if</td>
                </tr>
                <tr>
                  <td>disabled</td>
                  <td>
                    <input v-model="serverPagination.disabled" type="checkbox" />
                  </td>
                  <td>Boolean</td>
                  <td>false</td>
                  <td>false</td>
                  <td>Boolean untuk menentukan disabled atau tidaknya component,</td>
                </tr>
                <tr>
                  <td>autoLoad</td>
                  <td>-</td>
                  <td>Boolean</td>
                  <td>false</td>
                  <td>false</td>
                  <td>Boolean untuk menentukan apakah data langsung di fetch pada inital atau lewat progamatically</td>
                </tr>
                <tr>
                  <td>picker</td>
                  <td>-</td>
                  <td>Boolean</td>
                  <td>false</td>
                  <td>false</td>
                  <td>Picker server name</td>
                </tr>
                <tr>
                  <td>filter</td>
                  <td>-</td>
                  <td>Object</td>
                  <td>false</td>
                  <td>{}</td>
                  <td>Ini adalah object filter, bukan berupa array tapi berupa object dimana nama props akan menjadi key mapping dengan server configuration</td>
                </tr>
                <tr>
                  <td>columns</td>
                  <td>-</td>
                  <td>Array</td>
                  <td>false</td>
                  <td>[]</td>
                  <td>Colum configuration berupa array dgn format { label: null, field: null, sortable: null, width: null, tooltip: null, type: null} untuk type meng-support text, date, number, decimal, percentage, boolean</td>
                </tr>
                <tr>
                  <td>actions</td>
                  <td>-</td>
                  <td>Array</td>
                  <td>false</td>
                  <td>[]</td>
                  <td>Action/ Tindakan yang bisa di perlakukan terhadap data, dimana akan tigger emit berdasarkan label button</td>
                </tr>
                <tr>
                  <td>disabledAction</td>
                  <td>-</td>
                  <td>Function</td>
                  <td>false</td>
                  <td>() => return false</td>
                  <td>Function callback untuk menentukan apakah button action enabled atau disabled Ex : disabledAction(action: { label}, prop: { column, row })</td>
                </tr>
                <tr>
                  <td>buttons</td>
                  <td>-</td>
                  <td>Array</td>
                  <td>false</td>
                  <td>[]</td>
                  <td>Button pada footer, yang bertujuan untuk execute process secara bulk, bukan per-row, dimana akan tigger emit berdasarkan label button, dan akan mengirim selectedData, checkbox hanya akan muncul bila buttons di provide</td>
                </tr>
                <tr>
                  <td>initialSortBy</td>
                  <td>-</td>
                  <td>Array</td>
                  <td>false</td>
                  <td>[]</td>
                  <td>Configurasi, untuk sort data pada saat pertama kali di tampilkan</td>
                </tr>
                <tr>
                  <td>addNewData</td>
                  <td>-</td>
                  <td>Function</td>
                  <td>false</td>
                  <td>null</td>
                  <td>Akan menambahkan button pada header table, yang bertujuan untuk action Tambah data</td>
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
                    <button @click="metaData('ServerPaginationComponent')">Click</button>
                  </td>
                  <td>{{ metadata }}</td>
                  <td>Component Information</td>
                </tr>
              </tbody>
            </table>
          </EForm>
          <EForm id="EForm">
            <EForm id="FormComponent" ref="FormComponent"> Content Of Form </EForm>
            <br />
            <div class="text-xs">Template : {{ htmlForm }}</div>
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
                    <button @click="metaData('FormComponent')">Click</button>
                  </td>
                  <td>{{ metadata }}</td>
                  <td>Component Information</td>
                </tr>
                <tr>
                  <td>setShow</td>
                  <td>
                    <button @click="setShow('FormComponent')">Click</button>
                  </td>
                  <td>-</td>
                  <td>Method untuk set show container atau hide</td>
                </tr>
              </tbody>
            </table>
          </EForm>
          <EForm id="EPopupPagination">
            <EPopupPagination id="PopupPaginationComponent" ref="PopupPaginationComponent" v-model="popupPagination.value" :label="popupPagination.label" :placeholder="popupPagination.placeholder" :required="popupPagination.required" :disabled="popupPagination.disabled" :maxlength="popupPagination.maxlength" :show="popupPagination.show" :vruntime="popupPagination.vruntime" :picker="popupPagination.picker" :filter="popupPagination.filter" :columns="popupPagination.columns" />
            <br />
            <div class="text-xs">Template : {{ htmlPopupPagination }}</div>
            <br />
            <div class="text-xs">Colums : {{ htmlPopupPaginationColumn }}</div>
            <br />
            <div class="text-xs">Data Object : {{ popupPagination }}</div>

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
                  <td>
                    <input v-model="popupPagination.label" type="text" />
                  </td>
                  <td>String</td>
                  <td>false</td>
                  <td>Please Provide Table title...</td>
                  <td>Label untuk component</td>
                </tr>
                <tr>
                  <td>placeholder</td>
                  <td>
                    <input v-model="popupPagination.placeholder" type="text" />
                  </td>
                  <td>String</td>
                  <td>false</td>
                  <td>''</td>
                  <td>Place holder input, akan tampil bila data kosong</td>
                </tr>
                <tr>
                  <td>show</td>
                  <td>
                    <input v-model="popupPagination.show" type="checkbox" />
                  </td>
                  <td>Boolean</td>
                  <td>false</td>
                  <td>true</td>
                  <td>Boolean untuk menentukan component tampil atau tidak. tag ini menggunakan v-if</td>
                </tr>
                <tr>
                  <td>required</td>
                  <td>
                    <input v-model="popupPagination.required" type="checkbox" />
                  </td>
                  <td>Boolean</td>
                  <td>false</td>
                  <td>false</td>
                  <td>Boolean untuk menentukan required atau tidak text, error message akan otomatis terisi bila kosong</td>
                </tr>
                <tr>
                  <td>disabled</td>
                  <td>
                    <input v-model="popupPagination.disabled" type="checkbox" />
                  </td>
                  <td>Boolean</td>
                  <td>false</td>
                  <td>false</td>
                  <td>Boolean untuk menentukan disabled atau tidaknya component,</td>
                </tr>
                <tr>
                  <td>maxlength</td>
                  <td>
                    <input v-model.number="popupPagination.maxlength" type="number" />
                  </td>
                  <td>Number</td>
                  <td>false</td>
                  <td>16</td>
                  <td>Maxiumum charater yang bisa di terima oleh component</td>
                </tr>
                <tr>
                  <td>picker</td>
                  <td>-</td>
                  <td>Boolean</td>
                  <td>false</td>
                  <td>false</td>
                  <td>Picker server name</td>
                </tr>
                <tr>
                  <td>filter</td>
                  <td>-</td>
                  <td>Object</td>
                  <td>false</td>
                  <td>{}</td>
                  <td>Ini adalah object filter, bukan berupa array tapi berupa object dimana nama props akan menjadi key mapping dengan server configuration</td>
                </tr>
                <tr>
                  <td>columns</td>
                  <td>-</td>
                  <td>Array</td>
                  <td>false</td>
                  <td>[]</td>
                  <td>Colum configuration berupa array dgn format { label: null, field: null, sortable: null, width: null, tooltip: null, type: null} untuk type meng-support text, date, number, decimal, percentage, boolean</td>
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
                    <button @click="metaData('PopupPaginationComponent')">Click</button>
                  </td>
                  <td>{{ metadata }}</td>
                  <td>Component Information</td>
                </tr>
                <tr>
                  <td>clearError</td>
                  <td>
                    <button @click="clearError('PopupPaginationComponent')">Click</button>
                  </td>
                  <td>Void</td>
                  <td>Hapus error, kembalikan ke state component semula</td>
                </tr>
                <tr>
                  <td>hasError</td>
                  <td>
                    <button @click="hasError('PopupPaginationComponent')">Click</button>
                  </td>
                  <td>{{ haserror }}</td>
                  <td>Flag untuk menandakan apakah component pass validasi atau tidak</td>
                </tr>
                <tr>
                  <td>addError</td>
                  <td>
                    <button @click="addError('PopupPaginationComponent')">Click</button>
                  </td>
                  <td>-</td>
                  <td>Penambahan error secara manual, programtically</td>
                </tr>
                <tr>
                  <td>validate</td>
                  <td>
                    <button @click="validate('PopupPaginationComponent')">Click</button>
                  </td>
                  <td>{{ valid }}</td>
                  <td>Lakukan validasi berdasarkan required dan vruntime</td>
                </tr>
              </tbody>
            </table>
          </EForm>
          <EForm id="ECol">
            <ECol id="ColComponent" ref="ColComponent" :col="col.col" :gap-x="col.gapX" :gap-y="col.gapY">
              <div style="background: yellow">GROUP 1</div>
              <div style="background: yellow">GROUP 2</div>
              <div style="background: yellow">GROUP 3</div>
              <div style="background: yellow">GROUP 4</div>
              <div style="background: yellow">GROUP 5</div>
              <div style="background: yellow">GROUP 6</div>
              <div style="background: yellow">GROUP 7</div>
              <div style="background: yellow">GROUP 8</div>
            </ECol>
            <br />
            <div class="text-xs">Template : {{ htmlCol }}</div>
            <br />
            <div class="text-xs">Data Object : {{ col }}</div>
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
                  <td>col</td>
                  <td><input v-model.number="col.col" type="number" /></td>
                  <td>Number</td>
                  <td>false</td>
                  <td>1</td>
                  <td>Jumlah colum yang di inginakan dalam 1 baris</td>
                </tr>
                <tr>
                  <td>gapX</td>
                  <td><input v-model.number="col.gapX" type="number" /></td>
                  <td>Number</td>
                  <td>false</td>
                  <td>3</td>
                  <td>Gap antar component secara horizontal</td>
                </tr>
                <tr>
                  <td>gapY</td>
                  <td><input v-model.number="col.gapY" type="number" /></td>
                  <td>Number</td>
                  <td>false</td>
                  <td>2</td>
                  <td>Gap antar component secara vertical</td>
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
                    <button @click="metaData('ColComponent')">Click</button>
                  </td>
                  <td>{{ metadata }}</td>
                  <td>Component Information</td>
                </tr>
              </tbody>
            </table>
          </EForm>
          <EForm id="ELeft">
            <ELeft id="LeftComponent" ref="LeftComponent" :gap-x="left.gapX" :gap-y="left.gapY">
              <div style="background: yellow">GROUP 1</div>
              <div style="background: yellow">GROUP 2</div>
              <div style="background: yellow">GROUP 3</div>
            </ELeft>
            <br />
            <div class="text-xs">Template : {{ htmlLeft }}</div>
            <br />
            <div class="text-xs">Data Object : {{ left }}</div>
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
                  <td>gapX</td>
                  <td><input v-model.number="left.gapX" type="number" /></td>
                  <td>Number</td>
                  <td>false</td>
                  <td>3</td>
                  <td>Gap antar component secara horizontal</td>
                </tr>
                <tr>
                  <td>gapY</td>
                  <td><input v-model.number="left.gapY" type="number" /></td>
                  <td>Number</td>
                  <td>false</td>
                  <td>2</td>
                  <td>Gap antar component secara vertical</td>
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
                    <button @click="metaData('LeftComponent')">Click</button>
                  </td>
                  <td>{{ metadata }}</td>
                  <td>Component Information</td>
                </tr>
              </tbody>
            </table>
          </EForm>
          <EForm id="ERight">
            <ERight id="RightComponent" ref="RightComponent" :gap-x="right.gapX" :gap-y="right.gapY">
              <div style="background: yellow">GROUP 1</div>
              <div style="background: yellow">GROUP 2</div>
              <div style="background: yellow">GROUP 3</div>
            </ERight>
            <br />
            <div class="text-xs">Template : {{ htmlRight }}</div>
            <br />
            <div class="text-xs">Data Object : {{ right }}</div>
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
                  <td>gapX</td>
                  <td><input v-model.number="right.gapX" type="number" /></td>
                  <td>Number</td>
                  <td>false</td>
                  <td>3</td>
                  <td>Gap antar component secara horizontal</td>
                </tr>
                <tr>
                  <td>gapY</td>
                  <td><input v-model.number="right.gapY" type="number" /></td>
                  <td>Number</td>
                  <td>false</td>
                  <td>2</td>
                  <td>Gap antar component secara vertical</td>
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
                    <button @click="metaData('RightComponent')">Click</button>
                  </td>
                  <td>{{ metadata }}</td>
                  <td>Component Information</td>
                </tr>
              </tbody>
            </table>
          </EForm>
        </ETabs>
      </EForm>
      <EForm id="Demo List">
        <EList />
      </EForm>
      <EForm id="Demo Entry">
        <EEntry />
      </EForm>
      <EForm id="Plugin">
        <ETabs id="Plugin" :labels="[{ label: 'fmt' }, { label: 'enum' }, { label: 'string' }, { label: 'number' }, { label: 'array' }, { label: 'wrapper' }, { label: 'rest' }]" selected-tab="fmt">
          <EForm id="enum">
            <div>Plugin ini hanya berupa constant placeholder, dimana data data constant di simpanan plugin dapat di access lewat this.$enum. Saat ini sudah terdapat 2 constant utama yaitu VUEX dan LOCAL_STORAGE</div>
          </EForm>
          <EForm id="fmt">
            <div>Plugin ini bertujuan untuk memformat data sebagai presentasi ke ui, plugin ini dapat di access melalui this.$fmt</div>
            <table>
              <thead>
                <tr>
                  <td>Method</td>
                  <td>Return</td>
                  <td>Description</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>date: (value = null, pattern = 'DD/MM/YYYY') => {}</td>
                  <td>String</td>
                  <td>
                    value: Date <br />
                    pattern: String <br />
                    DD=Date (XX), MM=Month (XX), YYYY=Year (YYYY)
                  </td>
                </tr>
                <tr>
                  <td>number: (value = null) => {}</td>
                  <td>String</td>
                  <td>
                    value: Number <br />
                    Akan memformat angka menjadi comma delimeter tanpa fraction
                    <br />
                    Ex: 123456 => 123,456
                  </td>
                </tr>
                <tr>
                  <td>decimal: (value = null, minimumFractionDigits = 0, maximumFractionDigits = 2) => {}</td>
                  <td>String</td>
                  <td>
                    value: Number <br />
                    minimumFractionDigits: Number <br />
                    maximumFractionDigits: Number <br />
                    Akan memformat angka menjadi comma delimeter degan fraction yang tlh di tentukan <br />
                    Ex: 123456.2545 => 123,456.25
                  </td>
                </tr>
              </tbody>
            </table>
          </EForm>
          <EForm id="string">
            <div>Plugin ini bertujuan untuk melakukan menipulasi untuk tipe data string , plugin ini dapat di access melalui this.$string</div>
            <table>
              <thead>
                <tr>
                  <td>Method</td>
                  <td>Return</td>
                  <td>Description</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>replaceByProperty: (string, object) => {}</td>
                  <td>String</td>
                  <td>Akan mereplace operan data string dgn property yang ada di object, dengan menggunakan parameter []. Ex: http://[base_url]/user/profile, akan di repalce dgn { base_url: 'localhost' }</td>
                </tr>
              </tbody>
            </table>
          </EForm>
          <EForm id="number">
            <div>Plugin ini bertujuan untuk melakukan menipulasi untuk tipe data number dan aritmatic oprational , plugin ini dapat di access melalui this.$number</div>
            <table>
              <thead>
                <tr>
                  <td>Method</td>
                  <td>Return</td>
                  <td>Description</td>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </EForm>
          <EForm id="array">
            <div>Plugin ini bertujuan untuk melakukan menipulasi untuk tipe data array , plugin ini dapat di access melalui this.$array</div>
            <table>
              <thead>
                <tr>
                  <td>Method</td>
                  <td>Return</td>
                  <td>Description</td>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </EForm>
          <EForm id="wrapper">
            <div>Plugin ini bertujuan untuk melakukan behaviour yang seragam terhadap ui, plugin ini dapat di access melakui this.$wrapper</div>
            <table>
              <thead>
                <tr>
                  <td>Method</td>
                  <td>Return</td>
                  <td>Description</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>disabled: (data = null, condition = false) => {}</td>
                  <td>Void</td>
                  <td>
                    data: Object with property disabled <br />
                    condition: Boolean <br />
                    Akan meng-set component menjadi disabled atau enabeld, dgn melaukan manipulasi property disabled
                  </td>
                </tr>
                <tr>
                  <td>show: (data = null, condition = false) => {}</td>
                  <td>Void</td>
                  <td>
                    data: Object with property show <br />
                    condition: Boolean <br />
                    Akan meng-set component menjadi visible atau invisible, dgn melaukan manipulasi property show
                  </td>
                </tr>
                <tr>
                  <td>refs: (pref) => {}</td>
                  <td>Array</td>
                  <td>
                    pref: Pointer <br />
                    Akan mengambil semua children pointer, apabila terdapat container, maka akan masuk lagi untuk mengambil children pointer lagi (recursive) Ex : this.$wrapper.refs(this.$refs.entryEForm)
                  </td>
                </tr>
                <tr>
                  <td>clearError: (pref) => {}</td>
                  <td>Void</td>
                  <td>
                    pref: Pointer <br />
                    Akan mengambil semua children pointer, dan akan memanggil method clearError one by one Tujuan dari method ini adalah untuk menghapus semua error message dan mengambalikan ke state original this.$wrapper.clearError(this.$refs.entryEForm)
                  </td>
                </tr>
                <tr>
                  <td>validate: (pref) => {}</td>
                  <td>{ valid: boolean, error: Array }</td>
                  <td>
                    pref: Pointer <br />
                    Akan mengambil semua children pointer, dan akan memanggil method validate one by one Tujuan dari method ini adalah untuk melakukan validasi pada masing masing komponent sesuai dengan rule yang di terapkan this.$wrapper.validate(this.$refs.entryEForm)
                  </td>
                </tr>
                <tr>
                  <td>jquery(selector)</td>
                  <td>instance</td>
                  <td>Akan mengambalikan jquery instance, sebisa mungkin fungsi ini jgn pernah di pake. Hanya gunakan fungsi ini untuk manipulasi ui saja bukan data atau business dapat di access dari this.$wrapper.jquery()</td>
                </tr>
              </tbody>
            </table>
          </EForm>
          <EForm id="rest">
            <div>Plugin ini bertujuan untuk melakukan oprational komunikasi dgn server , plugin ini dapat di access melalui this.$rest. Url dan header props dapat menggunakan enviroment variable dgn menggunakan tag [] contoh : https://[base_url]/users</div>
            <table>
              <thead>
                <tr>
                  <td>Prop</td>
                  <td>Type</td>
                  <td>Description</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>localStorage</td>
                  <td>String</td>
                  <td>Hasil restcall akan di simpan ke localstorage menggunakan id = localStorage, option ini dapat di gunakan dgn cara menyertakan props localStorage pada headers, bila operational yang sama dilakukan, tidak akan melakukan restcall kembali apabila data di localStorage sudah ada</td>
                </tr>
                <tr>
                  <td>vuex</td>
                  <td>String</td>
                  <td>Hasil restcall akan di simpan ke vuex menggunakan id = vuex, option ini dapat di gunakan dgn cara menyertakan props vuex pada headers, bila operational yang sama dilakukan, tidak akan melakukan restcall kembali apabila data di vuex sudah ada</td>
                </tr>
                <tr>
                  <td>saveFn</td>
                  <td>Function</td>
                  <td>Logic untuk menentukan apakah suatu data layak untuk di simpan atau tidak, function ini menerima oparan parameter result dan wajib mengembalikan boolean</td>
                </tr>
                <tr>
                  <td>forceUpdate</td>
                  <td>String</td>
                  <td>forceUpdate akan memaksa untuk melakukan restCall meskipun data di localStorage/vuex tersedia, dan akan di replace oleh next restCall</td>
                </tr>
                <tr>
                  <td>expired</td>
                  <td>number</td>
                  <td>Number in milisecond, timout of expired object in vuex or storage</td>
                </tr>
              </tbody>
            </table>
            <br />
            <table>
              <thead>
                <tr>
                  <td>Method</td>
                  <td>Try</td>
                  <td>Return</td>
                  <td>Description</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>setLocalStorage</td>
                  <td>
                    <button @click="restSetLocalStorage">Click</button>
                  </td>
                  <td>Void</td>
                  <td>Akan menyimpan object { id: 1, name: 'nuxt', description: 'vue next framework' } dengan id USER_FRAMEWORK, silakan lihat pada browser localStorage</td>
                </tr>
                <tr>
                  <td>getLocalStorage</td>
                  <td>
                    <button @click="restGetLocalStorage">Click</button>
                  </td>
                  <td>Object</td>
                  <td>Akan mengambil object { id: 1, name: 'nuxt', description: 'vue next framework' } dengan id USER_FRAMEWORK, silakan lihat console</td>
                </tr>
                <tr>
                  <td>removeLocalStorage</td>
                  <td>
                    <button @click="restRemoveLocalStorage">Click</button>
                  </td>
                  <td>Void</td>
                  <td>Menghapus object yang di simpan pada local storage</td>
                </tr>
                <tr>
                  <td>setVuex</td>
                  <td>
                    <button @click="restSetVuex">Click</button>
                  </td>
                  <td>Void</td>
                  <td>Akan menyimpan object { id: 1, name: 'nuxt', description: 'vue next framework' } dengan id USER_FRAMEWORK, silakan lihat pada browser Vuex debugger</td>
                </tr>
                <tr>
                  <td>getVuex</td>
                  <td>
                    <button @click="restGetVuex">Click</button>
                  </td>
                  <td>Object</td>
                  <td>Akan mengambil object { id: 1, name: 'nuxt', description: 'vue next framework' } dengan id USER_FRAMEWORK, silakan lihat console</td>
                </tr>
                <tr>
                  <td>removeVuex</td>
                  <td>
                    <button @click="restRemoveVuex">Click</button>
                  </td>
                  <td>Void</td>
                  <td>Menghapus object yang di simpan pada vuex</td>
                </tr>
                <tr>
                  <td>get</td>
                  <td>
                    <button @click="restGetExample">Click</button>
                  </td>
                  <td>Object</td>
                  <td>Oprational rest call get, yang meng-support property localStorage, vuex dan forceUpdate, lihat console. Hasil oprational ini akan menghasilkan object { result, error }</td>
                </tr>
                <tr>
                  <td>post</td>
                  <td>
                    <button @click="restPostExample">Click</button>
                  </td>
                  <td>Object</td>
                  <td>Oprational rest call post, yang meng-support property localStorage, vuex dan forceUpdate, lihat console. Hasil oprational ini akan menghasilkan object { result, error }</td>
                </tr>
              </tbody>
            </table>
          </EForm>
        </ETabs>
      </EForm>
    </ETabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      htmlText: '<EText id="" ref="" v-model="" :label="" :placeholder="" :type="" :required="" :disabled="" :show="" />',
      htmlPassword: '<EPassword id="" ref="" v-model="" :label="" :placeholder="" :maxlength="" :required="" :disabled="" :show="" />',
      htmlTextarea: '<ETextArea id="" ref="" v-model="" :label="" :placeholder="" :maxlength="" :required="" :disabled="" :cols="" :rows="" :show="" />',
      htmlButton: '<EButton id="" ref="" :label="" :disabled="" :color="" :show="" @click="" />',
      htmlNumber: '<ENumber id="" ref="" v-model="" :label="" :placeholder="" :maxlength="" :required="" :disabled="" :show="" :allowMinus="" :separator="" :minimum="" :maximum=""/>',
      htmlDecimal: '<EDecimal id="" ref="" v-model="" :label="" :placeholder="" :maxlength="" :required="" :disabled="" :show="" :allowMinus="" :separator="" :minimum="" :maximum="" :minimumFractionDigits="" :maximumFractionDigits=""/>',
      htmlDate: '<EDate id="" ref="" v-model="" :label="" :required="" :disabled="" :show="" :minimum="" :maximum=""/>',
      htmlTime: '<ETime id="" ref="" v-model="" :label="" :required="" :disabled="" :show="" :minimum="" :maximum=""/>',
      htmlCheckbox: '<ECheckBox id="" ref="" v-model="" :label="" :disabled="" :show="" :selected="" :unselected=""/>',
      htmlBoolean: '<EBoolean id="" ref="" v-model="" :label="" :placeholder="" :required="" :disabled="" :show="" :type="" />',
      htmlSelect: '<ESelect id="" ref="" v-model="" :label="" :placeholder="" :required="" :disabled="" :show="" :as="" :options="[{ value: null, description: null }]" />',
      htmlLookup: '<ELookup id="" ref="" v-model="" :label="" :placeholder="" :required="" :disabled="" :show="" :as="" :lookupGroup="" />',
      htmlDialog: '<EDialog id="" ref="" :title="" :width="" :height="" :buttons="[{ label:"", emit:"", color: null }]"> Contents </EDialog>',
      htmlConfirmation: '<EConfirmation id="" ref="" :positive="" :negative="" />',
      htmlLoading: '<ELoading ref="loader" />',
      htmlMessage: '<EMessage id="" ref="" />',
      htmlCard: '<ECard ref="" :label="" :disabled="" :show="" >Contents </ECard>',
      htmlTabs: '<ETabs id="" ref="" :labels="[{ label:null , disabled: false }]" :disabled="" :show="" >Contents </ETabs>',
      htmlFilter: '<EFilter id="" ref="" :title="" :disabled="" :show="" @Clear="" @Search="">Contents </EFilter>',
      htmlPageLoader: '<EPageLoader id="" ref="" :labels="" :fetcher="()=>{}" >Contents</EPageLoader>',
      htmlLocalPagination: '<ELocalPagination id="" ref="" :label="" :show="" :disabled="" :disabledAction="()=>{}" :addNewData="()=>" :saveState="()=>" :columns="[]" :rows="[]" :actions="[]" :buttons="[]" :initialSortBy="[]" @RowClick="()=>{}" />',
      htmlLocalPaginationColumn: '{ label:"", field:"", sortable: true, width:"100px", tooltip:"", type:"", :format="()=>{}" } // type = text, number, decimal, percentage, boolean',
      htmlLocalPaginationinitialSortBy: "{ field: '', type:'' } // type = asc/desc",
      htmlLocalPaginationActions: "{ label:'', emit:'' }",
      htmlLocalPaginationButtons: '{ label:"", color:"", emit:"" }',
      htmlServerPagination: '<EServerPagination id="" ref="" :label="" :show="" :disabled="" :columns="[]" :autoLoad="" :picker="" :filter="" ::addNewData="()=>{}" :disabledAction="()=>{}" :actions="[]" :buttons="[]" :initialSortBy="[]" @RowClick="()=>{}" />',
      htmlServerPaginationColumn: '{ label:"", field:"", sortable: true, width:"100px", tooltip:"", type:"", :format="()=>{}" } // type = text, number, decimal, percentage, boolean',
      htmlServerPaginationActions: "{ label:'', emit:'' }",
      htmlServerPaginationButtons: '{ label:"", color:"", emit:"" }',
      htmlServerPaginationinitialSortBy: "{ field: '', type:'' } // type = asc/desc",
      htmlPopupPagination: '<EPopupPagination id="" ref="" v-model="" :label="" :placeholder="" :show="" :required="" :disabled="" :show="" :maxlength="" :picker="" :filter="" :columns="[]"  />',
      htmlPopupPaginationColumn: "{ label:'', field:'', sortable: true, width:'100px', tooltip:'', type:'' } // type = text, number, decimal, percentage, boolean",
      htmlForm: '<EForm id="" ref="" />',
      htmlCol: '<ECol :col="" :gapX="" :gapY="" />',
      htmlLeft: '<ELeft :gapX="" :gapY="" />',
      htmlRight: '<ERight :gapX="" :gapY="" />',
      haserror: null,
      metadata: null,
      valid: null,
      fetchedData: false,
      tabs: [
        { label: 'EText' },
        { label: 'EPassword' },
        { label: 'ETextArea' },
        { label: 'EButton' },
        { label: 'ENumber' },
        { label: 'EDecimal' },
        { label: 'EDate' },
        { label: 'ETime' },
        { label: 'ECheckbox' },
        { label: 'EBoolean' },
        { label: 'ESelect' },
        { label: 'ELookup' },
        { label: 'EDialog' },
        { label: 'ELoading' },
        { label: 'EMessage' },
        { label: 'EConfirmation' },
        { label: 'ECard' },
        { label: 'ETabs' },
        { label: 'EFilter' },
        { label: 'EPageLoader' },
        { label: 'EUpload' },
        { label: 'ELocalPagination' },
        { label: 'EServerPagination' },
        { label: 'EPopupPagination' },
        { label: 'EForm' },
        { label: 'ECol' },
        { label: 'ELeft' },
        { label: 'ERight' },
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
      select: {
        label: 'Jenis Kelamin',
        placeholder: 'Please Select...',
        required: false,
        disabled: false,
        show: true,
        value: null,
        as: 'string',
        options: [
          { value: 'M', description: 'Male' },
          { value: 'F', description: 'Female' },
          { value: 'X', description: 'Unknown' },
        ],
        vruntime: (data) => {
          console.log(data)
        },
      },
      lookup: {
        label: 'Jenis Kelamin',
        lookupGroup: 'SEX',
        placeholder: 'Please Select...',
        required: false,
        disabled: false,
        show: true,
        value: null,
        as: 'string',
        vruntime: (data) => {
          console.log(data)
        },
        filter: (lookupGroup, options) => {
          console.log('lookupGroup ', lookupGroup)
          options.pop()
          return options
        },
      },
      dialog: {
        title: 'Dialog Title',
        width: 600,
        height: 100,
        buttons: [
          { label: 'Simpan', color: 'green', emit: 'EmitSimpan' },
          { label: 'Submit', color: 'purple', emit: 'Submit' },
        ],
      },
      confirmation: {
        positive: 'Tentu',
        negative: 'Gax',
      },
      card: {
        label: 'Card Label',
        show: true,
        disabled: false,
      },
      tabss: {
        labels: [
          { label: 'Customer', disabled: true },
          { label: 'Order', disabled: false },
          { label: 'Transaction', disabled: false },
        ],
        show: true,
        disabled: false,
        selectedTab: 'Order',
      },
      filter: {
        title: 'Customer Search',
        disabled: false,
        show: true,
      },
      pageLoader: {
        label: 'Tab PageLoder',
      },
      localPagination: {
        label: 'List of Customer',
        show: true,
        disabled: false,
        buttons: [
          { label: 'Process', color: 'red' },
          { label: 'Migrate', color: 'green' },
        ],
        actions: [{ label: 'Delete' }, { label: 'Edit' }, { label: 'View' }],
        initialSortBy: [
          { field: 'age', type: 'asc' },
          { field: 'name', type: 'asc' },
        ],
        columns: [
          {
            label: 'Name',
            field: 'name',
            sortable: true,
            width: '750px',
            tooltip: 'Column Name',
            type: 'text',
            format: (props) => {
              return 'Nama-nya ' + props.formattedRow[props.column.field]
            },
          },
          {
            label: 'Bith Date',
            field: 'birthDate',
            sortable: false,
            width: '200px',
            tooltip: 'Tanggal Lahir Customer',
            type: 'date',
          },
          {
            label: 'Age',
            field: 'age',
            sortable: true,
            width: '100px',
            tooltip: 'Umur Customer ',
            type: 'number',
          },
          {
            label: 'Saving ($)',
            field: 'saving',
            sortable: true,
            width: '200px',
            tooltip: 'Simpanan Dalam mata uang dollar',
            type: 'decimal',
          },
          {
            label: 'Loan Alocate',
            field: 'loanPct',
            sortable: true,
            width: '150px',
            tooltip: 'Alokasi jatah pinjaman',
            type: 'percentage',
          },
          {
            label: 'Merried',
            field: 'merried',
            sortable: true,
            width: '100px',
            tooltip: 'Sudah menikah atau belum',
            type: 'boolean',
          },
        ],
        rows: [
          {
            id: 541,
            name: 'John Mecan',
            birthDate: new Date(),
            age: 15,
            saving: 158.514,
            loanPct: 15.68,
            merried: true,
          },
          {
            id: 542,
            name: 'Agus sulisanto',
            birthDate: new Date(),
            age: 54,
            saving: 9816.55,
            loanPct: 45.98145,
            merried: false,
          },
          {
            id: 543,
            name: 'Hero ranto',
            birthDate: new Date(),
            age: 26,
            saving: 9845.54,
            loanPct: 65.7945,
            merried: false,
          },
          {
            id: 544,
            name: 'Elvino Tan',
            birthDate: new Date(),
            age: 42,
            saving: 158.95,
            loanPct: 25.87984,
            merried: true,
          },
          {
            name: 'Carinnia Untoro',
            birthDate: new Date(),
            age: 41,
            saving: 9444.112,
            loanPct: 89.745,
            merried: true,
          },
          {
            name: 'Constantine Davin Ethan',
            birthDate: new Date(),
            age: 15,
            saving: 9841618.564198,
            loanPct: 15.745,
            merried: false,
          },
          {
            id: 547,
            name: 'Yanto ono',
            birthDate: new Date(),
            age: 74,
            saving: 581458.8841894,
            loanPct: 98.158,
            merried: true,
          },
          {
            id: 548,
            name: 'Cristina ',
            birthDate: new Date(),
            age: 45,
            saving: 7545775.755,
            loanPct: 48.75,
            merried: false,
          },
          {
            id: 549,
            name: 'Urika ikada',
            birthDate: new Date(),
            age: 56,
            saving: 5873.85636,
            loanPct: 74.75,
            merried: true,
          },
          {
            id: 550,
            name: 'Sulitaianto Aryo',
            birthDate: new Date(),
            age: 54,
            saving: 8852.44,
            loanPct: 94.75,
            merried: true,
          },
          {
            id: 551,
            name: 'Brima doa',
            birthDate: new Date(),
            age: 95,
            saving: 8638.77418,
            loanPct: 47.75,
            merried: true,
          },
          {
            id: 551,
            name: 'Ibna uban',
            birthDate: new Date(),
            age: 74,
            saving: 2356.258,
            loanPct: 35.75,
            merried: true,
          },
        ],
      },
      serverPagination: {
        label: 'List of Customer',
        show: true,
        disabled: false,
        autoLoad: true,
        picker: 'pagingDummyCustomer',
        buttons: [
          { label: 'Process', color: 'red' },
          { label: 'Migrate', color: 'green' },
        ],
        actions: [{ label: 'Delete' }, { label: 'Edit' }, { label: 'View' }],
        initialSortBy: [
          { field: 'age', type: 'asc' },
          { field: 'name', type: 'asc' },
        ],
        filter: {},
        columns: [
          {
            label: 'Name',
            field: 'name',
            sortable: true,
            width: '400px',
            tooltip: 'Column Name',
            type: 'text',
          },
          {
            label: 'Bith Date',
            field: 'birthDate',
            sortable: false,
            width: '150px',
            tooltip: 'Tanggal Lahir Customer',
            type: 'date',
          },
          {
            label: 'Age',
            field: 'age',
            sortable: true,
            width: '100px',
            tooltip: 'Umur Customer ',
            type: 'number',
          },
          {
            label: 'Saving ($)',
            field: 'saving',
            sortable: true,
            width: '200px',
            tooltip: 'Simpanan Dalam mata uang dollar',
            type: 'decimal',
          },
          {
            label: 'Loan Alocate',
            field: 'loanPct',
            sortable: true,
            width: '150px',
            tooltip: 'Alokasi jatah pinjaman',
            type: 'percentage',
          },
          {
            label: 'Merried',
            field: 'merried',
            sortable: true,
            width: '100px',
            tooltip: 'Sudah menikah atau belum',
            type: 'boolean',
          },
          {
            field: 'action',
            width: '200px',
          },
        ],
      },
      col: {
        col: 1,
        gapX: 3,
        gapY: 2,
      },
      left: {
        gapX: 3,
        gapY: 2,
      },
      right: {
        gapX: 3,
        gapY: 2,
      },
      popupPagination: {
        value: 'JAH',
        label: 'Customer',
        placeholder: 'Code',
        required: true,
        disabled: false,
        maxlength: 6,
        show: true,
        vruntime: (data) => {
          console.log('vruntime ', data)
        },
        picker: 'popupDummyCustomer',
        filter: {},
        columns: [
          {
            label: 'Age',
            field: 'age',
            sortable: true,
            width: '50px',
            tooltip: 'Customer Age',
            type: 'number',
          },
        ],
      },
    }
  },
  computed: {
    getUserComputed() {
      return this.$store.getters.getAllItem()
    },
  },
  methods: {
    SimpanClicked() {
      alert('Simpan Clicked')
    },
    SubmitClicked() {
      alert('Submit Clicked')
    },
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
    addError(ref) {
      this.$refs[ref].addError('Add Error, programacally')
    },
    openDialog(ref) {
      this.$refs[ref].open()
    },
    closeDialog(ref) {
      this.$refs[ref].close()
    },
    showLoading(ref) {
      this.$refs[ref].show('Fetch Data Customer')
      const self = this
      setTimeout(() => {
        self.$refs[ref].hide()
      }, 5000)
    },
    successLoading(ref) {
      this.$refs[ref].show('Success Operation Example')
      const self = this
      setTimeout(() => {
        self.$refs[ref].success()
      }, 5000)
    },
    failLoading(ref) {
      this.$refs[ref].show('Fail Operation Example')
      const self = this
      setTimeout(() => {
        self.$refs[ref].fail()
      }, 5000)
    },
    successMessage(ref) {
      this.$refs[ref].success('Berhasil mengambil data customer')
    },
    errorMessage(ref) {
      this.$refs[ref].error('Gagal mengambil data customer')
    },
    closeMessage(ref) {
      this.$refs[ref].close()
    },
    async confirmConfirmation(ref) {
      const result = await this.$refs[ref].confirm('Anda yakin akan memprocess data ini ?')
      alert('Return object ' + JSON.stringify(result))
    },
    closeConfirmation(ref) {
      this.$refs[ref].close()
    },
    setSelectedTab(ref) {
      this.$refs[ref].setSelectedTab('Transaction')
    },
    addNewTab() {
      this.tabss.labels[0].disabled = false
      this.tabss.labels[1].disabled = true
      this.tabss.labels.push({ label: 'Delivery', disabled: false })
    },
    pageLoaderfetcher() {
      const self = this
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(self.fetchedData)
          self.fetchedData = true
        }, 3000)
      })
    },
    localPaginationDelete(props) {
      alert('Delete ' + JSON.stringify(props))
    },
    localPaginationEdit(props) {
      alert('Edit ' + JSON.stringify(props))
    },
    localPaginationView(props) {
      alert('View ' + JSON.stringify(props))
    },
    localPaginationDisabledAction(action, prop) {
      if (action.label === 'Delete' && prop.row.age > 50) return true
      return false
    },
    localPaginationProcess(selectedRow) {
      alert('Process ' + JSON.stringify(selectedRow))
    },
    localPaginationMigrate(selectedRow) {
      alert('Migrate ' + JSON.stringify(selectedRow))
    },
    localPaginationRowClick(prop) {
      alert('Click ' + JSON.stringify(prop))
    },
    localPaginationAddNewData() {
      alert('Add New Data')
    },
    localPaginationSaveState(prop) {
      return prop.row.id
    },
    serverPaginationDelete(props) {
      alert('Delete ' + JSON.stringify(props))
    },
    serverPaginationEdit(props) {
      alert('Edit ' + JSON.stringify(props))
    },
    serverPaginationView(props) {
      alert('View ' + JSON.stringify(props))
    },
    serverPaginationDisabledAction(action, prop) {
      if (action.label === 'Delete' && prop.row.age > 50) return true
      return false
    },
    serverPaginationProcess(selectedRow) {
      alert('Process ' + JSON.stringify(selectedRow))
    },
    serverPaginationMigrate(selectedRow) {
      alert('Migrate ' + JSON.stringify(selectedRow))
    },
    serverPaginationRowClick(prop) {
      alert('Click ' + JSON.stringify(prop))
    },
    serverPaginationAddNewData() {
      alert('Add New Data')
    },
    setShow(ref) {
      this.$refs[ref].setShow(false)
    },
    filterClear() {
      alert('Button Clear clicked')
    },
    filterSearch() {
      alert('Button Search clicked')
    },
    async restGetExample() {
      const localStorageId = this.$enum.LOCAL_STORAGE.EXAMPLE
      console.log('Lakukan get dgn opsi localStorage: ', localStorageId)
      await this.$rest.get(`/api/example/biodata/10`, {
        btpnApiKey: '[test_api_key]',
        localStorage: localStorageId,
      })
      console.log('Fetch melalui getLocalStorage', this.$rest.getLocalStorage(localStorageId))
    },
    async restPostExample() {
      const vuexId = this.$enum.VUEX.EXAMPLE
      console.log('Lakukan post dgn opsi vuex: ', vuexId)
      await this.$rest.post(
        `/api/example/biodata`,
        { id: 1, name: 'nuxt' },
        {
          btpnApiKey: '[test_api_key]',
          vuex: vuexId,
          expired: 5000,
        }
      )
      console.log('Fetch melalui getVuex', this.$rest.getVuex(vuexId))
    },
    restSetLocalStorage() {
      this.$rest.setLocalStorage('USER_FRAMEWORK', {
        id: 1,
        name: 'nuxt',
        description: 'vue next framework',
      })
    },
    restGetLocalStorage() {
      const object = this.$rest.getLocalStorage('USER_FRAMEWORK')
      console.log('Object USER_FRAMEWORK ', object)
    },
    restRemoveLocalStorage() {
      this.$rest.removeLocalStorage('USER_FRAMEWORK')
      console.log('Object USER_FRAMEWORK removed')
    },
    restSetVuex() {
      this.$rest.setVuex('USER_FRAMEWORK', {
        id: 1,
        name: 'nuxt',
        description: 'vue next framework',
      })
    },
    restGetVuex() {
      const object = this.$rest.getVuex('USER_FRAMEWORK')
      console.log('Object USER_FRAMEWORK ', object)
    },
    restRemoveVuex() {
      this.$rest.removeVuex('USER_FRAMEWORK')
      console.log('Object USER_FRAMEWORK removed')
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
