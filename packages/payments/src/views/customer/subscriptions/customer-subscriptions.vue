<script>
import StaticProcessor from '@lib/processors/static-processor'
import tableConfig from './subscriptions-table'
import addSubscription from './subscription-add'

const subscriptionsMock = require('@tests/__fixtures__/customer-subscriptions')

export default {
  name: 'CustomerSubscriptions',
  components: {
    addSubscription,
  },
  data() {
    return {
      processor: new StaticProcessor({
        component: this,
        data: subscriptionsMock.table,
      }),
      columns: tableConfig.columns,
      modal: {
        add: false,
      },
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

      <el-button
        type="primary"
        size="small"
        class="wide-button"
        @click="modal.add = true"
      >
        Add
      </el-button>

      <add-subscription
        v-if="modal.add"
        :visible.sync="modal.add"
      />
    </el-row>

    <data-table
      title="Subscriptions"
      :processor="processor"
      :columns="columns"
      @row-click="onRowClick"
    />
  </el-card>
</template>
