<script>
import includes from 'lodash/includes'
import FilterItem from './filter-item'
import DataProcessor from '../../processors/data-processor.js'

export default {
  name: 'AddFilterItem',
  components: {
    FilterItem,
  },
  props: {
    filters: {
      type: Array,
      required: true,
    },
    processor: {
      type: DataProcessor,
      required: true,
    },
  },
  data() {
    return {
      searchInput: '',
      selectedFilter: null,
    }
  },
  computed: {
    foundFilters() {
      const { filters } = this
      const searchInput = this.searchInput.toLowerCase()

      if (!searchInput) return filters

      return filters.filter(filter => {
        return includes(filter.label.toLowerCase(), searchInput)
      })
    },
  },
  methods: {
    selectFilter(filter) {
      this.selectedFilter = filter
    },
    onFilterRemove() {
      this.selectedFilter = null
    },
  },
}
</script>

<template>
  <filter-item
    v-if="selectedFilter"
    :filter="selectedFilter"
    :processor="processor"
    :class="$style.filterItem"
    @remove="onFilterRemove"
  />
  <el-popover
    v-else
    trigger="click"
    position="bottom"
    :class="$style.popover"
    :visible-arrow="false"
  >
    <el-input
      ref="input"
      v-model="searchInput"
      prefix-icon="el-icon-search"
      placeholder="Search columns"
      #header
      :class="$style.searchInput"
    />
    <div
      v-for="filter in foundFilters"
      :key="filter.attribute"
      :class="$style.addItem"
      @click.stop="selectFilter(filter)"
    >
      <i :class="[$style.addItemIcon, filter.icon]" />
      <span>{{ filter.label }}</span>
    </div>
    <div
      v-if="foundFilters.length === 0"
      :class="$style.noResults"
    >
      No results
    </div>
    <el-button
      slot="reference"
      type="text"
      :class="$style.addFilter"
    >
      <i
        class="el-icon-search"
        :class="$style.addFilterIcon"
      />
      Add Filter
    </el-button>
  </el-popover>
</template>

<style lang="scss" module>

.filterItem {
  button {
    background: rgba(0,0,0,.05);
  }
}

.popover {
  display: block;
  padding-top: 6px;
  padding-bottom: 6px;
}

.searchInput {
  width: 100%;
}

.addItem {
  padding: 10px 0;
  cursor: pointer;
  transition: color 0.15s ease-in-out;

  &:hover {
    color: var(--color-primary);
  }
}

.addItemIcon {
  display: inline-block;
  width: 2rem;
  text-align: center;
}

.noResults {
  padding-top: 10px;
  padding-bottom: 10px;
  margin-left: 30px;
  cursor: default;
}

.addFilter {
  font-size: 1rem !important;
}

.addFilterIcon {
  margin-right: 0.2rem;
}
</style>
