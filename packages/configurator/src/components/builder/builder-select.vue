<script>
import BuilderElement from './builder-element.mixin'

export default {
  name: 'BuilderSelect',
  mixins: [BuilderElement],
  props: {
    options: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<template>
  <div class="builder-select form-element">
    <div class="block-label">
      {{ label }}
    </div>
    <el-select
      :value="value"
      @input="onInput"
    >
      <el-option
        v-for="option in options"
        :key="option.value"
        :label="option.label"
        :value="option.value"
      />
    </el-select>
  </div>
</template>

<style lang="scss">
.builder-select {

  .el-select {
    width: 100%;
  }
}
</style>
