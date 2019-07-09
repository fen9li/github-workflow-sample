<script>
import StaticProcessor from '@lib/processors/static-processor'
import tableConfig from './webhooks-table'
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
      filters: tableConfig.filters,
      columns: tableConfig.columns,
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
      :fragments="false"
      @row-click="onRowClick"
    />
  </main-layout>
</template>
