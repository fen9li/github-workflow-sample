<script>
import table from './transactions-table'
import { mapActions } from 'vuex'

export default {
  name: 'SubscriptionTransactions',
  page: {
    title: 'Subscription Transactions',
  },
  props: {
    id: {
      type: String,
      required: true,
    },
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
        name: 'transaction-details',
        params: { id: row.id },
      })
    },
  },
}
</script>

<template>
  <table-layout
    table-name="subscriptionTransactions"
    :processor="table.processor"
    :filters="table.filters"
    :columns="table.columns"
    @row-click="onRowClick"
  />
</template>
