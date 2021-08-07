<template>
  <div v-if="show">
    <ECard :label="label">
      <div v-for="msg of messages" :key="msg.message">
        <div class="font-bold text-sm w-auto p-1" :class="[_errColor(msg)]">- {{ msg.msg }}</div>
      </div>
    </ECard>
  </div>
</template>
<script>
// TYPE : ERROR, WARNING, INFO
export default {
  name: 'EInformation',
  props: {
    label: { type: String, required: true, default: 'Validation' },
  },
  data() {
    return {
      show: false,
      messages: [],
    }
  },
  methods: {
    _errColor(msg) {
      if (msg.type === 'ERROR') return 'text-red-500'
      if (msg.type === 'WARNING') return 'text-yellow-500'
      if (msg.type === 'INFORMATION') return 'text-green-500'
      return 'text-gray-500'
    },
    _addTimer() {
      this.show = true
      const self = this
      setTimeout(() => {
        self.show = false
      }, 5000)
    },
    metaData() {
      return {
        name: this._name,
        type: 'container',
        show: true,
      }
    },
    addRestError(error) {
      this.messages = []
      if (error) {
        for (const err of error) {
          if (err.type === 'GLOBAL') {
            this.messages.push({ type: 'ERROR', msg: err.message })
          }
        }
      }
      this._addTimer()
    },
    addError(error) {
      this.messages = []
      for (const err of error) {
        this.messages.push({ type: 'ERROR', msg: err })
      }
      this._addTimer()
    },
    addWarning(warning) {
      this.messages = []
      for (const war of warning) {
        this.messages.push({ type: 'WARNING', msg: war })
      }
      this._addTimer()
    },
    addInformation(information) {
      this.messages = []
      for (const info of information) {
        this.messages.push({ type: 'INFORMATION', msg: info })
      }
      this._addTimer()
    },
  },
}
</script>
