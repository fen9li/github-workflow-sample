import axios from 'axios'
import DataProcessor from './data-processor'

const filteredItems = (items, { key, value }) => items.filter(item => item[key] === value)

export const API = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
})

class ApiProcessor extends DataProcessor {
  constructor(params = {}) {
    const { path, dataFilter = null } = params
    super(params)

    if (
      typeof path !== 'string' ||
      path.length === 0
    ) {
      throw Error('api-processor requires "path" key')
    }

    this.path = path
    this.dataFilter = dataFilter
    this.init()
  }

  sendRequest(query) {
    const { page, pageSize } = query

    return API.get(this.path, {
      params: {
        page,
        perPage: pageSize,
      },
    })
      .then(({ data }) => {
        let { items, pagination } = data

        if (this.dataFilter) {
          items = filteredItems(items, this.dataFilter)
        }

        return {
          data: items,
          total: pagination.total_items,
        }
      })
  }

  sendRequestAll() {
    return API.get(this.path, {
      params: {
        page: 1,
        perPage: 1e9,
      },
    })
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
