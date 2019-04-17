<script>
import appConfig from '@src/app.config'
import AppHeader from '@components/app/header/app-header.vue'
import AppSidebar from '@components/app/sidebar/app-sidebar.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    AppHeader,
    AppSidebar,
  },
  computed: {
    ...mapGetters('auth', [
      'loggedIn',
    ]),
  },
  page: {
    // All subcomponent titles will be injected into this template.
    titleTemplate(title) {
      title = typeof title === 'function' ? title(this.$store) : title
      return title ? `${title} | ${appConfig.title}` : appConfig.title
    },
  },
}
</script>

<template>
  <el-container

    v-if="loggedIn"

    id="app"
  >
    <ElHeader
      height="72px"
    >
      <app-header />
    </ElHeader>
    <el-container class="main-container">
      <el-aside
        width="260px"
      >
        <app-sidebar />
      </el-aside>
      <el-main>
        <RouterView :key="$route.path" />
      </el-main>
    </el-container>
  </el-container>
  <RouterView v-else />
</template>

<!-- This should generally be the only global CSS in the app. -->
<style lang="scss">
@import './styles/index';

#app {
  min-width: 1000px;
  height: 100vh;
  overflow: hidden;
}

#nprogress .bar {
  background: $color-link-text;
}

.main-container {
  height: calc(100vh - 72px);
}

</style>
