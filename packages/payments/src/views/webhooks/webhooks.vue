<script>
import StaticProcessor from '@lib/processors/static-processor'
import tableConfig from './webhooks-table'
import webhooksMock from '@tests/__fixtures__/webhooks'
import addEndpoint from './add-endpoint'

export default {
  name: 'Webhooks',
  page: {
    title: 'Webhooks',
  },
  components: {
    addEndpoint,
  },
  data() {
    return {
      processor: new StaticProcessor({
        component: this,
        data: webhooksMock.table,
      }),
      filters: tableConfig.filters,
      columns: tableConfig.columns,
      modal: {
        add: false,
      },
    }
  },
  methods: {
    onRowClick(row) {
      this.$router.push({
        name: 'webhook-details',
        params: { id: row.id },
      })
    },
  },
}
</script>

<template>
  <main-layout title="Webhooks">
    <div
      slot="header"
    >
      <el-button
        type="primary"
        @click="modal.add = true"
      >
        Add Endpoints
      </el-button>

      <add-endpoint
        v-if="modal.add"
        :visible.sync="modal.add"
      />
    </div>

    <table-layout
      table-name="webhooks"
      :processor="processor"
      :filters="filters"
      :columns="columns"
      @row-click="onRowClick"
    />
  </main-layout>
</template>
