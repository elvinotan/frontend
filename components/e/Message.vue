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
              :class="[_cssLabelBg]"
            >
              Information
            </div>
            <div
              class="modal-body p-3 w-full flex justify-start"
              :class="[_cssInputBg]"
            >
              <div>
                <img
                  v-if="type === 'success'"
                  src="~/assets/images/success.jpg"
                />
                <img v-if="type === 'error'" src="~/assets/images/error.png" />
              </div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
              <div class="text-sm flex flex-wrap content-center">
                {{ label }}
              </div>
            </div>
            <div class="rounded-b bg-gray-100 w-auto p-2 flex justify-end">
              <EButton
                :id="'Message' + id"
                label="Close"
                :color="type === 'success' ? 'green' : 'red'"
                @click="_button('Close')"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'Message',
  props: {
    id: { type: String, required: true },
  },
  data() {
    return {
      visible: false,
      label: '',
      type: 'success',
      resolve: null,
    }
  },
  computed: {
    _cssBorder() {
      return 'ring-gray-500'
    },
    _cssLabelBg() {
      return this.type === 'success' ? 'bg-green-300' : 'bg-red-300'
    },
    _cssInputBg() {
      return 'bg-white'
    },
  },
  methods: {
    metaData() {
      return {
        name: this._name,
        type: 'container',
        show: true,
      }
    },
    _button(prop) {
      this.visible = false
      const result = {}
      result[prop] = true
      this.resolve(result)
    },
    success(label) {
      this.label = label
      this.type = 'success'
      this.visible = true
      return new Promise((resolve, reject) => {
        this.resolve = resolve
      })
    },
    error(label) {
      this.visible = true
      this.label = label
      this.type = 'error'
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
