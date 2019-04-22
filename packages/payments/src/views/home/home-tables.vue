<script>
import tablesConfig from './home-tables-config'
import StaticProcessor from '@lib/processors/static-processor'
import singleProductsMock from '@tests/__fixtures__/home-single-products-mock'
import subscriptionsMock from '@tests/__fixtures__/home-subscriptions-mock'

export default {
  name: 'HomeDashboardTables',
  data() {
    return {
      ...tablesConfig,
      // eslint-disable-next-line max-len
      productProcessor: new StaticProcessor({
        component: this,
        data: singleProductsMock.table,
      }),
      // eslint-disable-next-line max-len
      subscriptionsProcessor: new StaticProcessor({
        component: this,
        data: subscriptionsMock.table,
      }),
    }
  },
}
</script>

<template>
  <div class="home__dashboard__tables">
    <el-card class="home__dashboard__table">
      <span class="home__dashboard__table-title">
        Top 5 Single Products
      </span>
      <data-table
        :processor="productProcessor"
        :columns="tablesConfig.singleProductsTable.columns"
      />
    </el-card>

    <el-card class="home__dashboard__table">
      <span class="home__dashboard__table-title">
        Top 5 Subscriptions Products
      </span>
      <data-table
        :processor="subscriptionsProcessor"
        :columns="tablesConfig.subscriptionsTable.columns"
      />
    </el-card>
  </div>
</template>

<style lang="scss" src="./home.scss" />
