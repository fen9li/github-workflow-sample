<script>
import StaticProcessor from '@lib/processors/static-processor'
import table from './events-table'

const eventsMock = require('@tests/__fixtures__/events')

export default {
  name: 'Events',
  page: {
    title: 'Events',
  },
  data() {
    return {
      processor: new StaticProcessor({
        component: this,
        data: eventsMock.table,
      }),
      filters: table.filters,
      columns: table.columns,
    }
  },
  methods: {
    onRowClick(row) {
      this.$router.push({
        name: 'event-details',
        params: { id: row.id },
      })
    },
  },
}
</script>

<template>
  <main-layout title="Events">
    <table-layout
      table-name="events"
      :processor="processor"
      :filters="filters"
      :columns="columns"
      @row-click="onRowClick"
    />
  </main-layout>
</template>
