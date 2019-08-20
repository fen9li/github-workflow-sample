<script>
import table from './subscriptions-table'

export default {
  name: 'Subscriptions',
  page: {
    title: 'Subscriptions',
  },
  data() {
    return {
      table: table(this),
    }
  },
  methods: {
    onRowClick(row) {
      this.$router.push({
        name: 'subscription-details',
        params: { id: row.id },
      })
    },
  },
}
</script>

<template>
  <main-layout title="Subscriptions">
    <table-layout
      table-name="subscriptions"
      :processor="table.processor"
      :filters="table.filters"
      :columns="table.columns"
      @row-click="onRowClick"
    />
  </main-layout>
</template>
