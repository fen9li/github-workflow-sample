<script>
import merchantsTable from './merchants.table'
import getExportedFilename from '../../utils/get-exported-filename'

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
    getExportedFilename() {
      return getExportedFilename(this.table.tableName)
    }
  },
}
</script>

<template>
  <main-layout title="Global Merchants">
    <table-layout
      :table-name="table.tableName"
      :processor="table.processor"
      :filters="table.filters"
      :columns="table.columns"
      :fragments="false"
      hider
      :quantity="[25, 50, 100, 200]"
      :export-filename="getExportedFilename"
      @row-click="onRowClick"
    />
  </main-layout>
</template>

<style lang="scss" module>
.viewOffers {
  font-weight: 700;
}
</style>
