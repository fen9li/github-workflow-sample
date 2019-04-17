<script>
import TableLayout from '@layouts/table/table-layout'
import ElasticProcessor from '@core/elastic-processor'
import tableConfig from './products-single-table'

export default {
  name: 'ProductsSingle',
  page: {
    title: 'Single Products',
  },
  components: {
    TableLayout,
  },
  data() {
    return {
      processor: new ElasticProcessor({
        component: this,
        index: 'subscription-product-pricing-plans',
      }),
      columns: tableConfig.columns,
      filters: tableConfig.filters,
    }
  },
  methods: {
    onRowClick(row) {
      this.$router.push({
        name: 'products-single-details',
        params: { id: row.externalId },
      })
    },
  },
}
</script>

<template>
  <div>
    <table-layout
      table-name="singleProducts"
      :processor="processor"
      :filters="filters"
      :columns="columns"
      @row-click="onRowClick"
    />
  </div>
</template>
