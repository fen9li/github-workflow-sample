<script>
import providersTable from './providers.table'
import getExportedFilename from '@lib/utils/get-exported-filename'

export default {
  name: 'Providers',
  page: {
    title: 'Providers',
  },
  data() {
    return {
      table: providersTable(this),
      modal: {
        add: false,
      },
    }
  },
  methods: {
    onRowClick(row) {
      this.$router.push({
        name: 'provider-details',
        params: {
          id: row.id,
        },
      })
    },
    onButtonClick() {
      this.$router.push({
        name: 'provider-create',
      })
    },
    getExportedFilename() {
      return getExportedFilename(this.table.tableName)
    }
  },
}
</script>

<template>
  <main-layout title="Providers">
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
    <el-button
      slot="header"
      type="primary"
      data-test="add"
      class="el-button--wide"
      @click="onButtonClick"
    >
      Create Provider
    </el-button>
  </main-layout>
</template>
