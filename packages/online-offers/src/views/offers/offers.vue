<script>
import offersTable from './offers.table'
import getExportedFilename from '../../utils/get-exported-filename'

export default {
  name: 'GlobalOffers',
  data() {
    return {
      table: offersTable(this),
    }
  },
  methods: {
    onRowClick(row) {
      this.$router.push({
        name: 'offer-details',
        params: { id: row.id || 'unknown' },
      })
    },
    getExportedFilename() {
      return getExportedFilename(this.table.tableName)
    }
  },
}
</script>

<template>
  <main-layout title="Global Offers">
    <table-layout
      :table-name="table.tableName"
      :processor="table.processor"
      :filters="table.filters"
      :columns="table.columns"
      :fragments="false"
      hider
      :class="$style.table"
      :quantity="[25, 50, 100, 200]"
      :export-filename="getExportedFilename"
      @row-click="onRowClick"
    />
  </main-layout>
</template>

<style lang="scss" module>
.table {
  colgroup > col:first-child {
    width: rem(120px);
  }
}
</style>
