<script>
import TableLayout from '@layouts/table/table-layout'
import ElasticProcessor from '@core/elastic-processor'
import subscriptionTable from './subscription-table'

export default {
  name: 'ProductsSubscription',
  page: {
    title: 'Subscription Products',
  },
  components: {
    TableLayout,
  },
  data() {
    return {
      pro: {
        processor: new ElasticProcessor({
          index: 'subscription-product-groups',
          disableQueryString: true,
          staticQuery: {
            filters: [
              {
                attribute: 'billingType',
                comparison: 'eq',
                value: 'Pro-Rata',
              },
            ],
          },
          query: {
            pageSize: 8,
          },
        }),
        columns: subscriptionTable.columns,
        filters: subscriptionTable.filters,
      },
      anniversary: {
        processor: new ElasticProcessor({
          index: 'subscription-product-groups',
          disableQueryString: true,
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
        columns: subscriptionTable.columns,
        filters: subscriptionTable.filters,
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
      :processor="pro.processor"
      :filters="pro.filters"
      :columns="pro.columns"
      @row-click="onRowClick"
    />
    <table-layout
      title="Anniversary Subscriptions"
      :processor="anniversary.processor"
      :columns="anniversary.columns"
      :filters="anniversary.filters"
      @row-click="onRowClick"
    />
  </div>
</template>
