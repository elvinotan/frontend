<template>
  <transition v-if="visible" name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" style="width: 500px">
          <div
            class="text-xs rounded border-0 outline-none ring-2"
            :class="[_cssBorder, _cssInputBg]"
          >
            <div
              class="font-bold rounded-t text-sm bg-gray-300 text-gray-800 w-auto p-1"
            >
              Confirmation
            </div>
            <div
              class="modal-body p-3 w-full flex justify-start"
              :class="[_cssInputBg]"
            >
              <div>
                <img src="~/assets/images/confirm.png" />
              </div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
              <div class="text-sm flex flex-wrap content-center">
                {{ label }}
              </div>
            </div>
            <span
              class="rounded-b bg-gray-100 w-auto p-2 flex justify-end space-x-5"
            >
              <EButton
                :id="'ConfirmationClose' + id"
                class="w-full justify-start"
                label="Close"
                color="gray"
                @click="_button('Close')"
              />
              <EButton
                :id="'ConfirmationYes' + id"
                :label="positive"
                color="green"
                @click="_button(positive)"
              />
              <EButton
                :id="'ConfirmationNo' + id"
                :label="negative"
                color="red"
                @click="_button(negative)"
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'Confirmation',
  props: {
    id: { type: String, required: true },
    positive: { type: String, required: false, default: 'Yes' },
    negative: { type: String, required: false, default: 'No' },
  },
  data() {
    return {
      visible: false,
      label: '',
      resolve: null,
    }
  },
  computed: {
    _cssBorder() {
      return 'ring-gray-500'
    },
    _cssInputBg() {
      return 'bg-white'
    },
  },
  methods: {
    _button(prop) {
      this.visible = false
      const result = {}
      result[prop] = true
      this.resolve(result)
    },
    metaData() {
      return {
        name: this._name,
        type: 'container',
        show: true,
      }
    },
    confirm(label) {
      this.label = label
      this.visible = true
      return new Promise((resolve, reject) => {
        this.resolve = resolve
      })
    },
    close() {
      this.visible = false
    },
  },
}
</script>
<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 1200px;
  margin: 1px auto;
  padding: 1px 1px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 8px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 1px 0;
  height: 70px;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.loader {
  border-top-color: #3498db;
  -webkit-animation: spinner 1.5s linear infinite;
  animation: spinner 1.5s linear infinite;
}

@-webkit-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
