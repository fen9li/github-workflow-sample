import Vue from 'vue'
import { ApiHelper } from '@lib/api'

const api = new ApiHelper({
  baseURL: process.env.VUE_APP_API_URL,
})

Vue.prototype.$api = api

export default api
