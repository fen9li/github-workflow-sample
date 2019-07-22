<script>
import merchantsTable from './merchants.table'

export default {
  name: 'GlobalMerchants',
  page: {
    title: '',
  },
  data() {
    return {
      table: merchantsTable(this),
    }
  },
  methods: {
    onRowClick(row, column, event) {
      this.$router.push({
        name: 'merchant-details',
        params: { id: row.id || 'unknown' },
      })
    },
  },
}
</script>

<template>
  <main-layout title="Global Merchants">
    <table-layout
      table-name="merchants"
      :processor="table.processor"
      :filters="table.filters"
      :columns="table.columns"
      :fragments="false"
      :hider="false"
      :quantity="[25, 50, 100, 200]"
      @row-click="onRowClick"
    />
  </main-layout>
</template>

<style lang="scss" module>
.viewOffers {
  font-weight: 700;
}
</style>
