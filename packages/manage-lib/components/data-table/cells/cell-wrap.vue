<script>
import get from 'lodash/get'
import formatters from './formatters'
import CellDefault from './cell-default'
import CellLink from './cell-link'
import CellButton from './cell-button'
import CellActivity from './cell-activity'
import CellTag from './cell-tag'
import CellUserAvatar from './cell-user-avatar'
import CellToggle from './cell-toggle'

export default {
  name: 'CellWrap',
  components: {
    CellDefault,
    CellLink,
    CellButton,
    CellActivity,
    CellTag,
    CellUserAvatar,
    CellToggle,
  },
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
      const value = get(cell.row, attribute)
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
      let value = get(cell.row, attribute) || get(this.cellData, 'props.value')

      if (typeof value === 'function') {
        value = value(null, cell.row)
      }

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
          let formatted = formatter.apply(null, params)

          const propsFormatter = get(this.cellData, 'props.format')

          if (propsFormatter) {
            return propsFormatter(formatted, this.cell.row)
          }
          return formatted
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
      const value = this.sanitizeValue(get(row, attribute))
      const baseProps = {
        attribute,
        row,
        value,
        formattedValue,
      }
      const { props } = cellData

      if (props) {
        Object.assign(baseProps, props)
      }

      return baseProps
    },
    alignClass() {
      const { $style, column: { align } } = this
      const result = align === 'right' ? $style.alignRight : align === 'center' ? $style.alignCenter : null
      return result
    },
  },
  methods: {
    sanitizeValue(value = '') {
      if (Array.isArray(value)) {
        return value.toString()
      }
      return value || ''
    },
  },
}
</script>

<template>
  <component
    :is="cellComp"
    v-bind="cellCompProps"
    :class="[$style.cell, alignClass]"
  />
</template>

<style lang="scss" module>
  .alignRight {
    justify-content: flex-end !important;
  }
  .alignCenter {
    justify-content: center !important;
  }
  .cell {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: rem(12px 0);
    overflow: hidden;
    white-space: nowrap;
  }
</style>

<style lang="scss">
.cell-badge {
  font-size: 1rem;

  &_left {
    order: 0;
    margin-right: 0.5rem;
  }

  &_right {
    order: 1;
    margin-left: 0.5rem;
  }

  &_active {
    display: block;
    width: 5px;
    height: 5px;
  }
}

.cell-status {
  display: block;
  width: 5px;
  height: 5px;
  border-radius: 50%;

  &_active {
    background-color: #29d737;
  }

  &_inactive {
    background-color: #bbb;
  }
}
</style>
