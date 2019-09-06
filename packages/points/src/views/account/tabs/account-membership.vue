<script>
import accountMembershipTable from './account-membership.table'
import getExportedFilename from '@lib/utils/get-exported-filename'

export default {
  name: 'AccountMembership',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      table: accountMembershipTable(this),
      loading: true,
    }
  },
  methods: {
    onRowClick(row) {
      this.$router.push({
        name: 'memberships',
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

