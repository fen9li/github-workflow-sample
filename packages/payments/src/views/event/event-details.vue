<script>
import { formatDate } from '@lib/utils/format-date'
import capitalize from 'lodash/capitalize'
import ElasticProcessor from '@lib/processors/elastic-processor'

export default {
  name: 'EventDetails',
  page: {
    title: 'Event Details',
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    routePayload: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      loading: false,
      processing: false,
      details: {},
      webhooks: {
        loading: true,
        data: []
      },
      webhookCollapse: [],
    }
  },
  created() {
    const { routePayload, id } = this
    if(routePayload) {
      this.details = routePayload
      this.getWebhooks(id)
    } else {
      this.getEvent().then(id => {
        this.getWebhooks(id)
      })
    }
  },
  methods: {
    capitalize,
    formatDate(val) {
      return formatDate(val, 'DD/MM/YYYY hh:mm:ss')
    },
    webhookStatus(status) {
      const first = status.toString()[0]
      return first === '4' || first === '5' ? 'failed' : 'success'
    },
    async resendEvent(id) {
      // Double check with failed webhooks
      this.processing = true
      const [error,] = await this.$api.post(`/webhook/requests/${id}/retry`)
      this.processing = false

      if (error) {
        const violations = Object.keys(error.violations)
        violations.forEach(violation => {
          setTimeout(() => {
            this.$notify({
              type: 'error',
              title: 'Error',
              message: `${violation}: ${error.violations[violation][0]}`,
            })
          }, 50)
        })
      } else {
        this.$notify({
          type: 'success',
          title: 'Success',
          message: 'Webhook successfully re-sent.',
        })
      }
    },
    async getEvent() {
      this.loading = true
      const [, response] = await this.$api.get(`search/activities/doc/${this.id}`)

      if (response) {
        this.details = response._source
      }

      this.loading = false
      return response._source.id
    },
    getWebhooks(id) {
      this.webhooks = new ElasticProcessor({
        component: this,
        index: 'webhooks',
        staticQuery: {
          filters: [
            {
              attribute: 'activity.id',
              value: id,
            },
          ],
        },
      })
    },
  },
}
</script>

<template>
  <main-layout
    back
    title="Event Details"
  >
    <el-card
      v-loading="loading"
      :class="$style.summary"
    >
      <div slot="header">
        Summary
      </div>
      <dl
        v-if="details"
        class="datalist"
      >
        <dt>Date</dt>
        <dd>{{ formatDate(details.occurredAt) }}</dd>
        <dt>Description</dt>
        <dd>{{ details.description }}</dd>
        <dt>ID</dt>
        <dd>{{ details.id }}</dd>
      </dl>
    </el-card>
    <el-card
      v-loading="loading"
    >
      <div slot="header">
        Event Data
      </div>
      <as-code
        v-if="details.payload && !loading"
      >
        {{ JSON.parse(details.payload) }}
      </as-code>
    </el-card>
    <el-card
      v-loading="webhooks.loading"
    >
      <div slot="header">
        Webhooks
      </div>

      <div v-if="!webhooks.loading">
        <el-collapse
          v-if="webhooks.data.length"
          v-model="webhookCollapse"
        >
          <el-collapse-item
            v-for="webhook in webhooks.data"
            :key="webhook.id"
            :name="webhook.id"
            :class="$style.webhook"
          >
            <template slot="title">
              <div :class="$style.status">
                <span
                  :class="['status-tag', $style[webhookStatus(webhook.status)]]"
                >
                  {{ capitalize(webhookStatus(webhook.status)) }}
                </span>
              </div>
              <span :class="$style.webhookUrl">
                {{ webhook.url }}
              </span>
              <el-button
                v-if="webhookStatus(webhook.status) === 'failed'"
                type="primary"
                :class="$style.resend"
                :loading="processing"
                @click.stop="resendEvent(webhook.id)"
              >
                Re-send event
              </el-button>
            </template>
            <as-code>
              {{ JSON.parse(webhook.activity.payload) }}
            </as-code>
          </el-collapse-item>
        </el-collapse>
        <div v-else>
          No webhooks found
        </div>
      </div>
    </el-card>
  </main-layout>
</template>

<style lang="scss" module>
  :global {
    .el-card + .el-card {
      margin-top: 2rem;
    }

    .el-collapse,
    .el-collapse-item__header {
      border: none;
    }

    .el-collapse-item__header {
      height: 4rem;
    }
  }
.webhook {
  :global {
    .el-collapse-item__header {
      position: relative;

      .el-collapse-item__arrow {
        position: absolute;
        font-weight: 700;
      }
    }
  }
}

.status {
  width: rem(70px);
  margin: 0 2rem;
  font-size: 1rem;
}

.success {
  color: #3A8463;
  background: #CAF3C8
}

.failed {
  color: var(--color-error);
  background: #FBD2D2
}

.webhookUrl {
  font-size: 1rem;
  color:#bbb;
}

.resend {
  margin: 0 0 auto auto;
}
</style>
