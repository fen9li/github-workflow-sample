<script>
import tableConfig from './subscriptions-table'

export default {
  name: 'Subscriptions',
  page: {
    title: 'Subscriptions',
  },
  data() {
    return {
      tableConfig: tableConfig(this),
    }
  },
  methods: {
    onRowClick(row) {
      this.$router.push({
        name: 'subscription-details',
        params: { id: row.id },
      })
    },
  },
}
</script>

<template>
  <main-layout title="Subscriptions">
    <table-layout
      table-name="subscriptions"
      :processor="tableConfig.processor"
      :filters="tableConfig.filters"
      :columns="tableConfig.columns"
      :fragments="false"
      @row-click="onRowClick"
    />
  </main-layout>
</template>
