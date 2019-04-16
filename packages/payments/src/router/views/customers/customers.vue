<script>
import MainLayout from '@layouts/main/main-layout'
import TableLayout from '@layouts/table/table-layout'
import ElasticProcessor from '@core/elastic-processor'
import tableConfig from './customers-table'
import AddCustomerModal from './add-customer-modal'

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
      :processor="processor"
      :filters="filters"
      :columns="columns"
      @row-click="onRowClick"
    />

    <add-customer-modal
      slot="header"
    />
  </main-layout>
</template>
