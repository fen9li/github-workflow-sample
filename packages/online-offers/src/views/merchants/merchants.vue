<script>
import table from './merchants.table'

export default {
  name: 'Merchants',
  page: {
    title: '',
  },
  data() {
    return {
      table: table(this),
    }
  },
  methods: {
    onRowClick(row) {
      this.$router.push({
        name: 'merchant-details',
        params: { slug: row.merchantName || 'unknown' },
      })
    },
    viewOffers(e) {
      console.warn(e)
    },
  },
}
</script>

<template>
  <main-layout title="Merchants">
    <table-layout
      table-name="merchants"
      :processor="table.processor"
      :filters="table.filters"
      :columns="table.columns"
      :fragments="false"
      :hider="false"
      quantity
      @row-click="onRowClick"
    >
      <el-table-column
        fixed="right"
        width="120"
      >
        <el-button
          type="text"
          :class="$style.viewOffers"
          @click.stop="viewOffers"
        >
          View Offers
        </el-button>
      </el-table-column>
    </table-layout>
  </main-layout>
</template>

<style lang="scss" module>
.viewOffers {
  font-weight: 700;
}
</style>
