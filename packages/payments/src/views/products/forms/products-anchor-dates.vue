<script>
import table from './products-anchor-dates-table.js'
import ElasticProcessor from '@lib/processors/elastic-processor'
import { formatDate } from '@lib/utils/format-date'


export default {
  name: 'ProductsAnchorDates',
  props: {
    selectedAnchorDate: {
      type: [Date, String],
      default: '',
    },
  },
  data() {
    return {
      dialogVisible: false,
      activeNames: [],
      columns: table.columns,
      processor: new ElasticProcessor({
        component: this,
        index: 'subscription-product-groups',
      }),
    }
  },
  methods: {
    hightlightRow(value, current) {
      const format = formatDate
      if (value && current) return format(value, 'DD/MMM', false) === format(current.anchorAt, 'DD/MMM', false)
    },
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
        ref="table"
        :columns="columns"
        :processor="processor"
        :highlight-row="hightlightRow.bind(null, selectedAnchorDate)"
      />
    </el-collapse-item>
  </el-collapse>
</template>
