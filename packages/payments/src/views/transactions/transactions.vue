<script>
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
      tableConfig: tableConfig(this),
      modal: {
        pos: false,
      },
    }
  },
  methods: {
    onRowClick(row) {
      this.$router.push({
        name: 'transaction-details',
        params: { id: row.id },
      })
    },
  },
}
</script>

<template>
  <main-layout title="Transactions">
    <table-layout
      table-name="transactions"
      :processor="tableConfig.processor"
      :filters="tableConfig.filters"
      :columns="tableConfig.columns"
      @row-click="onRowClick"
    />
    <el-button
      slot="header"
      type="primary"
      class="wide-button"
      data-test="pos"
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
