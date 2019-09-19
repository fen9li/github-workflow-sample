<script>
import providersTable from './product-categoreis.table'
import getExportedFilename from '@lib/utils/get-exported-filename'

export default {
  name: 'ProductCategories',
  page: {
    title: 'Product Categories',
  },
  data() {
    return {
      table: providersTable(this),
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
  },
}
</script>

<template>
  <main-layout title="Product Category">
    <template #header>
      <el-button
        type="primary"
        class="el-button--wide"
        @click="$router.push({name: 'product-hierarchy'})"
      >
        Create Default Category Product Hierarchy
      </el-button>
    </template>

    <table-layout
      :table-name="table.tableName"
      :fragments="false"
      hider
      :processor="table.processor"
      :filters="table.filters"
      :columns="table.columns"
      :export-filename="getExportedFilename"
      @row-click="onRowClick"
    />
  </main-layout>
</template>
