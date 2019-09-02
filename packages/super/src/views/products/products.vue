<script>
import table from './products.table'

export default {
  name: 'Products',
  page: {
    title: 'Products',
  },
  data() {
    return {
      table: table(this),
    }
  },
  methods: {
    onRowClick(row) {
      // this.$router.push({
      //   name: 'products-details',
      //   params: { id: row.id },
      // })
    },
  },
}
</script>

<template>
  <main-layout title="Products">
    <table-layout
      table-name="products"
      :processor="table.processor"
      :filters="table.filters"
      :columns="table.columns"
      @row-click="onRowClick"
    />
  </main-layout>
</template>
