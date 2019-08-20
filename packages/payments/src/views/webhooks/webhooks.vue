<script>
import StaticProcessor from '@lib/processors/static-processor'
import table from './webhooks-table'
import webhooksMock from '@tests/__fixtures__/webhooks'

export default {
  name: 'Webhooks',
  page: {
    title: 'Webhooks',
  },
  data() {
    return {
      processor: new StaticProcessor({
        component: this,
        data: webhooksMock.table,
      }),
      filters: table.filters,
      columns: table.columns,
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
      :processor="processor"
      :filters="filters"
      :columns="columns"
      @row-click="onRowClick"
    />
  </main-layout>
</template>
