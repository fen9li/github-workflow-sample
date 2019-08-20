<script>
import table from './settlements-table'

export default {
  name: 'PaymentSettlements',
  page: {
    title: 'Payment Settlements',
  },
  data() {
    return {
      table: table(this),
    }
  },
  methods: {
    onRowClick(row) {
      this.$router.push({
        name: 'payment-settlement-details',
        params: { id: row.id },
      })
    },
  },
}
</script>

<template>
  <main-layout title="Settlements">
    <table-layout
      table-name="settlements"
      :processor="table.processor"
      :filters="table.filters"
      :columns="table.columns"
      @row-click="onRowClick"
    />
  </main-layout>
</template>
