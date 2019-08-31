<script>
import cloneDeep from 'lodash/cloneDeep'

export default {
  name: 'FilterItem',
  props: {
    data: {
      type: Object,
      default: null,
    },
    filter: {
      type: Object,
      default: null,
    },
    processor: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      default: -1,
    },
  },
  data() {
    return {
      localData: null,
      isDropVisible: false,
    }
  },
  computed: {
    loading() {
      return this.processor.loading
    },
    summary() {
      const data = this.localData || this.data
      const customLabel = this.filter.customFiltering && this.filter.customFiltering.label

      return data && this.filter.getSummary({
        comparison: data.comparison,
        value: data.value,
        attribute: data.attribute,
        customLabel
      })
    },
    suchFilterAlreadyExists() {
      const { localData } = this

      if (!localData) {
        return false
      }

      const { attribute, comparison, value } = localData
      const { filters } = this.processor
      const existingFilter = filters.find(f =>
        f.attribute === attribute
        && f.comparison === comparison
        && f.value === value
      )

      return Boolean(existingFilter)
    },
    // Currently Done button was requested not to be disabled if 'suchFilterAlreadyExists', but we'll keep the functionality for a while
    doneDisabled() {
      const { localData } = this

      if (localData) {
        const { value } = localData
        const isEmptyList = value instanceof Array && !value.length

        return value === null
          || value === undefined
          || value === ''
          || isEmptyList
      } else {
        return true
      }
    },
    doneTitle() {
      const { suchFilterAlreadyExists } = this

      if (suchFilterAlreadyExists) {
        return 'Such filter already exists'
      }

      return ''
    },
  },
  mounted() {
    if (!this.data) this.toggleDropdown()

    this.overrideDropdownListeners()
  },
  methods: {
    overrideDropdownListeners() {
      const { dropdown } = this.$refs
      const { dropdownElm } = dropdown

      if (!dropdown) {
        return
      }

      const newKeydownListeners = e => {
        const { keyCode } = e
        if (keyCode === 13) {
          // enter
          e.stopImmediatePropagation()

          if (!this.doneDisabled) {
            this.applyFilter()
          }
        } else if (keyCode === 27) {
          // esc
          this.toggleDropdown()
        }
      }

      dropdownElm
        .removeEventListener('keydown', dropdown.handleItemKeyDown, true)
      dropdownElm
        .addEventListener('keydown', newKeydownListeners, true)
    },
    toggleDropdown() {
      this.$refs.dropdown.handleClick()
    },
    removeFilter() {
      if (this.data) {
        this.processor.removeFilter(this.index, this.filter)
      }
    },
    applyFilter() {
      let { index, processor } = this
      if (index === -1) {
        index = processor.dataQuery.filters.length
      }
      processor.applyFilter(this.localData, index, this.filter.customFiltering)
      this.toggleDropdown()
    },
    onDropdownVisibilityChanged(isVisible) {
      if (!isVisible) {
        this.isDropVisible = false
        this.localData = null
        this.$emit('remove')
      } else {
        this.createLocalData()
        this.isDropVisible = true
      }
    },
    createLocalData() {
      const { data } = this

      if (data) {
        this.localData = cloneDeep(data)
      } else {
        const firstComparison = this.filter.getFirstComparison()

        this.localData = {
          attribute: this.filter.attribute,
          comparison: firstComparison.type,
          value: null,
        }
      }
    },
  },
}
</script>

<template>
  <el-dropdown
    ref="dropdown"
    :class="$style.item"
    trigger="click"
    placement="bottom-start"
    @visible-change="onDropdownVisibilityChanged"
  >
    <el-button-group>
      <el-button
        :icon="filter.icon"
        :disabled="loading"
      >
        {{ summary }}
      </el-button>
      <el-button
        v-if="data"
        :disabled="loading"
        :class="$style.itemRemove"
        @click.stop="removeFilter"
      >
        <el-icon name="close" />
      </el-button>
    </el-button-group>
    <el-dropdown-menu
      slot="dropdown"
      :class="$style.itemDrop"
      :append-to-body="false"
    >
      <div :class="$style.itemContent">
        <component
          :is="filter.filterComponent"
          v-if="localData"
          :filter="filter"
          :model="localData"
          :visible="isDropVisible"
        />
      </div>
      <el-button
        :class="$style.itemDone"
        :title="doneTitle"
        :disabled="doneDisabled"
        @click="applyFilter"
      >
        Done
      </el-button>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<style lang="scss" module>
.item {
  margin-top: 7px;
  margin-right: 15px;
  margin-bottom: 7px;

  .el-button-group {
    display: flex;
  }
}

.itemRemove {
  padding-right: 8px;
  padding-left: 8px;
}

.itemDrop {
  max-width: 400px;
  padding: 0;
  overflow: visible;
}

.itemContent {
  min-width: 250px;
  padding: 20px;

  .el-checkbox__input {
    vertical-align: top;
  }

  label {
    margin-top: 10px;
  }
}

.itemDone {
  width: 100%;
  border-width: 1px 0 0;
  border-radius: 0;
}
</style>
