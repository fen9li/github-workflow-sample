<script>
import table from './offers.table'

export default {
  name: 'GlobalOffers',
  data() {
    return {
      table: table(this),
    }
  },
  methods: {
    onRowClick(row) {
      this.$router.push({
        name: 'offer-details',
        params: { id: row.id || 'unknown' },
      })
    },
  },

}
</script>

<template>
  <main-layout title="Global Offers">
    <table-layout
      table-name="merchants"
      :processor="table.processor"
      :filters="table.filters"
      :columns="table.columns"
      :fragments="false"
      :hider="false"
      quantity
      @row-click="onRowClick"
    />
  </main-layout>
</template>
