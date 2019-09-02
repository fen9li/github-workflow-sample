import { ApiHelper } from '@lib/api'

const api = new ApiHelper({
  baseURL: process.env.VUE_APP_API_URL,
  auth: {
    username: process.env.VUE_APP_API_AUTH,
  },
})

export default api
