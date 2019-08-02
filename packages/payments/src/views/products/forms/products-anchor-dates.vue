<script>
import table from './products-anchor-dates-table.js'
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
      activeNames: [],
      table: table(this)
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
        name="productsAnchorDates"
        :columns="table.columns"
        :processor="table.processor"
        :highlight-row="hightlightRow.bind(null, selectedAnchorDate)"
      />
    </el-collapse-item>
  </el-collapse>
</template>
