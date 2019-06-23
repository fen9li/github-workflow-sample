import DataProcessor from './data-processor'
import axios from 'axios'

const filteredItems = (items, { key, value }) => items.filter(item => item[key] === value)

const transformedItems = (items, rules) => {
  rules.forEach(({ path, key, values }) => {
    items.map((item, index) => {
      const found = Object.keys(item[path]).filter(name => values.includes(name.toLowerCase()))
      if (found) {
        item[key] = item[path][found[0]]
      }
    })
  })
  return items
}

export const API = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  auth: {
    username: process.env.VUE_APP_API_AUTH,
  },
})

class ApiProcessor extends DataProcessor {
  constructor(params = {}) {
    const { path, dataFilter = null, dataTransform = null } = params
    super(params)

    if (
      typeof path !== 'string' ||
      path.length === 0
    ) {
      throw Error('api-processor requires "path" key')
    }

    this.path = path
    this.dataFilter = dataFilter
    this.dataTransform = dataTransform
    this.init()
  }

  sendRequest(query) {
    const { page, pageSize } = query

    return API
      .get(this.path,
        {
          params: {
            page,
            perPage: pageSize,
          },
        }
      )
      .then(({ data }) => {
        let { items, pagination } = data

        if (this.dataFilter) {
          items = filteredItems(items, this.dataFilter)
        }

        if (this.dataTransform) {
          items = transformedItems(items, this.dataTransform)
        }

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
