<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SuperApp',
  computed: {
    ...mapGetters('auth', [
      'loggedIn',
    ]),
    menu() {
      return [
        {
          title: 'Home',
          path: '/',
          icon: 'news',
        },
      ]
    },
  },
}
</script>

<template>
  <app-layout
    v-if="loggedIn"
    id="app"
    :menu="menu"
    app-code="super"
    title="Super App"
  >
    <router-view />
  </app-layout>
  <router-view v-else />
</template>

<!-- This should generally be the only global CSS in the app. -->
<style lang="scss">

#nprogress .bar {
  background: var(--color-link);
}

</style>
