<script>
import FragmentsManager from './features/fragments-manager.vue'
import ColumnsHider from './features/columns-hider.vue'
import DataExporter from './features/data-exporter/data-exporter.vue'

export default {
  name: 'TableLayout',
  components: {
    FragmentsManager,
    ColumnsHider,
    DataExporter,
  },
  inheritAttrs: false,
  props: {
    title: {
      type: String,
      default: '',
    },
    hider: {
      type: Boolean,
      default: true,
    },
    exporter: {
      type: Boolean,
      default: true,
    },
    fragments: {
      type: Boolean,
      default: true,
    },
    tableControls: {
      type: Boolean,
      default: true,
    },
  },
}
</script>

<template>
  <el-card :class="$style.layout">
    <slot
      slot="header"
      name="header"
    >
      <span v-if="title">
        {{ title }}
      </span>
    </slot>
    <div
      v-if="tableControls"
      :class="$style.subheader"
    >
      <div :class="$style.filter">
        <data-filter
          v-bind="$attrs"
          v-on="$listeners"
        />
      </div>
      <div :class="$style.features">
        <fragments-manager
          v-if="fragments"
          v-bind="$attrs"
        />
        <columns-hider
          v-if="hider"
          v-bind="$attrs"
        />
        <data-exporter
          v-if="exporter"
          v-bind="$attrs"
        />
      </div>
    </div>
    <div :class="$style.tableWrapper">
      <data-table
        v-bind="$attrs"
        v-on="$listeners"
      >
        <slot
          slot="column"
          name="column"
        />
      </data-table>
    </div>
  </el-card>
</template>

<style lang="scss" module>
@import '@design';

.subheader {
  display: flex;
  align-items: flex-start;
  background: #f5f5f5;
}

.layout {
  margin-bottom: 2rem;
  overflow: visible;

  :global(.el-card__body) {
    padding: 0;
  }
}

.tableWrapper, .subheader {
  padding: 1rem 3rem;
}

.filter {
  flex-grow: 1;
}

.features {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
  height: 3.375rem;
}
</style>
