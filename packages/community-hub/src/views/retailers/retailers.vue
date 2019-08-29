<script>
import table from './retailers.table'

export default {
  name: 'Retailers',
  page: {
    title: 'Retailers',
  },
  data() {
    return {
      table: table(this)
    }
  },
  methods: {
    onRowClick(row) {
      this.$router.push({
        name: 'retailer-details',
        params: { id: row.id, },
      })
    },
  },
}
</script>

<template>
  <main-layout title="Retailers">
    <table-layout
      table-name="retailers"
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
