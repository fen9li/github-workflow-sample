<script>
import providersTable from './providers.table'
import getExportedFilename from '@lib/utils/get-exported-filename'

export default {
  name: 'Providers',
  page: {
    title: 'Providers',
  },
  data() {
    return {
      table: providersTable(this),
    }
  },
  methods: {
    onRowClick(row) {
      this.$router.push({
        name: 'provider-details',
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
  <main-layout title="Providers">
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
