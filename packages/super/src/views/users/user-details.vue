<script>

export default {
  name: 'UserDetails',
  page: {
    title: 'User Details',
  },
  data() {
    const { id } = this.$route.params
    return {}
  },
}
</script>

<template>
  <main-layout
    back
    title="User details"
  >
    <el-card :class="$style.summary">
      <div slot="header">
        Summary
      </div>
    </el-card>
  </main-layout>
</template>

<style lang="scss" module>
  :global {
    .el-card + .el-card {
      margin-top: 1rem;
    }
  }
</style>

