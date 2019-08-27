<script>
import table from './events-table'

export default {
  name: 'Events',
  page: {
    title: 'Events',
  },
  data() {
    return {
      table: table(this),
    }
  },
  methods: {
    onRowClick(row) {
      this.$router.push({
        name: 'event-details',
        params: { id: row.id, routePayload: row },
      })
    },
  },
}
</script>

<template>
  <main-layout title="Events">
    <table-layout
      table-name="events"
      :processor="table.processor"
      :filters="table.filters"
      :columns="table.columns"
      :fragments="false"
      @row-click="onRowClick"
    />
  </main-layout>
</template>
