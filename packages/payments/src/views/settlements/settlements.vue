<script>
import ElasticProcessor from '@lib/processors/elastic-processor'
import tableConfig from './settlements-table'

export default {
  name: 'PaymentSettlements',
  page: {
    title: 'Payment Settlements',
  },
  data() {
    return {
      processor: new ElasticProcessor({
        component: this,
        index: 'transactions',
        staticQuery: {
          filters: [
            {
              attribute: 'type',
              comparison: 'eq',
              value: 'settlement',
            },
          ],
        },
      }),
      filters: tableConfig.filters,
      columns: tableConfig.columns,
    }
  },
  methods: {
    onRowClick(row) {
      this.$router.push({
        name: 'payment-settlement-details',
        params: { id: row.externalId || 1 },
      })
    },
  },
}
</script>

<template>
  <main-layout title="Settlements">
    <table-layout
      table-name="settlements"
      :processor="processor"
      :filters="filters"
      :columns="columns"
      :fragments="false"
      @row-click="onRowClick"
    />
  </main-layout>
</template>
