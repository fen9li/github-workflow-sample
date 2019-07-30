<script>
import table from './subscriptions-table'
import { mapActions } from 'vuex'

export default {
  name: 'CustomerSubscriptions',
  page: {
    title: 'Customer Subscriptions',
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
        name: 'subscription-details',
        params: { id: row.id },
      })
    },
  },
}
</script>

<template>
  <div>
    <table-layout
      table-name="customerSubscriptions"
      :processor="table.processor"
      :filters="table.filters"
      :columns="table.columns"
      :fragments="false"
      @row-click="onRowClick"
    />
  </div>
</template>
