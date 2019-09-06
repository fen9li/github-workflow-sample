<script>
import accountEventsTable from './account-events.table'
import getExportedFilename from '@lib/utils/get-exported-filename'

export default {
  name: 'AccountEvents',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      table: accountEventsTable(this),
      loading: true,
    }
  },
  methods: {
    onRowClick(row) {
      this.$router.push({
        name: 'events',
        // params: {
        //   id: row.id,
        // },
      })
    },
    getExportedFilename() {
      return getExportedFilename(this.table.tableName)
    }
  },
}
</script>

<template>
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
</template>
