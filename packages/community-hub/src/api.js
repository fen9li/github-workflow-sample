import Vue from 'vue'
import { ApiHelper } from '@lib/api'

const api = new ApiHelper({
  baseURL: process.env.VUE_APP_API_URL,
  auth: {
    username: process.env.VUE_APP_API_AUTH,
  },
})

Vue.prototype.$api = api

export default api
