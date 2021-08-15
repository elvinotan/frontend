<template>
  <div v-if="show">
    <div class="text-xs rounded border-0 pl-1 outline-none bg-white flex justify-start flex-wrap gap-y-0">
      <div v-for="tab of labels" :key="tab.label" class="font-bold rounded-t-lg text-sm w-auto px-3 mr-0.5 ring-2 ring-gray-500" :class="[_cssSelectedTab(tab), _cssCursor(tab)]" @click="tab.disabled ? null : setSelectedTab(tab.label)">
        {{ tab.label }}
      </div>
    </div>
    <EForm :id="id + 'Content'" :ref="id + 'Content'" class="text-xs rounded border-0 outline-none p-2 mt-0.5 ring-2 ring-gray-500 bg-white" :class="[_cssInputBg]">
      <slot />
    </EForm>
  </div>
</template>
<script>
export default {
  name: 'ETabs',
  props: {
    id: { type: String, required: true },
    labels: { type: Array, required: false, default: () => [] },
    selectedTab: { type: String, required: false, default: null },
    show: { type: Boolean, required: false, default: true },
    disabled: { type: Boolean, required: false, default: false },
  },
  data() {
    return {
      lselectedTab: this.selectedTab,
    }
  },
  computed: {
    _cssInputBg() {
      return this.disabled ? 'bg-gray-200' : 'bg-white'
    },
  },
  watch: {
    selectedTab(newVal, oldVal) {
      this.setSelectedTab(newVal)
    },
  },
  mounted() {
    this.setSelectedTab(this.lselectedTab)
  },
  methods: {
    metaData() {
      return {
        name: this._name,
        type: 'container',
        show: true,
      }
    },
    setSelectedTab(lselectedTab) {
      this.lselectedTab = lselectedTab
      for (const ref of this.$refs[this.id + 'Content'].$children) {
        const state = this.lselectedTab === ref.id
        ref.setShow(state)
        if (state) this.$emit('selected', ref.id)
      }
    },
    _cssSelectedTab(tab) {
      if (tab.disabled) return 'bg-gray-300 text-gray-400'
      return this.lselectedTab === tab.label ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-800'
    },
    _cssCursor(tab) {
      return tab.disabled ? 'cursor-not-allowed' : 'cursor-pointer'
    },
  },
}
</script>
