<script>
import tableConfig from './settlements-table'

export default {
  name: 'PaymentSettlements',
  page: {
    title: 'Payment Settlements',
  },
  data() {
    return {
      tableConfig: tableConfig(this),
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
      :processor="tableConfig.processor"
      :filters="tableConfig.filters"
      :columns="tableConfig.columns"
      :fragments="false"
      @row-click="onRowClick"
    />
  </main-layout>
</template>
