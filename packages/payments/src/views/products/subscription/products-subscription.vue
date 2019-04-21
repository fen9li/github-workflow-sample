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
      pro: {
        processor: new ElasticProcessor({
          index: 'subscription-product-groups',
          component: this,
          disableQueryString: true,
          staticQuery: {
            filters: [
              {
                attribute: 'billingType',
                comparison: 'eq',
                value: 'pro-rata',
              },
            ],
          },
          query: {
            pageSize: 8,
          },
        }),
        columns: tableConfig.columns,
        filters: tableConfig.filters,
      },
      anniversary: {
        processor: new ElasticProcessor({
          index: 'subscription-product-groups',
          disableQueryString: true,
          component: this,
          staticQuery: {
            filters: [
              {
                attribute: 'billingType',
                comparison: 'eq',
                value: 'Anniversary',
              },
            ],
          },
          query: {
            pageSize: 8,
          },
        }),
        columns: tableConfig.columns,
        filters: tableConfig.filters,
      },
    }
  },
  methods: {
    onRowClick(row) {
      this.$router.push({
        name: 'products-subscription-details',
        params: { id: row.externalId },
      })
    },
  },
}
</script>

<template>
  <div>
    <table-layout
      title="Pro-Rata Subscriptions"
      table-name="proRataSubs"
      :processor="pro.processor"
      :filters="pro.filters"
      :columns="pro.columns"
      @row-click="onRowClick"
    />
    <table-layout
      title="Anniversary Subscriptions"
      table-name="anniversarySubscriptions"
      :processor="anniversary.processor"
      :columns="anniversary.columns"
      :filters="anniversary.filters"
      @row-click="onRowClick"
    />
  </div>
</template>
