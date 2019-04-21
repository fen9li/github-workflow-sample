<script>
import ElasticProcessor from '@lib/processors/elastic-processor'
import tableConfig from './transactions-table'

export default {
  name: 'SubscriptionTransactions',
  page: {
    title: 'Subscription Transactions',
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
    table-name="subscriptionTransactions"
    :processor="processor"
    :filters="filters"
    :columns="columns"
  />
</template>
