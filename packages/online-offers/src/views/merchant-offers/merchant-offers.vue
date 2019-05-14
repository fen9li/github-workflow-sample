<script>
import table from './merchant-offers.table'

export default {
  name: 'MerchantOffers',
  data() {
    return {
      table: table(this),
    }
  },
  methods: {
    onRowClick(row) {
    },
  },
}
</script>

<template>
  <main-layout
    title="PLACEHOLDER Offers"
    back
  >
    <table-layout
      table-name="merchant-offers"
      :processor="table.processor"
      :filters="table.filters"
      :columns="table.columns"
      @row-click="onRowClick"
    />
  </main-layout>
</template>
