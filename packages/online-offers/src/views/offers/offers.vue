<script>
import table from './offers.table'

export default {
  name: 'PaymentTransactions',
  page: {
    title: 'Payment Transactions',
  },
  data() {
    return {
      table: table(this),
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
  <main-layout title="Online Offers">
    <table-layout
      table-name="transactions"
      :processor="table.processor"
      :filters="table.filters"
      :columns="table.columns"
      @row-click="onRowClick"
    />
  </main-layout>
</template>
