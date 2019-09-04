<script>
import { formatDate } from '@lib/utils/format-date'
import logs from '@tests/__fixtures__/logs'

export default {
  name: 'LogDetails',
  page: {
    title: 'Log Details',
  },
  props: {
    id: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      logs,
    }
  },
  computed: {
    details() {
      return this.logs.table.find(item => item.id === this.id)
    },
    status() {
      const { status } = this.details
      const type = status.toString()[0]
      return `${status} ${type === '2' ? 'OK' : 'ERR'}`
    }
  },
  methods: {
    formatDate(value) {
      return formatDate(value, 'DD/MM/YYYY hh:mm A')
    },
  }
}
</script>

<template>
  <main-layout
    back
    :title="id"
  >
    <el-card :class="$style.summary">
      <div slot="header">
        Summary
      </div>
      <dl
        v-if="id"
        class="datalist"
      >
        <dt>Date Created</dt>
        <dd>{{ formatDate(details.createdAt) }}</dd>

        <dt>Last Update</dt>
        <dd>{{ formatDate(details.updatedAt) }}</dd>

        <dt>Description</dt>
        <dd>{{ details.description }}</dd>

        <dt>Value</dt>
        <dd>{{ details.value }}</dd>

        <dt>UpdatedBy</dt>
        <dd>{{ `${details.updatedBy.name} (User ID:${details.updatedBy.id})` }}</dd>

        <dt>Status</dt>
        <dd>{{ status }}</dd>

        <dt>Log</dt>
        <dd>{{ details.name }}</dd>

        <dt>ID</dt>
        <dd>{{ details.id }}</dd>

        <dt>Time</dt>
        <dd>{{ formatDate(details.time) }}</dd>

        <dt>Method</dt>
        <dd>{{ details.method }}</dd>

        <dt>URL</dt>
        <dd>{{ details.url }}</dd>

        <dt>IP Address</dt>
        <dd>{{ details.ipAddress }}</dd>

        <dt>Version</dt>
        <dd>{{ details.version }}</dd>

        <dt>Source</dt>
        <dd>{{ details.source }}</dd>

        <dt>Related</dt>
        <dd>{{ details.related }}</dd>

        <dt>Origin</dt>
        <dd>{{ details.origin }}</dd>
      </dl>
    </el-card>
    <el-card
      :v-if="details.requestBody"
    >
      <div slot="header">
        Request POST Body
      </div>
      <as-code>
        {{ details.requestBody }}
      </as-code>
    </el-card>
    <el-card
      :v-if="details.responseBody"
    >
      <div slot="header">
        Response Body
      </div>
      <as-code>
        {{ details.responseBody }}
      </as-code>
    </el-card>
  </main-layout>
</template>

<style lang="scss" module>
  :global {
    .el-card + .el-card {
      margin-top: 1rem;
    }
  }
</style>
