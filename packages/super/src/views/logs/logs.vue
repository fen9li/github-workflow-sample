<script>
import logsTable from './logs.table'
import getExportedFilename from '@lib/utils/get-exported-filename'


export default {
  name: "Logs",
  data() {
    return {
      table: logsTable(this),
    }
  },
  methods: {
    onRowClick(row) {
      this.$router.push({
        name: 'log-details',
        params: {
          id: row.id,
        },
      })
    },
    getExportedFilename() {
      return getExportedFilename(this.table.tableName)
    }
  },
}
</script>

<template>
  <main-layout title="Logs">
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
