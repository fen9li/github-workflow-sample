<script>
import startCase from 'lodash/startCase'
import get from 'lodash/get'
import DataProcessor from '../../processors/data-processor'
import CellWrap from './cells/cell-wrap'

const SORT_ORDERS = ['asc', 'desc', '']
const noop = () => {}

export default {
  name: 'DataTable',
  components: {
    CellWrap,
  },
  inheritAttrs: false,
  props: {
    columns: {
      type: Array,
      required: true,
    },
    processor: {
      type: DataProcessor,
      default: null,
    },
    summaryMethod: {
      type: Function,
      default: () => null,
    },
    highlightRow: {
      type: Function,
      default: () => false,
    },
  },
  data() {
    return {
      tableHeader: null,
    }
  },
  computed: {
    readyColumns() {
      const { dataQuery } = this
      const columns = this.columns || []
      const columnsCount = columns.length
      const readyColumns = []

      if (dataQuery !== null) {
        const hide = dataQuery.hide || []

        for (let i=0; i<columnsCount; i++) {
          const column = columns[i]

          if (hide.indexOf(column.name) === -1) {
            readyColumns.push({
              label: startCase(column.name),
              key: column.name,
              width: 180,
              ...column,
            })
          }
        }
      }

      return readyColumns
    },
    showRowLink() {
      const listener = this.$listeners['row-click']
      return typeof listener === 'function'
    },
    dataQuery() {
      return this.processor.dataQuery
    },
    sort() {
      return this.dataQuery.sort
    },
    showHeader() {
      return Boolean(get(this.processor, 'data.length', false))
    },
    showSummary() {
      return this.summaryMethod() !== null
    },
  },
  watch: {
    dataQuery(dataQuery) {
      this.syncSorting(dataQuery)
    },
  },
  mounted() {
    this.$nextTick(() => {
      const tableHeader = get(this.$refs, 'table.$refs.tableHeader')

      tableHeader.handleHeaderClick = this.onSortClick
      tableHeader.handleSortClick = noop

      this.tableHeader = tableHeader
    })
  },
  methods: {
    updatePage(page) {
      this.processor.updatePage(page)
    },
    syncSorting(dataQuery) {
      const { tableHeader } = this
      const { sort } = dataQuery

      tableHeader.columns.forEach(column => {
        if (sort.hasOwnProperty(column.property)) {
          column.order = sort[column.property]
        } else {
          column.order = ''
        }
      })
    },
    onSortClick(e, column) {
      if (!column.sortable) {
        return
      }

      const index = SORT_ORDERS.indexOf(column.order)
      const newOrder = SORT_ORDERS[index >= 2 ? 0 : index + 1]

      this.processor.updateSort(column.property, newOrder)
      column.order = newOrder
    },
    onRowClick(row) {
      this.$emit('row-click', row)
    },
    handleSelectionChange(value) {
      this.$emit('selection-change', value)
    },
    showOverflowTooltip(column) {
      return column.hasOwnProperty('overflowTooltip') ?
        column.overflowTooltip : true
    },
    sortType(column) {
      return column.hasOwnProperty('sortable') ? column.sortable : 'custom'
    },
    rowClassName({ row, rowIndex }) {
      const { showRowLink, $style, highlightRow } = this
      return `${showRowLink ? $style.rowActive : ''} ${highlightRow(row) ? $style.rowHighlighten : ''}`
    },
  },
}
</script>

<template>
  <div class="data-table">
    <el-table
      ref="table"
      v-loading="processor.loading"
      :data="processor.data"
      header-cell-class-name="table-header-cell"
      :row-class-name="rowClassName"
      :class="[
        !showHeader && $style.headerHidden,
        $style.table
      ]"
      :summary-method="summaryMethod"
      :show-summary="showSummary"
      @row-click="onRowClick"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        v-for="column in readyColumns"
        :key="column.key"
        :align="column.align || 'left'"
        :label="column.label"
        :column-key="column.key"
        :prop="column.key"
        :sortable="sortType(column)"
        :min-width="column.width"
        :show-overflow-tooltip="showOverflowTooltip(column)"
      >
        <template #default="scope">
          <cell-wrap
            :attribute="column.key"
            :cell="scope"
            :column="column"
          />
        </template>
      </el-table-column>
      <slot name="columns" />
      <el-table-column
        v-if="showRowLink"
        fixed="right"
        column-key="clickArrow"
        width="34"
      >
        <el-icon
          v-if="showRowLink"
          :class="$style.cellMore"
          name="arrow-right"
        />
      </el-table-column>
    </el-table>
    <div
      v-if="dataQuery && processor.pageCount > 1"
      :class="$style.tablePagination"
    >
      <el-pagination
        layout="prev, pager, next"
        :page-count="processor.pageCount"
        :current-page="dataQuery.page"
        @current-change="updatePage"
      />
    </div>
  </div>
</template>

<style lang="scss" module>

.tablePagination {
  width: 100%;
  margin: 40px auto;
  text-align: center;
}

.cellMore {
  color: var(--color-primary);
}

.table {
  :global(td) {
    padding: 0;
  }
}

.rowActive {
  cursor: pointer;
}

.headerHidden {

  &:before {
    content: none;
  }

  :global(.el-table__header-wrapper) {
    display: none;
  }
}

.rowHighlighten {
  background-color: #F2F9FF !important;
}
</style>

<style lang="scss">

.data-table {
  .el-table__footer-wrapper tbody td {
    font-size: 0.9rem;
    background-color: white;
  }

  .cell.el-tooltip {
    font-size: 0.9rem;
  }
}

.table-header-cell {

  .cell {
    overflow: visible !important;
    font-weight: normal !important;
    white-space: nowrap !important;
  }

  .caret-wrapper {
    width: 18px !important;
    height: 18px !important;
    margin-left: 5px;

    &:after {
      position: absolute;
      top: 50%;
      right: 2px;
      margin-top: -11px;
      font-family: element-icons, Arial, sans-serif !important;
      font-size: 14px;
      color: #909399;
      content: '\e790';
    }

    .sort-caret {
      display: none;
    }
  }

  &.desc {
    .caret-wrapper {
      &:after {
        color: var(--color-primary);
      }
    }
  }

  &.asc {
    .caret-wrapper {
      &:after {
        color: var(--color-primary);
        transform: rotateZ(180deg);
      }
    }
  }
}
</style>
