<script>
import supplierProductsTable from './supplier-products.table'
import getExportedFilename from '@lib/utils/get-exported-filename'

export default {
  name: 'SupplierProducts',
  page: {
    title: 'Supplier Products',
  },
  data() {
    return {
      table: supplierProductsTable(this),
    }
  },
  methods: {
    onRowClick(row) {
      this.$router.push({
        name: 'supplier-product',
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
  <main-layout title="Supplier Products">
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
