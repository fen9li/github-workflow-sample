// fixme this processor should NOT be used in production! Must be substituted by server api.
import DataProcessor from '../data-processor'
import axios from 'axios'

const { VUE_APP_AUTH0_MANAGEMENT_API_TOKEN } = process.env

export const API = axios.create({
  headers: { Authorization: `Bearer ${VUE_APP_AUTH0_MANAGEMENT_API_TOKEN}` },
})

class Auth0ApiProcessor extends DataProcessor {
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
    return API
      .get(
        this.path,
      )
      .then(({ data }) => {
        data = data.scopes ?
          data.scopes.map(item => ({
            permission_name: item.value,
            description: item.description,
          }))
          : data
        return {
          data,
          total: data.length,
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

export default Auth0ApiProcessor
