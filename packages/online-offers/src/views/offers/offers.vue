<script>
import ApiProcessor from '@lib/processors/api-processor'
import { mapGetters, mapMutations } from 'vuex'
import table from './offers.table'

export default {
  name: 'GlobalOffers',
  data() {
    return {
      table,
    }
  },
  computed: {
    ...mapGetters('offers', ['tableUpdate']),
  },
  watch: {
    tableUpdate() {
      this.getOffers()
    },
  },
  created() {
    this.getOffers()
  },
  methods: {
    ...mapMutations('offers', {
      updateTable: 'UPDATE_TABLE',
    }),
    getOffers() {
      this.updateTable(false)
      this.table.processor = new ApiProcessor({
        component: this,
        path: 'offers',
      })
    },
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
