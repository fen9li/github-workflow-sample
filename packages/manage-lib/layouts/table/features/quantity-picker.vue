<script>
import FeaturesMixin from './features.mixin.js'

export default {
  name: 'QuantityPicker',
  mixins: [FeaturesMixin],
  props: {
    quantity: {
      type: [Boolean, Array],
      default: true
    },
  },
  data() {
    return {
      activeCount: -1,
    }
  },
  computed: {
    options() {
      const { quantity } = this
      if (typeof quantity === 'boolean') {
        if (quantity) {
          return [15, 20, 25, 50, 100]
        } else {
          return []
        }
      }

      return quantity
    }
  },
  watch: {
    'processor.dataQuery.pageSize': {
      handler(newCount) {
        if (this.activeCount !== newCount) {
          this.activeCount = newCount
        }
      },
      immediate: true,
    },
  },
  created() {
    this.activeCount = this.options[0]
  },
  methods: {
    onCountChange(newCount) {
      this.activeCount = newCount

      this.processor.updatePageSize(newCount)
    },
  },
}
</script>

<template>
  <div :class="$style.root">
    <div :class="$style.label">
      Show
    </div>
    <div :class="$style.select">
      <el-select
        :value="activeCount"
        size="small"
        @input="onCountChange"
      >
        <el-option
          v-for="item in options"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </div>
  </div>
</template>


<style lang="scss" module>
  .root {
    display: flex;
    align-items: center;
    margin-left: 1rem;
  }

  .label {
    margin-right: 0.5rem;
    font-size: 13px;
  }

  .select {
    :global {
      .el-select {
        width: 70px;
      }
    }
  }
</style>
