<script>
import MainLayout from '@layouts/main/main-layout'
import TableLayout from '@layouts/table/table-layout'
import ElasticProcessor from '@core/elastic-processor'
import tableConfig from './customers-table'
import AddCustomerModal from './customer-add'

export default {
  name: 'Customers',
  page: {
    title: 'Customers',
  },
  components: {
    MainLayout,
    TableLayout,
    AddCustomerModal,
  },
  data() {
    return {
      processor: new ElasticProcessor({
        component: this,
        index: 'customers',
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
        name: 'customers-details',
        params: { id: 'unknown' },
      })
    },
  },
}
</script>

<template>
  <main-layout title="Customers">
    <table-layout
      table-name="customers"
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
      Add customer
    </el-button>

    <add-customer-modal
      v-if="modal.add"
      slot="header"
      :visible.sync="modal.add"
    />
  </main-layout>
</template>
