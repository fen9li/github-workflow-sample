<script>
import usersTable from './users.table'
import getExportedFilename from '@lib/utils/get-exported-filename'


export default {
  name: 'UserManagement',
  page: {
    title: 'User management',
  },
  data() {
    return {
      table: usersTable(this),
    }
  },
  methods: {
    onCreateUserClick() {
      this.$router.push({
        name: 'user-create',
      })
    },
    onRowClick(row) {
      this.$router.push({
        name: 'user',
        params: {
          id: row.id || 'unknown',
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
  <main-layout title="Users">
    <template slot="header">
      <el-button
        type="primary"
        @click="onCreateUserClick"
      >
        Create User
      </el-button>
    </template>
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
  </main-layout>
</template>
