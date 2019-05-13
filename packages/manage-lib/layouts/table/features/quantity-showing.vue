<script>
export default {
  props: {
    options: {
      type: Array,
      default: () => {
        return [
          25, 50, 100,
        ]
      },
    },
  },
  data() {
    return {
      activeCount: 50,
    }
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
        v-model="activeCount"
        size="small"
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
