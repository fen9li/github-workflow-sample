<script>
import tableConfig from './anchor-dates-table.js'
import tableData from '@/tests/mock-api/resources/create-product-anchor-dates'
import StaticProcessor from '@core/static-processor'


export default {
  name: 'ProductAnchorDatesModal',
  data() {
    return {
      dialogVisible: false,
      activeNames: [1],
      columns: tableConfig.columns,
      processor: new StaticProcessor({
        component: this,
        data: tableData,
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
@import '@design';

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
