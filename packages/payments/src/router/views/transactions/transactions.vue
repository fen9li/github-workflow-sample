<script>
import MainLayout from '@layouts/main/main-layout'
import TableLayout from '@layouts/table/table-layout'
import ElasticProcessor from '@core/elastic-processor'
import tableConfig from './transactions-table'
import VirtualPos from './pos-virtual-modal'

export default {
  name: 'PaymentTransactions',
  page: {
    title: 'Payment Transactions',
  },
  components: {
    MainLayout,
    TableLayout,
    VirtualPos,
  },
  data() {
    return {
      processor: new ElasticProcessor({
        component: this,
        index: 'transactions',
      }),
      filters: tableConfig.filters,
      columns: tableConfig.columns,
    }
  },
  methods: {
    onRowClick(row) {
      this.$router.push({
        name: 'payment-transaction-details',
        params: { id: row.orderId.value || 'unknown' },
      })
    },
  },
}
</script>

<template>
  <main-layout title="Transactions">
    <table-layout
      :processor="processor"
      :filters="filters"
      :columns="columns"
      @row-click="onRowClick"
    />
    <virtual-pos
      slot="header"
    />
  </main-layout>
</template>
