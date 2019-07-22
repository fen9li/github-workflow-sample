<script>
import FeaturesMixin from './features.mixin.js'

export default {
  name: 'ColumnsHider',
  mixins: [FeaturesMixin],
  data() {
    return {
      visibleList: [],
    }
  },
  computed: {
    hideList() {
      const { columnNames, visibleList } = this

      return columnNames.filter(x => visibleList.indexOf(x) === -1)
    },
    realColumns() {
      return this.columns.filter(c => Boolean(c.name))
    },
    columnNames() {
      return this.realColumns.map(c => c.name)
    },
    hide() {
      const { dataQuery } = this.processor

      if (dataQuery !== null) {
        return dataQuery.hide
      }

      return []
    },
  },
  watch: {
    hide() {
      this.setVisibilityList()
    },
    columns() {
      this.setVisibilityList()
    },
  },
  mounted() {
    this.setVisibilityList()
  },
  methods: {
    setVisibilityList() {
      const { hide, columnNames } = this
      const visibleColumns = columnNames.filter(
        x => hide.indexOf(x) === -1
      )

      this.visibleList = visibleColumns
    },
    checkDisabledState(column) {
      const { hideList, columnNames, visibleList } = this

      // We don't want to hide the last visible
      if (
        hideList.length === columnNames.length - 1 &&
        column === visibleList[0]
      ) {
        return true
      }

      return false
    },
    onChange() {
      this.processor.updateHide(this.hideList)
    },
  },
}
</script>

<template>
  <div :class="$style.root">
    <el-dropdown trigger="click">
      <el-button
        :class="$style.button"
        size="small"
        type="primary"
        plain
      >
        <i class="el-icon-arrow-down el-icon-menu" />
        <i class="el-icon-caret-bottom el-icon--right" />
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <div :class="$style.wrapper">
          <el-checkbox-group
            v-if="columnNames.length"
            v-model="visibleList"
            :class="$style.list"
          >
            <el-checkbox
              v-for="column in realColumns"
              :key="column.name"
              :label="column.name"
              :disabled="checkDisabledState(column.name)"
              @change="onChange"
            >
              <i
                :class="[
                  'el-icon-arrow-down',
                  $style.itemIco,
                  column.icon,
                ]"
              />
              <span>
                {{ column.label }}
              </span>
            </el-checkbox>
          </el-checkbox-group>
          <div
            v-else
            class="columns-hider__noresults"
          >
            No columns to hide
          </div>
        </div>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<style lang="scss" module>

.root {
  margin-left: 1rem;
}

.button {
  height: 2rem;

  :global {
    .el-icon--right {
      margin-left: 0.6rem;
    }
  }
}

.wrapper {
  padding: 0 1.5rem 0 1rem;
}

.list {
  display: flex !important;
  flex-direction: column !important;

  :global {
    .el-checkbox {
      align-items: center;
      margin: 0 !important;

      &__label {
        padding: .6rem 0;
        font-size: 1rem;
        line-height: 1rem;
      }
    }
  }
}

.itemIco {
  margin: 0 0.6rem 0 0.7rem;
}

</style>
