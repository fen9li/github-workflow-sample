<script>
import appConfig from '~/app.config'
import settlementInfo from './settlement-info'
import summaryTable from './settlement-summary.table'
import transactionsTable from './settlement-transactions.table'
import formatDollar from '@lib/utils/format-dollar'

export default {
  name: 'SettlementDetails',
  page: {
    title: 'Settlement Details',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: {
    settlementInfo,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      summaryTable: summaryTable(this),
      transactionsTable: transactionsTable(this),
      settlement: {},
    }
  },
  created() {
    this.getSettlement()
  },
  methods: {
    getSummary(param) {
      if (param) {
        const { columns, data } = param
        const sums = []

        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = 'Payouts'
            return
          }

          if (columns.length - 1 === index) {
            if (data.length) {
              const total = data
                .map(item => Number(item[column.property]))
                .reduce((total, value) => total += value)
              sums[index] = formatDollar(total)
              return
            }
          }
        })

        return sums
      }
    },
    transformSummaryTableData(data) {
      const formatted = []

      data.forEach(transaction => {
        const index = formatted.findIndex(item => item.type === transaction.type)
        const type = transaction.type
        const amount = +transaction.amount.total
        const fee = +transaction.amount.fees
        const net = +transaction.amount.subtotal

        if (index === -1) {
          formatted.push(
            { type, amount, fee, net, count: 1 }
          )
        } else {
          formatted[index].count++
          formatted[index].amount += amount
          formatted[index].fee += fee
          formatted[index].net += net
        }
      })
      return formatted
    },
    onTransactionsRowClick(row) {
      this.$router.push({
        name: 'payment-transaction-details',
        params: { id: row.id },
      })
    },
    async getSettlement() {
      const [, response] = await this.$api.get(`/transactions/${this.id}`)
      if (response) {
        this.settlement = { ...response }
      }
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
      :settlement="settlement"
    />
    <table-layout
      title="Summary"
      table-name="settlementSummary"
      :processor="summaryTable.processor"
      :columns="summaryTable.columns"
      :summary-method="getSummary"
      :table-controls="false"
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
