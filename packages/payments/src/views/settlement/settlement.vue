<script>
import appConfig from '~/app.config'
import settlementInfo from './settlement-info'
import summaryTable from './settlement-summary-table.js'
import transactionsTable from './settlement-transactions-table.js'
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
      summaryTable: summaryTable(this),
      transactionsTable: transactionsTable(this),
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
      :settlement-details="summaryTable.details"
    />
    <table-layout
      title="Summary"
      table-name="settlementSummary"
      :processor="summaryTable.processor"
      :columns="summaryTable.columns"
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
      :processor="transactionsTable.processor"
      :columns="transactionsTable.columns"
      @row-click="onTransactionsRowClick"
    />
  </main-layout>
</template>
