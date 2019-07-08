<script>
import endpointEdit from './endpoint-add-edit'
import webhookDeactivate from './webhook-deactivate'
import webhookDelete from './webhook-delete'
import capitalize from 'lodash/capitalize'

export default {
  name: 'WebhookSummary',
  components: {
    endpointEdit,
    webhookDeactivate,
    webhookDelete,
  },
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
    <div
      slot="header"
    >
      <div :class="$style.header">
        <span>Summary</span>

        <div :class="$style.headerActions">
          <el-switch
            :value="endpoint.active"
            active-text="Active"
            :class="[$style.switch, {[$style.switchActive]: endpoint.active}]"
            @change="modal.disable = true"
          />
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            @click="modal.edit = true"
          />

          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click="modal.delete = true"
          />

          <webhook-deactivate
            v-if="modal.disable"
            :visible.sync="modal.disable"
            :endpoint="endpoint"
          />
          <endpoint-edit
            v-if="modal.edit"
            :visible.sync="modal.edit"
            :endpoint="endpoint"
            edit
          />
          <webhook-delete
            v-if="modal.delete"
            :visible.sync="modal.delete"
            :endpoint="endpoint"
          />
        </div>
      </div>
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

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.headerActions {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.switch {
  margin-right: 1.5rem;
  :global {
    .el-switch__label  {
      margin-left: 1rem;

      > span {
        font-size: 1.1rem !important;
        color: #bbb;
      }
    }
  }
}

.switchActive {
  :global {
    .el-switch__label > span {
      color: #29d737;
    }
  }
}

.modeLive {
  color: #3A8463;
  background: #CAF3C8;
}

.events :first-of-type  {
  margin-top: 0;
}
</style>
