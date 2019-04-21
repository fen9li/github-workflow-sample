<script>
import ElasticProcessor from '@lib/processors/elastic-processor'
import tableConfig from './transactions-table'

export default {
  name: 'CustomerTransactions',
  page: {
    title: 'Customer Transactions',
  },
  data() {
    return {
      processor: new ElasticProcessor({
        index: 'transactions',
        component: this,
      }),
      filters: tableConfig.filters,
      columns: tableConfig.columns,
    }
  },
}
</script>

<template>
  <table-layout
    table-name="customerTransactions"
    :processor="processor"
    :filters="filters"
    :columns="columns"
  />
</template>
