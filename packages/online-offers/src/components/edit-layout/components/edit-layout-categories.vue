<script>
export default {
  name: 'EditLayoutCategories',
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    categories: {
      type: Array,
      default: () => [],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    selectValue(checked, item) {
      if (checked) {
        if (!this.selected(item)) {
          this.value.push(item)
        }
      } else {
        const indexOf = this.value.findIndex(el => el.id === item.id)
        if (indexOf !== -1) {
          this.value.splice(indexOf, 1)
        }
      }
      this.$emit('input', this.value)
    },
    selected(item) {
      for (const el of this.value) {
        if (el.id === item.id) {
          return true
        }
      }
      return false
    },
  },
}
</script>

<template>
  <div :class="$style.container">
    <el-checkbox
      v-for="item in categories"
      :key="item.id"
      :label="item.name"
      :value="selected(item)"
      :disabled="disabled"
      @input="selectValue($event, item)"
    />
  </div>
</template>

<style lang="scss" module>
.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: rem(10px);
  width: 100%;

  :global {
    .el-checkbox {
      margin-right: 0;
    }
  }
}
</style>
