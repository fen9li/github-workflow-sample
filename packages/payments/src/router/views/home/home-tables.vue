<script>
import tablesConfig from './home-tables-config'
import { singleProductsData, subscriptionsData } from './home-tables-mocks'
import StaticProcessor from '@core/static-processor'

export default {
  name: 'HomeDashboardTables',
  data() {
    return {
      ...tablesConfig,
      // eslint-disable-next-line max-len
      productProcessor: new StaticProcessor({
        component: this,
        data: singleProductsData,
      }),
      // eslint-disable-next-line max-len
      subscriptionsProcessor: new StaticProcessor({
        component: this,
        data: subscriptionsData,
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
