<script>
import appConfig from '~/app.config'
import ElasticProcessor from '@lib/processors/elastic-processor'
import tableConfig from './log-history-table'


export default {
  name: 'LogHistory',
  page: {
    title: 'Log History',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  data() {
    return {
      processor: new ElasticProcessor({
        component: this,
        index: 'logHistory', // TODO: Set correct index value
      }),
      filters: tableConfig.filters,
      columns: tableConfig.columns,
    }
  },
  methods: {
    onRowClick(row) {
      // TODO: Uncomment after details page ready
      // this.$router.push({
      //   name: 'history-log-details',
      //   params: { id: row.orderId.value || 'unknown' },
      // })
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
      @row-click="onRowClick"
    />
  </main-layout>
</template>
