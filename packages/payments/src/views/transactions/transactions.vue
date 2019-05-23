<script>
import ElasticProcessor from '@lib/processors/elastic-processor'
import tableConfig from './transactions-table'
import VirtualPos from './transactions-virtual-pos.vue'

export default {
  name: 'PaymentTransactions',
  page: {
    title: 'Payment Transactions',
  },
  components: {
    VirtualPos,
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
              comparison: 'not_eq',
              value: 'settlement',
            },
          ],
        },
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
        params: { id: row.id || 'unknown' },
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
      class="wide-button"
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
