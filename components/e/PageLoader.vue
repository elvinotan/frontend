<template>
  <div>
    <div v-if="loaded" :id="id"><slot /></div>

    <div v-else-if="fetched" :id="id" class="text-center h-full grid grid-cols-1 flex justify-center">
      <div class="flex justify-center">
        <svg id="loader-1" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="40px" height="40px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve">
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
            <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 20 20" to="360 20 20" dur="0.5s" repeatCount="indefinite" />
          </path>
        </svg>
      </div>
      <div class="font-bold text-sm">Please wait....</div>
      <div class="text-xs">Loading Page {{ label }}</div>
    </div>
    <div v-else :id="id" class="text-center grid grid-cols-1 flex justify-center">
      <div class="font-bold text-sm p-2">Fail To Load {{ label }}</div>
      <div class="text-sm p-2">{{ info }}</div>
      <EButton :id="'PageLoader' + id" label="Retry" color="green" @click="_fetcher" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'EPageLoader',
  props: {
    id: { type: String, required: true, default: null },
    label: { type: String, required: false, default: '' },
    fetcher: {
      type: Function,
      required: true,
      default: () => {
        return false
      },
    },
  },
  data() {
    return {
      loaded: false,
      fetched: true,
      info: undefined,
    }
  },
  async mounted() {
    await this._fetcher()
  },
  methods: {
    metaData() {
      return {
        name: this._name,
        type: 'container',
        show: true,
      }
    },
    async _fetcher() {
      this.info = undefined
      this.fetched = true
      this.fetched = await this.fetcher()
      if (this.fetched) this.loaded = true
    },
    setInfo(info) {
      this.info = info
    },
  },
}
</script>
