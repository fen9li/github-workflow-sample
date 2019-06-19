<script>
import ElasticProcessor from '@lib/processors/elastic-processor'
import tableConfig from './products-subscription-table'

export default {
  name: 'ProductsSubscription',
  page: {
    title: 'Subscription Products',
  },
  data() {
    return {
      processor: new ElasticProcessor({
        // correct index is subscription-products, but it's empty
        index: 'subscription-product-groups',
        component: this,
      }),
      columns: tableConfig.columns,
      filters: tableConfig.filters,
    }
  },
  methods: {
    onRowClick(row) {
      this.$router.push({
        name: 'products-subscription-details',
        params: { id: row.externalId || 'test-anniversary' },
      })
    },
  },
}
</script>

<template>
  <table-layout
    table-name="SubscriptioProducts"
    :processor="processor"
    :filters="filters"
    :columns="columns"
    @row-click="onRowClick"
  />
</template>
