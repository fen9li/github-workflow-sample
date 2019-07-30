<script>
import StaticProcessor from '@lib/processors/static-processor'
import table from './log-history-table'

const logHistoryMock = require('@tests/__fixtures__/log-history-mock')

export default {
  name: 'LogHistory',
  page: {
    title: 'Log History',
  },
  data() {
    return {
      processor: new StaticProcessor({
        component: this,
        data: logHistoryMock.table,
      }),
      filters: table.filters,
      columns: table.columns,
    }
  },
  methods: {
    onRowClick(row) {
      this.$router.push({
        name: 'log-details',
        params: {
          id: row.id || 'unknown',
        },
      })
    },
  },
}
</script>

<template>
  <main-layout title="Log History">
    <table-layout
      table-name="logHistory"
      :processor="processor"
      :filters="filters"
      :columns="columns"
      :fragments="false"
      @row-click="onRowClick"
    />
  </main-layout>
</template>
