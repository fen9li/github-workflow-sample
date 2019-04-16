<script>
import TableLayout from '@layouts/table/table-layout'
import ElasticProcessor from '@core/elastic-processor'
import tableConfig from './transactions-table'

export default {
  name: 'SubscriptionTransactions',
  page: {
    title: 'Subscription Transactions',
  },
  components: {
    TableLayout,
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
    :processor="processor"
    :filters="filters"
    :columns="columns"
  />
</template>
