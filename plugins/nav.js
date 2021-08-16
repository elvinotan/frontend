export default function ({ Context, $rest, $enum, app }, inject) {
  const nav = {
    // { name:'biodata-list', params: { name:'elvion', age:40 } }
    to: (payload) => {
      // simpan last router payload, agar bila ctrl +F5 nanti bisa otomatis
      // batal di implement krn bisa 2 tab, dan bisa beda last page, siapa punya siapa bingung
      // lihat comment di bawah
      // $rest.setLocalStorage($enum.LOCAL_STORAGE.LAST_PATH, payload)

      if (payload.name) {
        // Trigger router.push agar page berganti
        app.router.push(payload)
      }
    },
    breadcrumb: (code) => {
      // Emit EventBus to Bradcrum.vue agar path breadcrum berubah berdasarkan operan
      app.$bus.$emit($enum.EVENT_BUS.BREADCRUMBS, code)
    },
    /* Batal di terapkan, krn kalo di terapkan akan error bial user buka 2 tab
    getLastPath() {
      return $rest.getLocalStorage($enum.LOCAL_STORAGE.LAST_PATH)
    },
    loadLastPath() {
      const payload = $rest.getLocalStorage($enum.LOCAL_STORAGE.LAST_PATH)
      this.to(payload)
    }, */
  }
  inject('nav', nav)
}
