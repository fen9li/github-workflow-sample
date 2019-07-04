<script>
import offersTable from './offers.table'

export default {
  name: 'GlobalOffers',
  data() {
    return {
      table: offersTable(this),
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
      table-name="offers"
      :processor="table.processor"
      :filters="table.filters"
      :columns="table.columns"
      :fragments="false"
      :hider="false"
      :class="$style.table"
      quantity
      @row-click="onRowClick"
    />
  </main-layout>
</template>

<style lang="scss" module>
.table {
  colgroup > col:first-child {
    width: rem(120px);
  }
}
</style>
