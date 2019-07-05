<script>
export default {
  name: 'EditLayoutCategories',
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    selectValue(item) {
      item.seleted = true
    },
  },
}
</script>
<template>
  <div :class="$style.container">
    <el-checkbox
      v-for="(item, index) in value"
      :key="index"
      v-model="item.selected"
      :label="item.label"
      @input="selectValue(item)"
    />
  </div>
</template>

<style lang="scss" module>
.container {
  display: grid;
}
</style>
