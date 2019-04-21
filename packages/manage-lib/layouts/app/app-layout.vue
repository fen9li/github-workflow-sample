<script>
import AppHeader from './header/app-header.vue'
import AppSidebar from './sidebar/app-sidebar.vue'

export default {
  components: {
    AppHeader,
    AppSidebar,
  },
  inheritAttrs: false,
}
</script>

<template>
  <el-container :class="$style.root">
    <el-header height="72px">
      <app-header v-bind="$attrs" />
    </el-header>
    <el-container :class="$style.main">
      <el-aside width="260px">
        <app-sidebar v-bind="$attrs" />
      </el-aside>
      <el-main>
        <slot />
      </el-main>
    </el-container>
  </el-container>
</template>

<!-- This should generally be the only global CSS in the app. -->
<style lang="scss" module>

.root {
  min-width: 1000px;
  height: 100vh;
  overflow: hidden;
}

.main {
  height: calc(100vh - 72px);
}
</style>
