<template>
  <div>
    <div
      class="text-xs rounded border-0 pl-1 outline-none bg-white flex justify-start"
    >
      <div
        v-for="tab of labels"
        :key="tab.label"
        class="font-bold rounded-t-lg text-sm w-auto px-3 mr-0.5 ring-2 ring-gray-500 cursor-pointer"
        :class="[_cssSelectedTab(tab.label)]"
        @click="setSelectedTab(tab.label)"
      >
        {{ tab.label }}
      </div>
    </div>
    <EForm
      :id="'Tabs' + id + 'Content'"
      ref="contents"
      class="text-xs rounded border-0 outline-none p-2 mt-0.5 ring-2 ring-gray-500 bg-white"
    >
      <slot />
    </EForm>
  </div>
</template>
<script>
export default {
  name: 'Tabs',
  props: {
    id: { type: String, required: true },
    labels: { type: Array, required: false, default: () => [] },
    selectedTab: { type: String, required: false, default: null },
  },
  data() {
    return {
      lselectedTab: this.selectedTab,
    }
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
      for (const ref of this.$refs.contents.$children) {
        const state = this.lselectedTab === ref.id
        ref.setShow(state)
        if (state) this.$emit('selected', ref.id)
      }
    },
    _cssSelectedTab(label) {
      return this.lselectedTab === label
        ? 'bg-green-500 text-white'
        : 'bg-gray-300 text-gray-800'
    },
  },
}
</script>
