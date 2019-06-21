<script>
import ApiProcessor from '@lib/processors/api-processor'
import { mapGetters, mapMutations } from 'vuex'
import table from './merchants.table'

export default {
  name: 'Merchants',
  page: {
    title: '',
  },
  data() {
    return {
      table,
    }
  },
  computed: {
    ...mapGetters('merchants', ['tableUpdate']),
  },
  watch: {
    tableUpdate() {
      this.getMerchants()
    },
  },
  created() {
    this.getMerchants()
  },
  methods: {
    ...mapMutations('merchants', {
      updateTable: 'UPDATE_TABLE',
    }),
    getMerchants() {
      this.updateTable(false)
      this.table.processor = new ApiProcessor({
        component: this,
        path: 'merchants',
      })
    },
    onRowClick(row, column, event) {
      this.$router.push({
        name: 'merchant-details',
        params: { id: row.id || 'unknown' },
      })
    },
    viewOffers(e) {
      console.warn(e)
    },
  },
}
</script>

<template>
  <main-layout title="Global Merchants">
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

<style lang="scss" module>
.viewOffers {
  font-weight: 700;
}
</style>
