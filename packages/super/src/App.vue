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
        {
          title: 'Users',
          path: '/users',
          icon: 'user',
        },
      ]
    },
  },
}
</script>

<template>
  <app-layout
    id="app"
    :menu="menu"
    title="Super"
  >
    <router-view />
  </app-layout>
</template>

<!-- This should generally be the only global CSS in the app. -->
<style lang="scss">

#nprogress .bar {
  background: var(--color-link);
}

</style>
