<template>
  <div v-if="show">
    <div class="w-full flex flex-row justify-start rounded border-0 ring-2 ring-gray-500 focus:outline-none" :class="[_cssBorder, _cssInputBg, _cssInputText]">
      <div v-for="(b, i) of crumbs" :key="b.code" :class="_cssCursor" class="text-sm font-bold py-1 px-2" @click="_click(b)">{{ b.description }}&nbsp;&nbsp;&nbsp;{{ i === crumbs.length - 1 ? '' : '>' }}</div>
    </div>
  </div>
</template>
<script>
const app = {
  code: 'BN000',
  name: 'home',
  description: 'App Home',
  leaf: false,
  sub: [
    {
      code: 'BN001',
      name: 'docs',
      description: 'Component',
      leaf: false,
      pCode: 'BN000',
    },
    {
      code: 'BN002',
      name: 'biodata-list',
      description: 'Biodata',
      leaf: false,
      pCode: 'BN000',
      sub: [
        {
          code: 'BN003',
          name: 'biodata-entry',
          description: 'Entry',
          leaf: false,
          pCode: 'BN002',
        },
        {
          code: 'BN004',
          name: 'biodata-approval',
          description: 'Approval',
          leaf: false,
          pCode: 'BN002',
        },
      ],
    },
  ],
}
export default {
  name: 'EBreadcrumb',
  props: {
    color: { type: String, required: false, default: 'gray' },
    disabled: { type: Boolean, required: false, default: false },
    show: { type: Boolean, required: false, default: true },
  },
  data() {
    return {
      flat: null,
      crumbs: [],
    }
  },
  computed: {
    _cssBorder() {
      const color = this.color ? this.color : 'gray'
      return `ring-${color}-600 focus:ring-${color}-100`
    },
    _cssInputBg() {
      return 'bg-gray-200'
    },
    _cssCursor() {
      return this.disabled ? 'cursor-not-allowed' : 'cursor-pointer'
    },
    _cssInputText() {
      const css = this.disabled ? 'text-gray-500' : 'text-gray-800'
      return css
    },
  },
  created() {
    // TODO menu harus di fetch pada saat login, dan harus di kirim ke breadcrum, wajib already exist sebelumm di pakai
    if (!this.flat) {
      this.flat = {}
      this._makeMenuFlat(app)
    }

    this.$bus.$on(this.$enum.EVENT_BUS.BREADCRUMBS, (code) => {
      this._reconstract(code)
    })
  },
  methods: {
    _makeMenuFlat(app, pCode) {
      const { sub, ...other } = app
      if (other.code) this.flat[other.code] = { ...other, pCode }
      if (other.name) this.flat[other.name] = { ...other, pCode }

      if (sub)
        for (const s of sub) {
          this._makeMenuFlat(s, other.code)
        }
    },
    _click(menu) {
      if (this.disabled) return // do nothing

      this.$nav.to({ name: menu.name })
    },
    _reconstract(code) {
      this.crumbs = []

      let menu
      do {
        menu = this.flat[code]
        this.crumbs.push(menu)
        code = menu.pCode
      } while (menu.pCode)
      this.crumbs.reverse()
    },
    metaData() {
      return {
        name: this._name,
        type: 'container',
        show: this.show,
      }
    },
  },
}
</script>
