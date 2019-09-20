<script>
import supplierCatalogueTable from './supplier-catalogue.table'
import getExportedFilename from '@lib/utils/get-exported-filename'

export default {
  name: 'SupplierCatalogueTab',
  props: {
    supplier: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      table: supplierCatalogueTable(this),
      loading: false,
    }
  },
  methods: {
    onRowClick(row) {
      this.$router.push({
        name: 'contract-details',
        params: {
          id: row.contractId,
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

