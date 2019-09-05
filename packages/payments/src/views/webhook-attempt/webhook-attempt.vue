<script>
import attemptMock from '@tests/__fixtures__/webhook-attempt'
import { formatDate } from '@lib/utils/format-date'
import capitalize from 'lodash/capitalize'

export default {
  name: 'WebhookAttempt',
  page: {
    title: 'Webhook Attempt',
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      attemptMock,
      loading: false,
      resending: false,
      details: {},
    }
  },
  created() {
    this.getDetails()
  },
  methods: {
    capitalize,
    formatDate(val) {
      return formatDate(val, 'DD/MM/YYYY hh:mm:ss')
    },
    webhookStatus(success) {
      if(success) {
        return {
          value: 'Success',
          style: { color: '#3A8463', background: '#CAF3C8' }
        }
      } else {
        return {
          value: 'Faled',
          style: { color: 'var(--color-error)', background: '#FBD2D2' }
        }
      }
    },
    async resendEvent() {
      this.resending = true
      const [error] = await this.$api.post(`/webhooks/${this.details.requestId}/retry`)
      this.resending = false

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
          message: `Changes saved successfully`,
        })
        this.$emit('update:visible', false)
        this.$emit('updated')
      }

    },
    async getDetails() {
      this.loading = true
      const [, response] = await this.$api.get(`search/webhook-responses/doc/${this.id}`)
      if(response) {
        this.details = response._source
      }
      this.loading = false
    }
  },

}
</script>

<template>
  <main-layout
    back
    title="Webhook Attempt Details"
  >
    <el-card
      v-loading="loading"
      :class="$style.summary"
    >
      <div
        slot="header"
        :class="$style.header"
      >
        <div>
          Summary
        </div>
        <div>
          <el-button
            type="primary"
            :loading="resending"
            @click="resendEvent"
          >
            Re-send event
          </el-button>
        </div>
      </div>
      <dl
        v-if="!loading"
        class="datalist"
      >
        <dt>URL</dt>
        <dd>{{ details.url || '-' }}</dd>
        <dt>Event Type</dt>
        <dd>{{ details.type || '-' }}</dd>
        <dt>Event ID</dt>
        <dd>{{ details.requestId }}</dd>
        <dt>Date</dt>
        <dd>{{ formatDate(details.createdAt) }}</dd>
        <dt>Status</dt>
        <dd>
          <span
            class="status-tag"
            :style="webhookStatus(details.successful).style"
          >
            {{ webhookStatus(details.successful).value }}
          </span>
        </dd>
      </dl>
    </el-card>
    <el-card>
      <div slot="header">
        Request POST Body
      </div>
      <as-code>
        {{ details.request }}
      </as-code>
    </el-card>

    <el-card>
      <div slot="header">
        Response Body
      </div>
      <as-code>
        {{ details.response }}
      </as-code>
    </el-card>
  </main-layout>
</template>

<style lang="scss" module>
:global {
  .el-card + .el-card {
    margin-top: 2rem;
  }
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
