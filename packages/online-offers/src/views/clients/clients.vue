<script>
import ApiProcessor from '@lib/processors/api-processor'
import tableConfig from './clients-table'
import AddClientModal from './client-add'

export default {
  name: 'Clients',
  page: {
    title: 'Clients',
  },
  components: {
    AddClientModal,
  },
  data() {
    return {
      processor: new ApiProcessor({
        component: this,
        path: 'clients',
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
      :processor="processor"
      :filters="filters"
      :columns="columns"
      :fragments="false"
      :hider="false"
      quantity
      @row-click="onRowClick"
    />
    <el-button
      slot="header"
      type="primary"
      @click="modal.add = true"
    >
      Add Client
    </el-button>

    <add-client-modal
      v-if="modal.add"
      slot="header"
      :visible.sync="modal.add"
    />
  </main-layout>
</template>
