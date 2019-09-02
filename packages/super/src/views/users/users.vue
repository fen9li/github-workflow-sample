<script>
import usersTable from './users.table'

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

    },
    onRowClick(row) {
      this.$router.push({
        name: 'user',
        params: {
          id: row.id || 'unknown',
        },
      })
    },
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
      hider
      @row-click="onRowClick"
    />
  </main-layout>
</template>
