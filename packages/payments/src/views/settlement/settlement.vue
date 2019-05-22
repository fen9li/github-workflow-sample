<script>
import appConfig from '~/app.config'
import settlementInfo from './settlement-info'
import settlementDetailsMock from
  '@tests/__fixtures__/settlement-details-mock.js'
import StaticProcessor from '@lib/processors/static-processor'
import ElasticProcessor from '@lib/processors/elastic-processor'
import summaryTableConfig from './settlement-summary-table.js'
import transactionsTableConfig from './settlement-transactions-table.js'
import formatDollar from '@lib/utils/format-dollar.js'

export default {
  name: 'SettlementDetails',
  page: {
    title: 'Settlement Details',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: {
    settlementInfo,
  },
  data() {
    return {
      summaryProcessor: new StaticProcessor({
        component: this,
        data: settlementDetailsMock.summaryTable,
      }),
      transactionsProcessor: new ElasticProcessor({
        component: this,
        index: 'transactions',
        staticQuery: {
          filters: [
            {
              attribute: 'type',
              comparison: 'eq',
              value: 'settlement',
            },
          ],
          sort: { 'createdAt': 'desc' },
        },
      }),
      settlementDetailsMock,
      summaryColumns: summaryTableConfig.columns,
      transactionsColumns: transactionsTableConfig.columns,
    }
  },
  methods: {
    getSummary(param) {
      const { columns, data } = param
      const sums = []

      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = 'Payouts'
          return
        }

        if (columns.length - 1 === index) {
          const total = data
            .map(item => Number(item[column.property]))
            .reduce((total, value) => total += value)
          sums[index] = formatDollar(total)
          return
        }
      })

      return sums
    },
    onTransactionsRowClick(row) {
      this.$router.push({
        name: 'payment-transaction-details',
        params: { id: row.id },
      })
    },
  },
}
</script>

<template>
  <main-layout
    title="Settlement Details"
    back
  >
    <settlement-info
      :settlement-details="settlementDetailsMock.settlementDetails"
    />
    <table-layout
      title="Summary"
      table-name="settlementSummary"
      :columns="summaryColumns"
      :processor="summaryProcessor"
      :summary-method="getSummary"
      :table-controls="false"
      show-summary
    >
      <span slot="note">
        * Fees refunded by EonX
      </span>
    </table-layout>
    <table-layout
      title="Settlement - Transaction Log"
      table-name="settlementTransactionLog"
      :table-controls="false"
      :processor="transactionsProcessor"
      :columns="transactionsColumns"
      @row-click="onTransactionsRowClick"
    />
  </main-layout>
</template>
