<script>
import ElasticProcessor from '@lib/processors/elastic-processor'
import tableConfig from './subscriptions-table'

export default {
  name: 'Subscriptions',
  page: {
    title: 'Subscriptions',
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
      table-name="subscriptions"
      :processor="processor"
      :filters="filters"
      :columns="columns"
      @row-click="onRowClick"
    />
  </main-layout>
</template>
