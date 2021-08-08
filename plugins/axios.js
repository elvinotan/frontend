// https://axios.nuxtjs.org/helpers

import https from 'https'

export default function ({ $axios, redirect, app, ...other }) {
  // $axios.defaults.httpsAgent = new https.Agent({ rejectUnauthorized: false })
  const agent = new https.Agent({ rejectUnauthorized: false })

  $axios.onRequest((config) => {
    config.httpsAgent = agent
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
