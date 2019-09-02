<script>
import FilterItem from './filter-item.vue'
import FilterItemNew from './filter-item-new.vue'
import filterTypes from './filter-types'
import DataProcessor from '../../processors/data-processor.js'

export default {
  name: 'DataFilter',
  components: {
    FilterItem,
    FilterItemNew,
  },
  inheritAttrs: false,
  props: {
    filters: {
      type: Array,
      required: true,
    },
    initialFilters: {
      type: Array,
      default: () => [],
    },
    processor: {
      type: DataProcessor,
      required: true,
    },
  },
  computed: {
    readyFilters() {
      return this.filters.map(filter => {
        const FilterType = filterTypes[filter.type]

        return FilterType ? new FilterType(filter) : null
      })
    },
  },
  created() {
    for (let i = 0; i < this.initialFilters.length; i++) {
      this.processor.applyFilter(this.initialFilters[i], i)
    }
  },
  methods: {
    getFilterByAttribute(attribute) {
      return this.readyFilters.find(i => i.attribute === attribute)
    },
    getFilterKey({ attribute, comparison, value }) {
      return `${attribute}${comparison}${value}`
    },
  },
}
</script>

<template>
  <div
    v-if="processor.dataQuery"
    :class="$style.tableFilter"
  >
    <filter-item
      v-for="(data, index) in processor.filters"
      :key="getFilterKey(data)"
      :filter="getFilterByAttribute(data.attribute)"
      v-bind="{data, index, processor}"
    />
    <filter-item-new
      :filters="readyFilters"
      :processor="processor"
    />
  </div>
</template>

<style lang="scss" module>
  .tableFilter {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
</style>
