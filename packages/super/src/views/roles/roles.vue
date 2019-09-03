<script>
import rolesTable from './roles.table'
import getExportedFilename from '@lib/utils/get-exported-filename'

export default {
  name: 'Roles',
  data() {
    return {
      table: rolesTable(this),
      modal: {
        add: false,
      },
    }
  },
  methods: {
    onRowClick(row) {
      this.$router.push({
        name: 'role',
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
  <main-layout
    title="Roles"
  >
    <table-layout
      :table-name="table.tableName"
      :fragments="false"
      hider
      :quantity="[25, 50, 100, 200]"
      :processor="table.processor"
      :filters="table.filters"
      :columns="table.columns"
      :export-filename="getExportedFilename"
      @row-click="onRowClick"
    />
  </main-layout>
</template>
