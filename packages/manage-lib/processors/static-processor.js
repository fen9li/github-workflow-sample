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

  filter(response) {
    const {
      filters
    } = this.dataQuery
    const newData = filters.reduce((acc, filter) => {
      const {
        attribute,
        value,
        comparison,
        type,
      } = filter

      if (type === 'date') {
        const filterDate = dayjs(value, 'DD/MM/YYYY')

        return acc.filter(row => {
          const rowDate = dayjs(row[attribute]).format('DD/MM/YYYY')
          const rowDateClean = dayjs(rowDate, 'DD/MM/YYYY')

          if (comparison === 'before') {
            return rowDateClean.isBefore(filterDate)
          } else if (comparison === 'after') {
            return filterDate.isBefore(rowDateClean)
          } else if (comparison === 'on') {
            return filterDate.isSame(rowDateClean)
          } else {
            return false
          }
        })
      } else if (type === 'numeric') {
        if (comparison === 'gt') {
          return acc.filter(row => value <= row[attribute])
        } else if (comparison === 'lt') {
          return acc.filter(row => value >= row[attribute])
        } else {
          return acc.filter(row => value === row[attribute])
        }
      } else if (type === 'boolean') {
        return acc.filter(row => {
          const isTrue = comparison === 'is_true'
          const isActive = row[attribute] === 'active'

          return (isTrue && isActive) || (!isTrue && !isActive)
        })
      } else {
        return acc.filter(row => {
          const testRE = new RegExp(value.toLowerCase(), 'g')
          const cellValue = row[attribute].toLowerCase()

          return testRE.test(cellValue)
        })
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
