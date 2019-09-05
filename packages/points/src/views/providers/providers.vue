<script>
import table from './providers.table.js'

export default {
  name: 'Providers',
  data() {
    return {
      table: table(this),
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
  },
}
</script>

<template>
  <main-layout title="Providers">
    <table-layout
      table-name="products"
      :processor="table.processor"
      :filters="table.filters"
      :columns="table.columns"
      :fragments="false"
      @row-click="onRowClick"
    />
  </main-layout>
</template>
