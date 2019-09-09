<script>
import eventOccurrencesTable from './event-occurrences.table'
import getExportedFilename from '@lib/utils/get-exported-filename'

export default {
  name: "EventOccurrencesPoints",
  data() {
    return {
      table: eventOccurrencesTable(this),
    }
  },
  methods: {
    onRowClick(row) {
      this.$router.push({
        name: 'event-occurrence-details',
        params: {
          id: row.id,
        },
      })
    },
    onCreateEventClick() {},
    getExportedFilename() {
      return getExportedFilename(this.table.tableName)
    }
  },
}
</script>

<template>
  <main-layout title="Event Occurrences">
    <table-layout
      :table-name="table.tableName"
      :processor="table.processor"
      :filters="table.filters"
      :columns="table.columns"
      :fragments="false"
      :export-filename="getExportedFilename"
      hider
      @row-click="onRowClick"
    />
  </main-layout>
</template>
