<script>
import table from './providers.table.js'

export default {
  data() {
    return {
      table: table(this),
    }
  },
  methods: {
    onRowClick(row) {
      // row
    }
  }
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
