<script>
import DataTable from '@components/data-table'
import ElasticProcessor from '@core/elastic-processor'
import tableConfig from './products-table'
import addProduct from './add-product'

export default {
  name: 'CustomerProducts',
  components: {
    DataTable,
    addProduct,
  },
  data() {
    return {
      processor: new ElasticProcessor({
        component: this,
        index: 'subscription-product-groups',
        disableQueryString: true,
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
      <span>Products</span>

      <el-row type="flex">
        <add-product />
      </el-row>
    </el-row>

    <data-table
      title="Subscriptions"
      :processor="processor"
      :columns="columns"
      @row-click="onRowClick"
    />
  </el-card>
</template>
