<script>
import accountBadgesTable from './account-badges.table'
import getExportedFilename from '@lib/utils/get-exported-filename'

export default {
  name: 'AccountBadges',
  props: {
    account: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      table: accountBadgesTable(this),
      loading: true,
    }
  },
  methods: {
    onRowClick(row) {
      this.$router.push({
        name: 'badges',
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

