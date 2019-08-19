import get from 'lodash/get'
import formatters from './formatters'

export function getCellData(attribute, cell, column) {
  const value = get(cell.row, attribute)
  const { component } = column

  if (typeof component === 'function') {
    return component(value, attribute, cell)
  } else if (component instanceof Object) {
    return component
  }

  return {}
}

export function getFormattedValue(attribute, cell, cellData, column) {
  const cellRow = cell.row
  let value = get(cellData, 'props.value') || get(cellRow, attribute)

  if (typeof value === 'function') {
    value = value(null, cellRow)
  }

  if (!column.hasOwnProperty('format')) {
    return value || ''
  }

  const { format } = column
  const isFn = typeof format === 'function'
  const isString = typeof format === 'string'
  const isObj = format instanceof Object

  if (isFn) {
    return format(value, cellRow)
  } else if (isString || isObj) {
    let formatName = format
    const params = [value]

    if (isObj) {
      formatName = format.name
      const givenParams = format.params

      if (givenParams instanceof Array) {
        params.push(...givenParams)
      }
    }

    const formatter = formatters[formatName]

    if (formatter) {
      // eslint-disable-next-line
      let formatted = formatter.apply(null, params)

      const propsFormatter = get(cellData, 'props.format')

      if (propsFormatter) {
        return propsFormatter(formatted, cellRow)
      }
      return formatted
    } else {
      throw Error(`There is no such predefined formatter: ${format}`)
    }
  }

  throw Error('"format" key must be function|string|object{name,params}.')
}
