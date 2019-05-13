<script>
import ApiProcessor from '@lib/processors/api-processor'
import tableConfig from './clients-table'

export default {
  name: 'Clients',
  page: {
    title: 'Clients',
  },
  data() {
    return {
      processor: new ApiProcessor({
        component: this,
        index: 'clients',
        url: '',
        headers: {},
      }),
      columns: tableConfig.columns,
      filters: tableConfig.filters,
      modal: {
        add: false,
      },
    }
  },
  methods: {
    onRowClick(row) {
      //
    },
  },
}
</script>

<template>
  <main-layout title="Clients">
    <table-layout
      table-name="clients"
      :quantity="true"
      :fragments="false"
      :hider="false"
      :processor="processor"
      :filters="filters"
      :columns="columns"
      @row-click="onRowClick"
    />
    <el-button
      slot="header"
      type="primary"
      @click="modal.add = true"
    >
      Add Client
    </el-button>
  </main-layout>
</template>
