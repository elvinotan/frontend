<template>
  <div>
    <div v-if="show">
      <div
        class="text-xs rounded border-0 outline-none ring-2"
        :class="[_cssBorder, _cssInputBg]"
      >
        <div
          v-if="label"
          class="font-bold rounded-t text-sm text-gray-800 w-auto p-1"
          :class="[_cssLabelBg]"
        >
          {{ label ? label.replace(/\s/g, '&nbsp;') : '' }}
        </div>
        <div class="rounded p-3 w-full" :class="[_cssRounded, _cssInputBg]">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Card',
  props: {
    id: { type: String, required: true, default: null },
    label: { type: String, required: false, default: '' },
    disabled: { type: Boolean, required: false, default: false },
    show: { type: Boolean, required: false, default: true },
  },
  data() {
    return {}
  },
  computed: {
    _cssRounded() {
      return this.label ? '' : 'rounded'
    },
    _cssBorder() {
      return 'ring-gray-500'
    },
    _cssLabelBg() {
      return 'bg-gray-300'
    },
    _cssInputBg() {
      return this.disabled ? 'bg-gray-200' : 'bg-white'
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
  },
}
</script>
