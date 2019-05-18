<script>
import logHistoryMock from '../../../tests/__fixtures__/log-history-mock'

export default {
  name: 'LogDetails',
  page: {
    title: 'Log Details',
  },
  data() {
    const { id } = this.$route.params
    const { table } = logHistoryMock
    const entry = table.find(entry => entry.id === id)
    const { requestBody, responseBody, ...rest } = entry
    return {
      requestBody: JSON.stringify(JSON.parse(requestBody), null, '\t'),
      responseBody: JSON.stringify(JSON.parse(responseBody), null, '\t'),
      ...rest,
    }
  },
}
</script>

<template>
  <main-layout
    back
    title="Log Details"
  >
    <el-card :class="$style.summary">
      <div slot="header">
        Summary
      </div>
      <dl
        v-if="id"
        class="datalist"
      >
        <dt>Log</dt>
        <dd>{{ name }}</dd>
        <dt>ID</dt>
        <dd>{{ id }}</dd>
        <dt>Time</dt>
        <dd>{{ createdAt | dateTime }}</dd>
        <dt>Method</dt>
        <dd>{{ method }}</dd>
        <dt>URL</dt>
        <dd>{{ url }}</dd>
        <dt>Status</dt>
        <dd>{{ status }}</dd>
        <dt>IP Address</dt>
        <dd>{{ ipAddress }}</dd>
        <dt>Version</dt>
        <dd>{{ version }}</dd>
        <dt>Source</dt>
        <dd>{{ source }}</dd>
        <dt>Related</dt>
        <dd>{{ related }}</dd>
        <dt>Origin</dt>
        <dd>{{ origin }}</dd>
        <dt v-if="requestQuery">
          Request Query
        </dt>
        <dd>{{ requestQuery }}</dd>
      </dl>
    </el-card>
    <el-card
      :v-if="requestBody"
    >
      <div slot="header">
        Request POST Body
      </div>
      <as-code>
        {{ requestBody }}
      </as-code>
    </el-card>
    <el-card
      :v-if="responseBody"
    >
      <div slot="header">
        Response Body
      </div>
      <as-code>
        {{ responseBody }}
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

