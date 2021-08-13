import Vue from 'vue'

export default function (plugin, inject) {
  inject('bus', new Vue())
}
