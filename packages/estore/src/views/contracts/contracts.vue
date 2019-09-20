<script>
import contractsTable from './contracts.table.js'
import getExportedFilename from '@lib/utils/get-exported-filename'

export default {
  name: 'Contracts',
  page: {
    title: 'Contracts',
  },
  data() {
    return {
      table: contractsTable(this),
    }
  },
  methods: {
    onRowClick(row) {
      this.$router.push({
        name: 'contract-details',
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
  <main-layout title="Contracts">
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
