<script>
import table from './categories.table'
import getExportedFilename from '@lib/utils/get-exported-filename'

export default {
  name: 'Categories',
  page: {
    title: 'Categories',
  },
  data() {
    return {
      table: table(this)
    }
  },
  methods: {
    handleClick() {
      this.$router.push({
        name: 'category-new'
      })
    },
    onRowClick(row) {
      this.$router.push({
        name: 'category-details',
        params: {
          id: row.id || 'unknown',
          edit: 'edit'
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
  <main-layout title="Categories">
    <template slot="header">
      <el-button
        type="primary"
        icon="el-icon-plus"
        @click="handleClick"
      >
        Add New Category
      </el-button>
    </template>
    <table-layout
      :table-name="table.tableName"
      :processor="table.processor"
      :filters="table.filters"
      :columns="table.columns"
      :fragments="false"
      :quantity="[25, 50, 100, 200]"
      :export-filename="getExportedFilename"
      @row-click="onRowClick"
    />
  </main-layout>
</template>

