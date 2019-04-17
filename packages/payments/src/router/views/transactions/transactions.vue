<script>
import MainLayout from '@layouts/main/main-layout'
import TableLayout from '@layouts/table/table-layout'
import ElasticProcessor from '@core/elastic-processor'
import tableConfig from './transactions-table'
import VirtualPos from './transactions-virtual-pos.vue'

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
      modal: {
        pos: false,
      },
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
      table-name="transactions"
      :processor="processor"
      :filters="filters"
      :columns="columns"
      @row-click="onRowClick"
    />
    <el-button
      slot="header"
      type="primary"
      @click="modal.pos = true"
    >
      Virtual POS
    </el-button>
    <virtual-pos
      v-if="modal.pos"
      :visible.sync="modal.pos"
    />
  </main-layout>
</template>
