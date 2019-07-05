<script>
import statusTable from './log.table.js'

export default {
  name: 'Log',
  page: {
    title: 'Log',
  },
  data() {
    return {
      table: statusTable(this),
    }
  },
}
</script>

<template>
  <main-layout title="Log">
    <table-layout
      hider
      table-name="log"
      :processor="table.processor"
      :filters="table.filters"
      :columns="table.columns"
      :fragments="false"
      :quantity="false"
    >
      <template
        slot="expandedBlock"
        slot-scope="{ row }"
      >
        <table :class="$style.expandedRow">
          <tr>
            <td>Created date:</td>
            <td>{{ row.created_at }}</td>
            <td>we have not enough data from API</td>
          </tr>
          <tr>
            <td>Updated date:</td>
            <td>{{ row.updated_at }}</td>
            <td>we have not enough data from API</td>
          </tr>
        </table>
      </template>
    </table-layout>
  </main-layout>
</template>

<style lang="scss" module>
  .expandedRow {
    margin: 10px 0;
  }

  :global {
    .el-table__expanded-cell {
      padding: 0 10px !important;
    }
  }
</style>
