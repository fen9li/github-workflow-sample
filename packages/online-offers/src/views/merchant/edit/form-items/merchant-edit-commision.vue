<script>
import formatDollar from '@lib/utils/format-dollar'

export default {
  name: 'MerchantEditCommission',
  props: {
    currentItem: {
      type: Boolean,
      required: true,
    },
    commission: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      selected: `${this.commission.selected}`,
    }
  },
  computed: {
    bindings() {
      const { commission, currentItem, selected } = this
      return {
        componentName: currentItem ? 'el-input' : 'el-radio',
        baseValue: currentItem ? commission.value.base || '' : selected,
        minValue: commission.value.min || '',
        maxValue: commission.value.max || '',
        disabled: currentItem ? commission.selected : false,
      }
    },
  },
  watch: {
    'commission.selected': {
      handler(newVal) {
        this.selected = `${newVal}`
      },
      deep: true,
    },
  },
  methods: {
    updateValue(event, name) {
      this.$emit('changeValue', { apply: event, name, value: this.commission.value })
    },
    formatDollar(value) {
      return formatDollar(value)
    },
  },
}
</script>

<template>
  <div :class="$style.wrapper">
    <div :class="$style.fieldWrapper">
      <div :class="$style.field">
        <span
          v-if="currentItem"
          :class="$style.inputTitle"
        >
          Base
        </span>
        <component
          :is="bindings.componentName"
          :value="bindings.baseValue"
          label="true"
          :disabled="bindings.disabled"
          @input="updateValue($event, 'base')"
        >
          <span slot="prefix">$</span>
          <span>
            {{ `Base ${formatDollar(commission.value.base)}` }}
          </span>
        </component>
      </div>
    </div>
    <div :class="$style.fieldWrapper">
      <div
        v-if="currentItem"
        :class="$style.field"
      >
        <span :class="$style.inputTitle">
          Min
        </span>
        <el-input
          :disabled="bindings.disabled"
          :value="bindings.minValue"
          @input="updateValue($event, 'min')"
        >
          <span slot="prefix">$</span>
        </el-input>
      </div>
      <span
        v-else
        :class="$style.disabledValue"
      >
        {{ `Min ${formatDollar(bindings.minValue)}` }}
      </span>
    </div>
    <div :class="$style.fieldWrapper">
      <div
        v-if="currentItem"
        :class="$style.field"
      >
        <span :class="$style.inputTitle">
          Max
        </span>
        <el-input
          :disabled="bindings.disabled"
          :value="bindings.maxValue"
          @input="updateValue($event, 'max')"
        >
          <span slot="prefix">$</span>
        </el-input>
      </div>
      <span
        v-else
        :class="$style.disabledValue"
      >
        {{ `Max ${formatDollar(bindings.maxValue)}` }}
      </span>
    </div>
  </div>
</template>

<style lang="scss" module>
.wrapper {
  width: 100%;
}

.field {
  display: flex;
  align-items: center;
  height: 2.5rem;

  :global {
    .el-radio__label {
      color: var(--color-text)
    }
    .el-input--prefix {
      .el-input__inner {
        padding-left: 1.4rem;
      }

      .el-input__prefix {
        padding-left: 0.7rem;
        color: #606266;
      }
  }

  .is-disabled {
    .el-input__prefix {
      color: #C0C4CC !important;
    }
  }

  }
}

.fieldWrapper {
  &:not(:last-of-type) {
    padding-bottom: 1rem;
  }
}

.inputTitle {
  min-width: 2rem;
  margin-right: 1rem;
}
.disabledValue {
  padding-left: 2rem;
  color: gray;
}
</style>
