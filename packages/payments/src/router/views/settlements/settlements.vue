<script>
import MainLayout from '@layouts/main/main-layout'
import TableLayout from '@layouts/table/table-layout'
import ElasticProcessor from '@core/elastic-processor'
import tableConfig from './settlements-table'

export default {
  name: 'PaymentSettlements',
  page: {
    title: 'Payment Settlements',
  },
  components: {
    MainLayout,
    TableLayout,
  },
  data() {
    return {
      processor: new ElasticProcessor({
        component: this,
        index: 'settlements',
      }),
      filters: tableConfig.filters,
      columns: tableConfig.columns,
    }
  },
  methods: {
    onRowClick(row) {
      this.$router.push({
        name: 'payment-settlement-details',
        params: { id: row.orderId || 1 },
      })
    },
  },
}
</script>

<template>
  <main-layout title="Settlements">
    <table-layout
      :processor="processor"
      :filters="filters"
      :columns="columns"
      @row-click="onRowClick"
    />
  </main-layout>
</template>
