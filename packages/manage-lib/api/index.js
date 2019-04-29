import axios from 'axios'
import get from 'lodash/get'

export class ApiHelper {
  constructor(params = {}) {
    const instance = axios.create(params)

    instance.defaults.headers.common['Content-Type'] = 'application/json'
    instance.interceptors.response.use(
      this.successHandler,
      this.errorHandler,
    )

    this.axios = instance
  }

  errorHandler(error) {
    const { status } = error.response

    if (/401/.test(status)) {
      // handle error with authorization
    }

    if (error.response.data.message) {
      console.error(error.response.data.message)
    }

    return Promise.reject(error)
  }

  successHandler(response) {
    return response
  }

  async post(url, payload, options) {
    try {
      const { data } = await this.axios.post(url, payload, options)
      return [null, data]
    } catch (exception) {
      return [get(exception, 'response.data'), null]
    }
  }

  async put(url, payload, options) {
    try {
      const { data } = await this.axios.put(url, payload, options)
      return [null, data]
    } catch (exception) {
      return [get(exception, 'response.data'), null]
    }
  }

  async get(url, options) {
    try {
      const { data } = await this.axios.get(url, options)
      return [null, data]
    } catch (exception) {
      return [get(exception, 'response.data'), null]
    }
  }

  async delete(url, options) {
    try {
      const { data } = await this.axios.delete(url, options)
      return [null, data]
    } catch (exception) {
      return [get(exception, 'response.data'), null]
    }
  }
}

export default new ApiHelper()
