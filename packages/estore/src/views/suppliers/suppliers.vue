<script>
import suppliersTable from './suppliers.table'
import getExportedFilename from '@lib/utils/get-exported-filename'

export default {
  name: 'Suppliers',
  page: {
    title: 'Suppliers',
  },
  data() {
    return {
      table: suppliersTable(this),
    }
  },
  methods: {
    onRowClick(row) {
      this.$router.push({
        name: 'supplier-details',
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
  <main-layout title="Suppliers">
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
