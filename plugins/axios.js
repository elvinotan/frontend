// https://axios.nuxtjs.org/helpers

export default function ({ $axios, redirect }) {
  $axios.onRequest((config) => {
    $axios.setToken('123456789', 'Bearer')
  })
  // $axios.onResponse((response) => {})
  // $axios.onError((error) => {})
  // $axios.onRequestError((error) => {})
  // $axios.onResponseError((error) => {})
}
