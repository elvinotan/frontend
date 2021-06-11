<template>
  <transition v-if="visible" name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" style="width: 300px">
          <div
            class="text-xs rounded border-0 outline-none ring-2"
            :class="[_cssBorder, _cssInputBg]"
          >
            <div
              class="font-bold rounded-t text-sm text-gray-800 w-auto p-1"
              :class="[_cssLabelBg]"
            >
              Loading...
            </div>
            <div
              class="modal-body rounded p-3 w-full flex justify-start"
              :class="[_cssInputBg]"
            >
              <svg
                id="loader-1"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                width="40px"
                height="40px"
                viewBox="0 0 40 40"
                enable-background="new 0 0 40 40"
                xml:space="preserve"
              >
                <path
                  opacity="0.2"
                  fill="#000"
                  d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
    s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
    c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"
                />
                <path
                  fill="#000"
                  d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
    C22.32,8.481,24.301,9.057,26.013,10.047z"
                >
                  <animateTransform
                    attributeType="xml"
                    attributeName="transform"
                    type="rotate"
                    from="0 20 20"
                    to="360 20 20"
                    dur="0.5s"
                    repeatCount="indefinite"
                  />
                </path>
              </svg>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
              <div>
                <div class="font-bold text-xs">Please wait....</div>
                <div class="text-xs">{{ label }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'Loading',
  data() {
    return {
      visible: false,
      label: '',
    }
  },
  computed: {
    _cssBorder() {
      return 'ring-gray-500'
    },
    _cssLabelBg() {
      return 'bg-gray-300'
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
    show(label) {
      this.visible = true
      this.label = label
    },
    hide() {
      this.visible = false
    },
    success() {
      this.label = (this.label + ' success').trim()
      const self = this
      setTimeout(() => {
        self.visible = false
        self.label = ''
      }, 1000)
    },
    fail() {
      this.label = (this.label + ' fail').trim()
      const self = this
      setTimeout(() => {
        self.visible = false
        self.label = ''
      }, 1000)
    },
  },
}
</script>
<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9999;
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
