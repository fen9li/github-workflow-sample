<script>
import BuilderElement from './builder-element.mixin'

export default {
  name: 'BuilderRadio',
  mixins: [BuilderElement],
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    direction: {
      type: String,
      default: 'row',
      validator: v => /row|column/.test(v),
    },
    type: {
      type: String,
      default: '',
      validator: v => !v || /boolean/.test(v),
    },
  },
  computed: {
    isBoolean() {
      return this.type === 'boolean'
    },
    localOptions() {
      if (this.isBoolean) {
        return [
          { label: 'No', value: 'no' },
          { label: 'Yes', value: 'yes' },
        ]
      } else {
        return this.options
      }
    },
    localValue() {
      if (this.isBoolean) {
        return this.value ? 'yes' : 'no'
      } else {
        return this.value
      }
    },
  },
  methods: {
    onInput(value) {
      if (this.isBoolean) {
        this.$emit('input', value === 'yes')
      } else {
        this.$emit('input', value)
      }
    },
  },
}
</script>

<template>
  <div class="builder-radio form-element">
    <div class="block-label">
      {{ label }}
    </div>
    <el-radio-group
      :value="localValue"
      @input="onInput"
    >
      <el-radio-button
        v-for="option in localOptions"
        :key="option.value"
        :label="option.value"
      >
        {{ option.label }}
      </el-radio-button>
    </el-radio-group>
  </div>
</template>

<style lang="scss">
.builder-radio {

  .el-radio-group {
    display: flex;
    width: 100%;
  }

  .el-radio-button {
    flex-grow: 1;
  }

  .el-radio-button__inner {
    width: 100%;
  }
}
</style>
