<script>
import eventMock from '@tests/__fixtures__/event'
import { formatDate } from '@lib/utils/format-date'
import capitalize from 'lodash/capitalize'

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
  },
  data() {
    return {
      eventMock,
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
    title="Event Details"
  >
    <el-card :class="$style.summary">
      <div slot="header">
        Summary
      </div>
      <dl
        v-if="eventMock.id"
        class="datalist"
      >
        <dt>Date</dt>
        <dd>{{ formatDate(eventMock.created) }}</dd>
        <dt>Description</dt>
        <dd>{{ eventMock.description }}</dd>
        <dt>ID</dt>
        <dd>{{ eventMock.id }}</dd>
      </dl>
    </el-card>
    <el-card
      :v-if="eventMock.eventData"
    >
      <div slot="header">
        Event Data
      </div>
      <as-code>
        {{ eventMock.eventData }}
      </as-code>
    </el-card>
    <el-card>
      <div slot="header">
        Webhooks
      </div>

      <el-collapse>
        <el-collapse-item
          v-for="webhook in eventMock.webhooks"
          :key="webhook.id"
          :name="webhook.id"
          :class="$style.webhook"
        >
          <template slot="title">
            <span
              :class="[$style.status, 'status-tag']"
              :style="webhookStatus(webhook.status)"
            >
              {{ capitalize(webhook.status) }}
            </span>
            <span :class="$style.webhookUrl">
              {{ webhook.url }}
            </span>
            <el-button
              v-if="webhook.status === 'failed'"
              type="primary"
              :class="$style.resend"
              @click.stop="resendEvent"
            >
              Re-send event
            </el-button>
          </template>
          <div>
            Here will be data
          </div>
        </el-collapse-item>
      </el-collapse>
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
  margin: 0 2rem;
  font-size: 1rem;
}

.webhookUrl {
  font-size: 1rem;
  color:#bbb;
}

.resend {
  margin: 0 0 auto auto;
}
</style>
