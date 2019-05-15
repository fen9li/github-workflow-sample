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
      this.$router.push({
        name: 'merchant-offer',
        params: { offerId: row.id },
      })
    },
  },
}
</script>

<template>
  <main-layout
    title="Boden New British Offers"
    back
  >
    <table-layout
      table-name="merchant-offers"
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
