<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AdminPanel',
  computed: {
    ...mapGetters('ui', [
      'menu',
    ]),
  },
}
</script>

<template>
  <app-layout-dummy :menu="menu">
    <router-view />
  </app-layout-dummy>
</template>

<!-- This should generally be the only global CSS in the app. -->
<style lang="scss">
  #nprogress .bar {
    background: var(--color-link);
  }

  .el-notification__content {
    text-align: left;
  }
</style>
