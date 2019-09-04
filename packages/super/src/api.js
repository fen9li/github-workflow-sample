import { ApiHelper } from '@lib/api'

const api = new ApiHelper({
  baseURL: process.env.VUE_APP_API_URL,
})

export default api
