import get from 'lodash/get'
import cloneDeep from 'lodash/cloneDeep'
import merge from 'deepmerge'

const createEmptyQuery = () => {
  return {
    filters: [],
    sort: {},
    page: 1,
    pageSize: 20,
    hide: [],
  }
}

/*
 * All items in arrays should have "attribute" element
 */
function mergeQueries(a, b) {
  return merge(a, b, {
    /*
     * First array have higher priority
     * >>> Need to do this better
     */
    arrayMerge: (highArray, lowArray, options) => {
      const result = cloneDeep(highArray)

      cloneDeep(lowArray).forEach(lowItem => {
        /*
         * Works only for filters now
         */
        const alreadyAdded = highArray.find(highItem => {
          return highItem.attribute === lowItem.attribute
        })

        if (!alreadyAdded) {
          result.push(lowItem)
        }
      })

      return result
    },
  })
}

export default class DataProcessor {
  constructor(params = {}) {
    this.data = []
    this.total = 0
    this.loading = true
    this.staticQuery = params.staticQuery || {}
    this.defaultQuery = params.query
    this.dataQuery = null
    this.disableQueryString = Boolean(params.disableQueryString)
    this.component = params.component
    this.skipNextURLWatcher = false
  }

  init() {
    if (!this.disableQueryString) {
      this.setupURLWatcher()
    }

    this.applyFiltersFromURL()

    return this.getData({ shouldUpdateURL: false })
  }

  setupURLWatcher() {
    const { component } = this

    if (!component) {
      throw new Error(
        '"component" key must be provided in data-processor options. ' +
        'Or you can set "disableQueryString" to true.'
      )
    }

    component.$watch(
      '$route.query.q',
      () => {
        if (!this.skipNextURLWatcher) {
          this.applyFiltersFromURL()
          this.getData({ shouldUpdateURL: false })
        }

        this.skipNextURLWatcher = false
      }
    )
  }

  get filters() {
    return get(this.dataQuery, 'filters', [])
  }

  get pageCount() {
    return Math.ceil(this.total / this.dataQuery.pageSize)
  }

  readQueryString() {
    const queryString = this.component.$router.currentRoute.query.q

    try {
      const decodedString = atob(queryString)
      return JSON.parse(decodedString)
    } catch (err) {
      return null
    }
  }

  applyFiltersFromURL() {
    const initQuery = this.readQueryString() || this.defaultQuery || {}

    this.dataQuery = mergeQueries(createEmptyQuery(), initQuery)
  }

  updateURL() {
    if (this.disableQueryString) return

    const queryString = JSON.stringify(this.dataQuery)

    this.skipNextURLWatcher = true

    this.component.$router.push(
      { query: { q: btoa(queryString) } }
    )
  }

  async getData({ shouldUpdateURL }) {
    const { dataQuery, disableQueryString } = this
    const query = mergeQueries(this.staticQuery, dataQuery)

    this.loading = true

    if (!disableQueryString && shouldUpdateURL) {
      this.updateURL()
    }

    try {
      const { data, total } = await this.sendRequest(query)

      this.data = data
      this.total = total
    } catch (error) {
      console.error('Error while requesting data', error)
    }

    this.loading = false
  }

  async getAllData() {
    const query = mergeQueries(this.staticQuery, this.dataQuery)

    try {
      return await this.sendRequestAll(query)
    } catch (error) {
      console.error('Error while requesting elastic data', error)
    }
  }

  async sendRequest() {
    console.error('DataProcessor:sendRequest - method should be implemented')

    return {
      data: [],
      total: 0,
    }
  }

  async sendRequestAll() {
    console.error('DataProcessor:sendRequestAll - method should be implemented')

    return {
      data: [],
      total: 0,
    }
  }

  applyFilter(filter, index) {
    this.filters.splice(index, 1, filter)

    return this.getData({ shouldUpdateURL: true })
  }

  removeFilter(index) {
    this.filters.splice(index, 1)

    return this.getData({ shouldUpdateURL: true })
  }

  updatePage(page) {
    const { dataQuery } = this

    dataQuery.page = page

    return this.getData({ shouldUpdateURL: true })
  }

  updateSort(attribute, order) {
    const { dataQuery } = this

    if (order) {
      dataQuery.sort[attribute] = order
    } else {
      delete dataQuery.sort[attribute]
    }

    return this.getData({ shouldUpdateURL: true })
  }

  updateHide(newHideList) {
    const { dataQuery, disableQueryString } = this

    dataQuery.hide = newHideList

    if (!disableQueryString) {
      this.updateURL()
    }
  }
}
