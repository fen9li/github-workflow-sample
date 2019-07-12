<script>
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
      tableConfig: tableConfig(this),
    }
  },
}
</script>

<template>
  <table-layout
    table-name="subscriptionTransactions"
    :processor="tableConfig.processor"
    :filters="tableConfig.filters"
    :columns="tableConfig.columns"
  />
</template>
