<script>
import tableConfig from './products-anchor-dates-table.js'
import createProductAnchorMock from
  '@tests/__fixtures__/resources/create-product-anchor-dates'
import StaticProcessor from '@lib/processors/static-processor'

export default {
  name: 'ProductsAnchorDates',
  data() {
    return {
      dialogVisible: false,
      activeNames: [1],
      columns: tableConfig.columns,
      processor: new StaticProcessor({
        component: this,
        data: createProductAnchorMock.table,
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
      title="View Your Product Anchor Dates"
      name="1"
    >
      <div :class="$style.anchorDates">
        <div :class="$style.subheader">
          <span>
            Products with same Billing Cycle and Anchor Date
            <b>allow customers to be switched between products</b>
          </span>
        </div>
      </div>
      <data-table
        :columns="columns"
        :processor="processor"
      />
    </el-collapse-item>
  </el-collapse>
</template>

<style lang="scss" module>


.anchorDates {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.subheader {
  margin-bottom: 1rem;
  font-size: initial;
}
</style>
