import DataProcessor from './data-processor'
import orderBy from 'lodash/orderBy'
import dayjs from 'dayjs'

class StaticProcessor extends DataProcessor {
  constructor(params) {
    const {
      data = []
    } = params

    super(params)

    this.fullData = [].concat(data)
    this.data = data
    this.total = data.length

    this.init()
  }

  sendRequest() {
    return new Promise(resolve => {
      setTimeout(
        resolve,
        Math.floor(Math.random() * 950) + 300, {
          data: this.fullData,
          total: this.total
        }
      )
    })
      .then(res => this.filter(res))
      .then(data => this.sort(data))
      .then(data => this.paginate(data))
  }

  sendRequestAll() {
    return new Promise(resolve => {
      setTimeout(
        resolve,
        Math.floor(Math.random() * 2500) + 1500, {
          data: this.fullData,
          total: this.total
        }
      )
    })
      .then(res => this.filter(res))
      .then(data => this.sort(data))
  }

  filterBoolean(acc, filter) {
    const {
      attribute,
      comparison,
      booleanValues,
    } = filter

    return acc.filter(row => {
      return row[attribute] === booleanValues[comparison].value
    })
  }

  filterDate(acc, filter) {
    const {
      value,
      attribute,
      comparison,
    } = filter
    const filterDate = dayjs(value, 'DD/MM/YYYY')

    return acc.filter(row => {
      const rowDate = dayjs(row[attribute]).format('DD/MM/YYYY')
      const rowDateClean = dayjs(rowDate, 'DD/MM/YYYY')

      switch (comparison) {
        case 'before':
          return rowDateClean.isBefore(filterDate)
        case 'after':
          return filterDate.isBefore(rowDateClean)
        case 'on':
          return filterDate.isSame(rowDateClean)
        default:
          console.warn(`unknown date filter comparison: ${ comparison }`)
          return false
      }
    })
  }

  filterNumeric(acc, filter) {
    const {
      comparison,
      attribute,
      value,
    } = filter

    switch (comparison) {
      case 'gt':
        return acc.filter(row => value <= row[attribute])
      case 'lt':
        return acc.filter(row => value >= row[attribute])
      case 'eq':
        return acc.filter(row => value === row[attribute])
      default:
        console.warn(`unknown numeric filter comparison: ${ comparison }`)
        return false
    }
  }

  filterSelect(acc, filter) {
    const {
      attribute,
      value,
    } = filter

    return acc.filter(row => {
      const rowValue = row[attribute]

      if (Array.isArray(rowValue)) {
        for (const item of rowValue) {
          if (value.includes(item)) {
            return true
          }
        }
        return false
      } else {
        return value.includes(rowValue)
      }
    })
  }

  filterString(acc, filter) {
    const {
      attribute,
      value,
    } = filter

    return acc.filter(row => {
      const rowValue = row[attribute]
      let testRE
      let cellValue

      if (Array.isArray(rowValue)) {
        for (const item of rowValue) {
          testRE = new RegExp(value.toLowerCase(), 'g')
          cellValue = item.toLowerCase()
          if (testRE.test(cellValue)) {
            return true
          }
        }
        return false
      } else {
        testRE = new RegExp(value.toLowerCase(), 'g')
        cellValue = row[attribute].toLowerCase()

        return testRE.test(cellValue)
      }
    })
  }

  filter(response) {
    const {
      filters
    } = this.dataQuery
    const newData = filters.reduce((acc, filter) => {
      const {
        type,
      } = filter

      switch (type) {
        case 'date':
          return this.filterDate(acc, filter)
        case 'numeric':
          return this.filterNumeric(acc, filter)
        case 'boolean':
          return this.filterBoolean(acc, filter)
        case 'select':
          return this.filterSelect(acc, filter)
        case 'string':
          return this.filterString(acc, filter)
        default:
          console.warn(`unknown filter type: ${ type }`)
          return []
      }
    }, response.data)

    return {
      data: newData,
      total: newData.length,
    }
  }

  sort(response) {
    const {
      sort
    } = this.dataQuery
    const sortKeys = Object.keys(sort)
    const sortValues = sortKeys.reduce((acc, key) => {
      acc.push(sort[key])

      return acc
    }, [])

    return {
      data: orderBy(response.data, sortKeys, sortValues),
      total: response.total,
    }
  }

  paginate(response) {
    const {
      page,
      pageSize
    } = this.dataQuery
    const from = (page - 1) * pageSize
    const to = page * pageSize

    return {
      data: response.data.slice(from, to),
      total: response.total,
    }
  }
}

export default StaticProcessor
