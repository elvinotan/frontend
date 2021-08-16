export default {
  ssr: false,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'frontend',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }, { hid: 'description', name: 'description', content: '' }],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/css/main.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/component', '~/plugins/axios', '~/plugins/crypto', '~/plugins/wrapper', '~/plugins/fmt', '~/plugins/string', '~/plugins/number', '~/plugins/object', '~/plugins/array', '~/plugins/enum', '~/plugins/rest', '~/plugins/nav', '~/plugins/bus'],

  serverMiddleware: {
    '/api': '~/api',
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://tailwindcss.nuxtjs.org/
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Used as fallback if no runtime config is provided
  // https://axios.nuxtjs.org
  axios: {
    progress: false,
    debug: true,
  },

  // ini yang akan di ambil pada saat production, akan ambil dari enviroment variable
  // BILA tidak ada dan tidak tersedia, maka akan ambil dari configurasi diatas yaitu axios {}
  publicRuntimeConfig: {
    API_HOST: process.env.API_HOST || 'localhost',
    API_PORT: process.env.API_PORT || '8443',
    API_PREFIX: process.env.API_PREFIX || '/backend',
    test_api_key: process.env.test_api_key || 'abxkd-dfkhe-fdmkwh-djdf',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  // https://tailwindcss.nuxtjs.org/options/
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.js',
    exposeConfig: false,
    config: {},
  },
}
