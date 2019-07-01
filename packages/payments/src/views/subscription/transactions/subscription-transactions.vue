<script>
import ElasticProcessor from '@lib/processors/elastic-processor'
import tableConfig from './transactions-table'

export default {
  name: 'SubscriptionTransactions',
  page: {
    title: 'Subscription Transactions',
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      processor: new ElasticProcessor({
        index: 'transactions',
        component: this,
        staticQuery: {
          filters: [
            {
              attribute: 'subscriptionId',
              value: this.id,
            },
          ],
        },
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
