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
    }
  },
  methods: {
    capitalize,
    formatDate(val) {
      return formatDate(val, 'DD/MM/YYYY hh:mm:ss')
    },
    webhookStatus(val) {
      switch (val) {
        case 'success': return { color: '#3A8463', background: '#CAF3C8' }
        case 'failed': return { color: 'var(--color-error)', background: '#FBD2D2' }
      }
    },
    resendEvent() {
    },
  },
}
</script>

<template>
  <main-layout
    back
    title="Webhook Attempt Details"
  >
    <el-card :class="$style.summary">
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
            @click="resendEvent"
          >
            Re-send event
          </el-button>
        </div>
      </div>
      <dl
        v-if="attemptMock.id"
        class="datalist"
      >
        <dt>URL</dt>
        <dd>{{ attemptMock.url }}</dd>
        <dt>Event Type</dt>
        <dd>{{ attemptMock.type }}</dd>
        <dt>Event ID</dt>
        <dd>{{ attemptMock.eventId }}</dd>
        <dt>Date</dt>
        <dd>{{ formatDate(attemptMock.date) }}</dd>
        <dt>Status</dt>
        <dd>
          <span
            class="status-tag"
            :style="webhookStatus(attemptMock.status)"
          >
            {{ capitalize(attemptMock.status) }}
          </span>
        </dd>
      </dl>
    </el-card>
    <el-card>
      <div slot="header">
        Request POST Body
      </div>
      <as-code>
        {{ attemptMock.requestBody }}
      </as-code>
    </el-card>

    <el-card>
      <div slot="header">
        Response Body
      </div>
      <as-code>
        {{ attemptMock.responseBody }}
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
