<script>
import table from './products-subscription-table'
import { mapActions } from 'vuex'

export default {
  name: 'ProductsSubscription',
  page: {
    title: 'Subscription Products',
  },
  props: {
    shouldUpdate: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      table: table(this),
    }
  },
  watch: {
    shouldUpdate(newVal) {
      if(newVal) {
        this.UPDATE_TABLE(this.table)
        this.$emit('update:shouldUpdate', false)
      }
    }
  },
  methods: {
    ...mapActions('ui', ['UPDATE_TABLE']),
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
  <div>
    <table-layout
      table-name="SubscriptionProducts"
      :processor="table.processor"
      :filters="table.filters"
      :columns="table.columns"
      @row-click="onRowClick"
    />
  </div>
</template>
