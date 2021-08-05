// https://axios.nuxtjs.org/helpers

export default function ({ $axios, redirect, app, ...other }) {
  $axios.onRequest((config) => {
    const token = app.$rest.getLocalStorage(app.$enum.LOCAL_STORAGE.APP_TOKEN)
    if (token) {
      $axios.setToken(token, 'Bearer')
    }
  })
  // $axios.onResponse((response) => {})
  // $axios.onError((error) => {})
  // $axios.onRequestError((error) => {})
  // $axios.onResponseError((error) => {})
}
