<script>
import providerProductsTable from './provider-products.table'
import getExportedFilename from '@lib/utils/get-exported-filename'

export default {
  name: 'ProviderProducts',
  page: {
    title: 'Provider Products',
  },
  data() {
    return {
      table: providerProductsTable(this),
    }
  },
  methods: {
    onRowClick(row) {
      this.$router.push({
        name: 'product',
        params: {
          id: row.id,
        },
      })
    },
    getExportedFilename() {
      return getExportedFilename(this.table.tableName)
    },
  },
}
</script>

<template>
  <main-layout title="Provider Products">
    <table-layout
      :table-name="table.tableName"
      :fragments="false"
      hider
      :processor="table.processor"
      :filters="table.filters"
      :columns="table.columns"
      :export-filename="getExportedFilename"
      @row-click="onRowClick"
    />
  </main-layout>
</template>
