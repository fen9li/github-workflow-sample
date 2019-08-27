<script>
export default {
  name: 'WebhookSummary',
  props: {
    details: {
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
  computed: {
    webhookMode() {
      const { status } = this.details
      const val = status.toString()[0]
      return val === '4' || val === '5' ? 'Down' : 'Live'
    }
  },
}
</script>

<template>
  <el-card :class="$style.wrapper">
    <div slot="header">
      Summary
    </div>
    <dl
      v-if="details.id"
      class="datalist"
    >
      <dt>URL</dt>
      <dd>{{ details.url }}</dd>

      <dt>Mode</dt>
      <dd>
        <span :class="['status-tag', $style[webhookMode.toLowerCase()]]">
          {{ webhookMode }}
        </span>
      </dd>

      <dt>Event Types</dt>
      <dd :class="$style.events">
        <p>
          {{ details.activity.activity }}
        </p>
      </dd>
    </dl>
  </el-card>
</template>

<style lang="scss" module>
.wrapper {
  margin-bottom: 2rem;
}

.live {
  color: #3A8463;
  background: #CAF3C8;
}

.down {
  color: var(--color-error);
  background: #FBD2D2;
}

.events :first-of-type  {
  margin-top: 0;
}
</style>
