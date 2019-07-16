<script>
import table from './subscriptions-table'

export default {
  name: 'CustomerSubscriptions',
  page: {
    title: 'Customer Subscriptions',
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      table: table(this),
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
  <div>
    <table-layout
      table-name="customerSubscriptions"
      :processor="table.processor"
      :filters="table.filters"
      :columns="table.columns"
      :fragments="false"
      @row-click="onRowClick"
    />
  </div>
</template>
