<script>
import providerCategoriesTable from './provider-categories.table'
import getExportedFilename from '@lib/utils/get-exported-filename'

export default {
  name: 'ProviderCategories',
  props: {
    provider: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      table: providerCategoriesTable(this),
      loading: false,
    }
  },
  methods: {
    onRowClick(row) {
      this.$router.push({
        name: 'product-category-details',
        params: {
          id: row.id,
        },
      })
    },
    getExportedFilename() {
      return getExportedFilename(this.table.tableName)
    },
    cellStyle(row, idx) {
      return { verticalAlign: 'top', paddingTop: '12px' }
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
    :cell-style="cellStyle"
    @row-click="onRowClick"
  />
</template>
