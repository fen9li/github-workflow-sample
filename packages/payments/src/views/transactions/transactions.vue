<script>
import table from './transactions-table'
import VirtualPos from './transactions-virtual-pos.vue'
import { mapActions } from 'vuex'

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
      table: table(this),
      modal: {
        pos: false,
      },
    }
  },
  methods: {
    ...mapActions('ui', ['UPDATE_TABLE']),
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
      :processor="table.processor"
      :filters="table.filters"
      :columns="table.columns"
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
      @updated="UPDATE_TABLE(table)"
    />
  </main-layout>
</template>
