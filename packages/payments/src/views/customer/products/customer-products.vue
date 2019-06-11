<script>
import ElasticProcessor from '@lib/processors/elastic-processor'
import tableConfig from './products-table'

export default {
  name: 'CustomerProducts',
  props: {
    customerDetails: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      processor: new ElasticProcessor({
        component: this,
        index: 'subscription-product-groups',
        disableQueryString: true,
      }),
      columns: tableConfig.columns,
      filters: tableConfig.filters,
      modal: {
        add: false,
      },
    }
  },
  methods: {
    onRowClick(row) {
      this.$router.push({
        name: 'subscription-details',
        params: { id: row.externalId },
      })
    },
  },
}
</script>

<template>
  <table-layout
    table-name="products"
    :processor="processor"
    :filters="filters"
    :columns="columns"
    @row-click="onRowClick"
  />
</template>
