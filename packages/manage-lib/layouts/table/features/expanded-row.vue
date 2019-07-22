<script>
export default {
  name: 'ExpandedRow',
  props: {
    columns: {
      type: Array,
      default: null,
    },
  },
  methods: {
    isColumnService(column) {
      return (column || {}).name === 'expandable'
    },
  },
}
</script>

<template>
  <tr :class="$style.main">
    <td
      v-for="(column, index) in columns"
      :key="index"
      :class="isColumnService(column) ? $style.serviceTD : $style.defaultTD"
    >
      <slot :name="`expanded-row-cell-${index + 1}`" />
    </td>
  </tr>
</template>

<style lang="scss" module>
  .main {
    display: flex;
    width: 100%;

    td {
      background-color: #f9fafc !important;
      :hover {
        background-color: #f9fafc !important;
      }
    }

    .serviceTD {
      width: 48px;
      border: 0;
    }

    .defaultTD {
      flex: 1;
      padding: 12px 10px;
      border: 0;
    }
  }

  :global {
    .el-table__expanded-cell {
      padding: 0 !important;
    }
  }
</style>
