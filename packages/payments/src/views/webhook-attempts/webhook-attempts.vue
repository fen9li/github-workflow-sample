<script>
import tableConfig from './webhook-attempts-table'
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
      tableConfig: tableConfig(this),
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
      :processor="tableConfig.processor"
      :columns="tableConfig.columns"
      :filters="tableConfig.filters"
      :fragments="false"
      @row-click="onRowClick"
    />
  </main-layout>
</template>
