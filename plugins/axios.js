// https://axios.nuxtjs.org/helpers

import https from 'https'

export default function ({ $axios, redirect, app, ...other }) {
  // $axios.defaults.httpsAgent = new https.Agent({ rejectUnauthorized: false })
  const agent = new https.Agent({ rejectUnauthorized: false })

  $axios.onRequest((config) => {
    config.metadata = { startTime: new Date() }
    config.httpsAgent = agent
    const token = app.$rest.getLocalStorage(app.$enum.LOCAL_STORAGE.APP_TOKEN)
    $axios.setToken(token, 'Bearer')
  })
  $axios.onResponse((response) => {
    const duration = new Date().getTime() - response.config.metadata.startTime.getTime()
    const uri = response.config.url.substring(30)
    if (duration <= 50) {
      console.log(`%c EXCELLENT ${uri} ${duration} ms`, 'color: #009e60')
    } else if (duration <= 100) {
      console.log(`%c NICE ${uri} ${duration} ms`, 'color: #cc9d6e')
    } else if (duration <= 150) {
      console.log(`%c OK ${uri} ${duration} ms`, 'color: #abcc71')
    } else if (duration <= 200) {
      console.log(`%c WARNING ${uri} ${duration} ms`, 'background: #6a4b0f; color: #e0d2b9')
    } else {
      console.log(`%c FATAL ${uri} ${duration} ms`, 'background: #772232; color: #fac7d0')
    }
  })
  // $axios.onError((error) => {})
  // $axios.onRequestError((error) => {})
  // $axios.onResponseError((error) => {})
}
