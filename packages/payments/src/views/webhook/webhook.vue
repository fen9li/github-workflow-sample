<script>
import table from './webhook-attempts-table'
import webhookSummary from './webhook-summary'

export default {
  name: 'WebhookDetails',
  page: {
    title: 'Webhook Details',
  },
  components: {
    webhookSummary,
  },
  props: {
    id: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      loading: false,
      table: table(this),
      details: {},
    }
  },
  created() {
    this.getWebhook()
  },
  methods: {
    async getWebhook() {
      this.loading = true
      const [, response] = await this.$api.get(`search/webhooks/doc/${this.id}`)
      if(response) {
        this.details = response._source
      }
      this.loading = false
    }
  }
}
</script>

<template>
  <main-layout
    title="Webhook Details"
    back
  >
    <webhook-summary
      v-loading="loading"
      :details="details"
    />

    <table-layout
      title="Webhook Attempts"
      table-name="webhookAttempts"
      :processor="table.processor"
      :columns="table.columns"
      :table-controls="false"
    >
      <template
        slot="expandedRow"
        slot-scope="{ row }"
      >
        <div :class="$style.content">
          <div :class="$style.row">
            <div :class="$style.rowKey">
              HTTPS Status Code
            </div>
            <div>
              {{ row.responseCode }}
            </div>
          </div>

          <div :class="$style.row">
            <div :class="$style.rowKey">
              Request to your endpoint
            </div>
            <div>
              <as-code
                :class="$style.code"
              >
                {{ row.requestBody }}
              </as-code>
            </div>
          </div>

          <div :class="$style.row">
            <div :class="$style.rowKey">
              Response
            </div>
            <div>
              <as-code
                :class="$style.code"
              >
                {{ row.responseBody }}
              </as-code>
            </div>
          </div>
        </div>
      </template>
    </table-layout>
  </main-layout>
</template>


<style lang="scss" module>
.content {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  margin-left: 8rem;
}

.row {
  display: flex;
  margin-bottom: .7rem;
}

.rowKey {
  width: 8rem;
  margin-right: 2rem;
}

.code {
  font-size: .9rem;
}
</style>
