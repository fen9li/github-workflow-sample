<script>
import appConfig from '@src/app.config'
import MainLayout from '@layouts/main/main-layout.vue'
import TableLayout from '@layouts/table/table-layout'
import settlementDetailsBlock from './settlement-details-block'
import mockedData from '@/tests/mock-api/resources/settlement-details-mock.js'
import StaticProcessor from '@core/static-processor'
import tableConfig from './settlement-details-tables-config.js'

export default {
  name: 'SettlementDetails',
  page: {
    title: 'Settlement Details',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: {
    MainLayout,
    TableLayout,
    settlementDetailsBlock,
  },
  data() {
    return {
      tableProcessor: new StaticProcessor({
        component: this,
        data: mockedData.TABLE_DATA,
      }),
      mockedData,
      ...tableConfig,
    }
  },
}
</script>

<template>
  <main-layout
    title="Settlement Details"
    back
  >
    <settlement-details-block
      :settlement-details="mockedData.SETTLEMENT_DETAILS"
    />
    <table-layout
      title="Settlement - Transaction Log"
      :filters="tableConfig.filters"
      :columns="tableConfig.columns"
      :processor="tableProcessor"
    />
  </main-layout>
</template>
