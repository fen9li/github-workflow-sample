<script>
import DataTable from '@components/data-table'
import StatisProcessor from '@core/static-processor'
import tableConfig from './subscriptions-table'
import addSubscription from './add-subscription'

const subscriptions = require('@mock-api/resources/customer-subscriptions')

export default {
  name: 'CustomerSubscriptions',
  components: {
    DataTable,
    addSubscription,
  },
  data() {
    return {
      processor: new StatisProcessor({
        component: this,
        data: subscriptions.data,
      }),
      columns: tableConfig.columns,
    }
  },
  methods: {
    onRowClick(row) {
      this.$router.push({
        name: 'subscription-details',
        params: { id: row.externalId },
      })
    },
  },
}
</script>

<template>
  <el-card>
    <el-row
      slot="header"
      type="flex"
      justify="space-between"
      align="middle"
    >
      <span>Subscriptions</span>

      <el-row type="flex">
        <add-subscription />
      </el-row>
    </el-row>

    <data-table
      :processor="processor"
      :columns="columns"
      title="Subscriptions"
      @row-click="onRowClick"
    />
  </el-card>
</template>
