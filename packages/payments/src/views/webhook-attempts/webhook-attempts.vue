<script>
import tableConfig from './webhook-attempts-table'

export default {
  name: 'WebhookAttempts',
  page: {
    title: 'Webhook Attempts',
  },
  data() {
    return {
      tableConfig: tableConfig(this),
    }
  },
  methods: {
    onRowClick(row) {
      this.$router.push({
        name: 'settings-webhook-attempts-details',
        params: { id: row.id },
      })
    },
  },
}
</script>

<template>
  <main-layout
    title="Webhook Attempts"
  >
    <table-layout
      table-name="webhookAttempts"
      :processor="tableConfig.processor"
      :columns="tableConfig.columns"
      :filters="tableConfig.filters"
      @row-click="onRowClick"
    />
  </main-layout>
</template>
