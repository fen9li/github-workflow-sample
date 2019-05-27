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
                value: 'prorata',
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
                value: 'anniversary',
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
    <div :class="$style.tableTitle">
      <span :class="$style.title">
        Pro-Rata Subscriptions
      </span>
      <i :class="[$style.icon, 'el-icon-info']" />
    </div>
    <table-layout
      table-name="proRataSubs"
      :processor="pro.processor"
      :filters="pro.filters"
      :columns="pro.columns"
      @row-click="onRowClick"
    />
    <div :class="$style.tableTitle">
      <span :class="$style.title">
        Anniversary Subscriptions
      </span>
      <i :class="[$style.icon, 'el-icon-info']" />
    </div>
    <table-layout
      table-name="anniversarySubscriptions"
      :processor="anniversary.processor"
      :columns="anniversary.columns"
      :filters="anniversary.filters"
      @row-click="onRowClick"
    />
  </div>
</template>

<style lang="scss" module>
.tableTitle {
  padding: 0 0 2rem 3rem;
}

.title {
  font-size: 1.4rem;
  font-weight: 600;
}

.icon {
  padding-left: 2rem;
  font-size: 1.6rem;
  color: var(--color-primary);
}
</style>
