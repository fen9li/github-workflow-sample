<script>
import table from './subscriptions-table'

export default {
  name: 'CustomerSubscriptions',
  page: {
    title: 'Customer Subscriptions',
  },
  props: {
    customerDetails: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      table: table(this),
      modal: {
        add: false,
      },
    }
  },
  computed: {
    customerId() {
      return this.customerDetails.id
    },
  },
  methods: {
    onRowClick(row) {
      this.$router.push({
        name: 'subscription-details',
        params: { id: row.externalId },
      })
    },
  },
}
</script>

<template>
  <table-layout
    table-name="subscriptions"
    :processor="table.processor"
    :filters="table.filters"
    :columns="table.columns"
    :fragments="false"
    @row-click="onRowClick"
  />
</template>
