<script>
import table from './categories.table'

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
      table-name="categories"
      :processor="table.processor"
      :filters="table.filters"
      :columns="table.columns"
      :fragments="false"
      :hider="false"
      :quantity="[25, 50, 100, 200]"
      @row-click="onRowClick"
    />
  </main-layout>
</template>

