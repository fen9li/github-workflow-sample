import DataProcessor from './data-processor'
import axios from 'axios'

export const API = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  auth: {
    username: process.env.VUE_APP_API_AUTH,
  },
})

class ApiProcessor extends DataProcessor {
  constructor(params = {}) {
    const { path, merchantFeed } = params
    super(params)

    if (
      typeof path !== 'string' ||
      path.length === 0
    ) {
      throw Error('api-processor requires "path" key')
    }

    this.path = path
    this.merchantFeed = merchantFeed

    this.init()
  }

  sendRequest(query) {
    const { page, pageSize } = query

    const params = {
      page,
      perPage: pageSize,
    }

    if (this.merchantFeed) {
      params['filters[feeds]'] = this.merchantFeed
    }

    return API
      .get(
        this.path,
        {
          params,
        }
      )
      .then(({ data }) => {
        const { items, pagination } = data

        return {
          data: items,
          total: pagination.total_items,
        }
      })
  }

  sendRequestAll() {
    return API
      .get(
        this.path,
        {
          params: {
            page: 1,
            perPage: 1e9,
          },
        }
      )
      .then(({ data }) => {
        const { items, pagination } = data

        return {
          data: items,
          total: pagination.total_items,
        }
      })
  }
}

export default ApiProcessor
