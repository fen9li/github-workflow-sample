<script>
import formatters from './formatters'
import CellDefault from './cell-default'
import CellLink from './cell-link'
import CellButton from './cell-button'
import CellActivity from './cell-activity'

export default {
  name: 'CellWrap',
  components: { CellDefault, CellLink, CellButton, CellActivity },
  props: {
    attribute: {
      type: String,
      default: '',
    },
    cell: {
      type: Object,
      required: true,
    },
    column: {
      type: Object,
      required: true,
    },
  },
  computed: {
    cellData() {
      const { attribute, cell, column } = this
      const value = cell.row[attribute]
      const { component } = column

      if (typeof component === 'function') {
        return component(value, attribute, cell)
      } else if (component instanceof Object) {
        return component
      }

      return {}
    },
    formattedValue() {
      const { attribute, cell, column } = this
      const value = cell.row[attribute]

      if (!column.hasOwnProperty('format')) {
        return value || ''
      }

      const { format } = column
      const isFn = typeof format === 'function'
      const isString = typeof format === 'string'
      const isObj = format instanceof Object

      if (isFn ) {
        return format(value)
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
          return formatter.apply(null, params)
        } else {
          throw Error(`There is no such predefined formatter: ${format}`)
        }
      }

      throw Error('"format" key must be function|string|object{name,params}.')
    },
    cellComp() {
      const { is } = this.cellData

      // @todo it would be nice to add some validation here
      if (is) {
        return is
      } else {
        return 'cell-default'
      }
    },
    cellCompProps() {
      const { cell: { row }, attribute, formattedValue, cellData } = this
      const baseProps = {
        attribute,
        row,
        value: row[attribute] || '',
        formattedValue,
      }
      const { props } = cellData

      if (props) {
        Object.assign(baseProps, props)
      }

      return baseProps
    },
  },
}
</script>

<template>
  <component
    :is="cellComp"
    v-bind="cellCompProps"
    :class="$style.cell"
  />
</template>

<style lang="scss" module>
.cell {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  white-space: nowrap;
}
</style>

<style lang="scss">
.cell-badge {
  font-size: 16px;

  &_left {
    order: 0;
    margin-right: 8px;
  }

  &_right {
    order: 1;
    margin-left: 8px;
  }
}
</style>
