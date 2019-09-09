<script>
import get from 'lodash/get'
import ApiProcessor from '@lib/processors/api-processor'
import accountEventsTable from './account-events.table'
import getExportedFilename from '@lib/utils/get-exported-filename'

export default {
  name: 'AccountEvents',
  props: {
    account: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      table: accountEventsTable,
      loading: true,
    }
  },
  computed: {
    accountId() {
      return get(this.accoint, 'id', '')
    },
    path() {
      return `/event-occurrences?filters[accounts]=${this.accountId}`
    },
  },
  created() {
    this.getAccountEvents()
  },
  methods: {
    getAccountEvents() {
      this.table.processor = new ApiProcessor({
        component: this,
        path: this.path,
      })
    },
    onRowClick(row) {
      this.$router.push({
        name: 'events',
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
