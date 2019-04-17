<script>
import AppLayout from './components/layout/app-layout.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    AppLayout,
  },
  computed: {
    ...mapGetters('auth', [
      'loggedIn',
    ]),
  },
}
</script>

<template>
  <app-layout
    v-if="loggedIn"
    id="app"
  />
  <router-view v-else />
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
