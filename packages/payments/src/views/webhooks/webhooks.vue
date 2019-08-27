<script>
import table from './webhooks-table'

export default {
  name: 'Webhooks',
  page: {
    title: 'Webhooks',
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
        name: 'webhook-details',
        params: { id: row.id },
      })
    },
  },
}
</script>

<template>
  <main-layout title="Webhooks">
    <table-layout
      table-name="webhooks"
      :processor="table.processor"
      :filters="table.filters"
      :columns="table.columns"
      :fragments="false"
      @row-click="onRowClick"
    />
  </main-layout>
</template>
