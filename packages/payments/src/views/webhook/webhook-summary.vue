<script>
import capitalize from 'lodash/capitalize'

export default {
  name: 'WebhookSummary',
  props: {
    endpoint: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      modal: {
        edit: false,
        delete: false,
        disable: false,
      },
    }
  },
  methods: {
    capitalize,
  },
}
</script>

<template>
  <el-card :class="$style.wrapper">
    <div slot="header">
      Summary
    </div>
    <dl
      v-if="endpoint.id"
      class="datalist"
    >
      <dt>URL</dt>
      <dd>{{ endpoint.url }}</dd>

      <dt>Mode</dt>
      <dd>
        <span :class="['status-tag', {[$style.modeLive]: endpoint.mode === 'live'} ]">
          {{ capitalize(endpoint.mode) }}
        </span>
      </dd>

      <dt>Event Types</dt>
      <dd :class="$style.events">
        <p
          v-for="event in endpoint.events"
          :key="event"
        >
          {{ event }}
        </p>
      </dd>
    </dl>
  </el-card>
</template>

<style lang="scss" module>
.wrapper {
  margin-bottom: 2rem;
}

.modeLive {
  color: #3A8463;
  background: #CAF3C8;
}

.events :first-of-type  {
  margin-top: 0;
}
</style>
