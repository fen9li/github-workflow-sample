<script>
import table from './customers-table'

export default {
  name: 'Customers',
  page: {
    title: 'Customers',
  },
  data() {
    return {
      table: table(this),
      modal: {
        add: false,
      },
    }
  },
  methods: {
    onRowClick(row) {
      this.$router.push({
        name: 'customer-details',
        params: { id: row.id },
      })
    },
  },
}
</script>

<template>
  <main-layout title="Customers">
    <table-layout
      table-name="customers"
      :processor="table.processor"
      :filters="table.filters"
      :columns="table.columns"
      :fragments="false"
      @row-click="onRowClick"
    />
  </main-layout>
</template>
