<script>
import get from 'lodash/get'
import DataProcessor from '../../../processors/data-processor.js'
import CellDefault from './cell-default'
import CellLink from './cell-link'
import CellButton from './cell-button'
import CellActivity from './cell-activity'
import CellTag from './cell-tag'
import CellImage from './cell-image'
import CellUserAvatar from './cell-user-avatar'
import CellToggle from './cell-toggle'
import CellLogo from './cell-logo'
import CellStatus from './cell-status'
import { getFormattedValue, getCellData } from './utils.js'

export default {
  name: 'CellWrap',
  components: {
    CellDefault,
    CellLink,
    CellButton,
    CellActivity,
    CellTag,
    CellImage,
    CellUserAvatar,
    CellToggle,
    CellLogo,
    CellStatus,
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
    processor: {
      type: DataProcessor,
      required: true,
    },
  },
  computed: {
    cellData() {
      const { attribute, cell, column } = this

      return getCellData(attribute, cell, column)
    },
    formattedValue() {
      const { attribute, cell, cellData, column } = this

      return getFormattedValue(attribute, cell, cellData, column)
    },
    cellComp() {
      const { is } = this.cellData

      if (is) {
        return is
      } else {
        return 'cell-default'
      }
    },
    cellCompProps() {
      const {
        cell: { row },
        attribute,
        formattedValue,
        cellData,
        processor,
      } = this
      const value = this.sanitizeValue(get(row, attribute))
      const baseProps = {
        attribute,
        row,
        value,
        formattedValue,
        processor,
      }
      const { props } = cellData

      if (props) {
        Object.assign(baseProps, props)
      }

      return baseProps
    },
    alignClass() {
      const {
        $style,
        column: { align },
      } = this
      let result = null

      if (align === 'right') {
        result = $style.alignRight
      } else if (align === 'center') {
        result = $style.alignCenter
      }

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

  > span {
    overflow: hidden;
    text-overflow: ellipsis;
  }
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

.cell-image {
  width: 100px;
  height: 30px;
  padding: 0;
  background-repeat: no-repeat;
  background-position: 0;
  background-size: contain;
}

.cell-logo {
  width: 20px;
  height: 20px;
  padding: 0;
  background-repeat: no-repeat;
  background-position: 0;
  background-size: contain;
}
</style>
