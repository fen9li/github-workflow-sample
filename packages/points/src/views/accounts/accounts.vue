<script>
import accountsTable from './accounts.table'
import createAccount from '../account/modals/create-account'
import getExportedFilename from '@lib/utils/get-exported-filename'

export default {
  name: "AccountsPoints",
  components: {
    createAccount,
  },
  data() {
    return {
      table: accountsTable(this),
    }
  },
  methods: {
    onRowClick(row) {
      this.$router.push({
        name: 'account',
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
  <main-layout title="Accounts">
    <createAccount
      slot="header"
      :account-processor="table.processor"
    />
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
