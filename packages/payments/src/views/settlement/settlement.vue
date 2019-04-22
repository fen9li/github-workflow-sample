<script>
import appConfig from '~/app.config'
import settlementInfo from './settlement-info'
import settlementDetailsMock from
  '@tests/__fixtures__/settlement-details-mock.js'
import StaticProcessor from '@lib/processors/static-processor'
import summaryTableConfig from './settlement-summary-table.js'
import detailsTableConfig from './settlement-table.js'
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
      detailsProcessor: new StaticProcessor({
        component: this,
        data: settlementDetailsMock.detailsTable,
      }),
      summaryProcessor: new StaticProcessor({
        component: this,
        data: settlementDetailsMock.summaryTable,
      }),
      settlementDetailsMock,
      detailsColumns: detailsTableConfig.columns,
      summaryColumns: summaryTableConfig.columns,
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
          sums[index] = `Total ${formatDollar(total)}`
          return
        }
      })

      return sums
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
      :columns="detailsColumns"
      :processor="detailsProcessor"
      :table-controls="false"
    />
  </main-layout>
</template>
