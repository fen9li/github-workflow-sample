<script>
import StaticProcessor from '@lib/processors/static-processor'
import accountMetadataTable from './account-metadata.table'
import getExportedFilename from '@lib/utils/get-exported-filename'

export default {
  name: 'AccountMetadata',
  props: {
    account: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      table: accountMetadataTable,
      loading: true,
    }
  },
  watch: {
    'account.metadata'() {
      this.getTableData()
    },
  },
  created() {
    this.getTableData()
  },
  methods: {
    getTableData() {
      this.table.processor = new StaticProcessor({
        component: this,
        data: this.account.metadata,
        disableQueryString: true,
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
    table-name="metadata"
    :processor="table.processor"
    :filters="table.filters"
    :columns="table.columns"
    :fragments="false"
    :export-filename="getExportedFilename"
    hider
  />
</template>

