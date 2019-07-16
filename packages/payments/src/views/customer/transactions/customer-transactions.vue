<script>
import table from './transactions-table'

export default {
  name: 'CustomerTransactions',
  page: {
    title: 'Customer Transactions',
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      table: table(this),
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
  <div>
    <table-layout
      table-name="customerTransactions"
      :processor="table.processor"
      :filters="table.filters"
      :columns="table.columns"
      :fragments="false"
      @row-click="onRowClick"
    />
  </div>
</template>
