export default function ({ Context, $rest, $enum, app }, inject) {
  const nav = {
    // { breadcrumb:'GN001', path:'/doc', name:'elvion', age:40 }
    to: (payload) => {
      if (payload.breadcrumb) {
        // Emit EventBus to Bradcrum.vue agar path breadcrum berubah berdasarkan operan
        app.$bus.$emit($enum.EVENT_BUS.BREADCRUMBS, payload.breadcrumb)
      }
      if (payload.path) {
        // Trigger router.push agar page berganti
        app.router.push(payload.path)
      }
      // simpan last router payload, agar bila ctrl +F5 nanti bisa otomatis
      $rest.setLocalStorage($enum.LOCAL_STORAGE.LAST_PATH, payload)
    },
    loadLastPath() {
      const payload = $rest.getLocalStorage($enum.LOCAL_STORAGE.LAST_PATH)
      this.to(payload)
    },
  }
  inject('nav', nav)
}
