<script>
import tableConfig from './products-anchor-dates-table.js'
import ElasticProcessor from '@lib/processors/elastic-processor'

export default {
  name: 'ProductsAnchorDates',
  data() {
    return {
      dialogVisible: false,
      activeNames: [1],
      columns: tableConfig.columns,
      processor: new ElasticProcessor({
        component: this,
        index: 'subscription-product-groups',
      }),
    }
  },
}
</script>

<template>
  <el-collapse
    v-model="activeNames"
    class="form-collapse"
  >
    <el-collapse-item
      title="View Product Anchor Dates"
      name="1"
    >
      <data-table
        :columns="columns"
        :processor="processor"
      />
    </el-collapse-item>
  </el-collapse>
</template>
