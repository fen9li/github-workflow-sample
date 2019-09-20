<script>
export default {
  name: 'HeaderDropdown',
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<template>
  <el-dropdown
    v-if="items.length > 0"
    trigger="click"
  >
    <div :class="$style.icon">
      <i class="el-icon-more" />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        v-for="(item, index) of items"
        :key="index"
        @click.native="item.action"
      >
        {{ item.label }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<style lang="scss" module>
.icon {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.4rem;
  font-size: 1.4rem;
  color: var(--color-primary-lightest);
  cursor: pointer;
  background-color: transparent;
  border-radius: 3px;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: var(--color-primary-transparent);
  }

  i {
    transform: rotate(90deg);
  }
}
</style>
