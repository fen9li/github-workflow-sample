<script>
import table from './products-subscription-table'

export default {
  name: 'ProductsSubscription',
  page: {
    title: 'Subscription Products',
  },
  props: {
    updateTable: {
      type: Boolean,
      required: true,
    }
  },
  data() {
    return {
      table: table(this),
    }
  },
  watch: {
    updateTable(newVal) {
      if(newVal) {
        this.table.processor.getData()
        this.$emit('update:updateTable', false)
      }
    }
  },
  methods: {
    onRowClick(row) {
      this.$router.push({
        name: 'products-subscription-details',
        params: { id: row.id },
      })
    },
  },
}
</script>

<template>
  <table-layout
    table-name="SubscriptioProducts"
    :processor="table.processor"
    :filters="table.filters"
    :columns="table.columns"
    :fragments="false"
    @row-click="onRowClick"
  />
</template>
