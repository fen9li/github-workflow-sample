import DataProcessor from './data-processor'
import axios from 'axios'

export const API = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: { Authorization: `Bearer ${process.env.VUE_APP_API_TOKEN}` },
})

class ApiProcessor extends DataProcessor {
  constructor(params = {}) {
    const { path } = params
    super(params)

    if (
      typeof path !== 'string' ||
      path.length === 0
    ) {
      throw Error('api-processor requires "path" key')
    }

    this.path = path

    this.init()
  }

  sendRequest(query) {
    // const { page, pageSize } = query

    return API
      .get(
        this.path,
        {
          // params: {},
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

  sendRequestAll(/* query */) {
    return API
      .get(
        this.path,
        {
          // params: {},
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
