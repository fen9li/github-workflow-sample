<script>
import MainLayout from '@layouts/main/main-layout'
import TableLayout from '@layouts/table/table-layout'
import ElasticProcessor from '@core/elastic-processor'
import tableConfig from './subscriptions-table'

export default {
  name: 'Subscriptions',
  page: {
    title: 'Subscriptions',
  },
  components: {
    MainLayout,
    TableLayout,
  },
  data() {
    return {
      processor: new ElasticProcessor({
        component: this,
        index: 'subscriptions',
      }),
      filters: tableConfig.filters,
      columns: tableConfig.columns,
    }
  },
  methods: {
    onRowClick(row) {
      this.$router.push({
        name: 'subscription-details',
        params: { id: row.externalId },
      })
    },
  },
}
</script>

<template>
  <main-layout title="Subscriptions">
    <table-layout
      :processor="processor"
      :filters="filters"
      :columns="columns"
      @row-click="onRowClick"
    />
  </main-layout>
</template>
