<script>
import accountMetadataTable from './account-metadata.table'
import getExportedFilename from '@lib/utils/get-exported-filename'

export default {
  name: 'AccountMetadata',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      table: accountMetadataTable(this),
      loading: true,
    }
  },
  methods: {
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
  />
</template>

