<script>
import table from './webhook-attempts-table'
import webhooksRetry from './webhooks-retry'

export default {
  name: 'WebhookAttempts',
  page: {
    title: 'Webhook Attempts',
  },
  components: {
    webhooksRetry,
  },
  data() {
    return {
      table: table(this),
      modal: {
        retry: false,
      },
    }
  },
  methods: {
    onRowClick(row) {
      this.$router.push({
        name: 'settings-webhook-attempt',
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
    <div slot="header">
      <el-button
        type="primary"
        @click="modal.retry = true"
      >
        Retry failed webhooks
      </el-button>

      <webhooks-retry
        v-if="modal.retry"
        :visible.sync="modal.retry"
      />
    </div>
    <table-layout
      table-name="webhookAttempts"
      :processor="table.processor"
      :columns="table.columns"
      :filters="table.filters"
      @row-click="onRowClick"
    />
  </main-layout>
</template>
