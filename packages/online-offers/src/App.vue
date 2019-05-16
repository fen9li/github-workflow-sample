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
          title: 'Dashboard',
          path: '/',
          icon: 'menu',
        },
        {
          title: 'Clients',
          path: '/clients',
          icon: 'user',
        },
        {
          title: 'Merchants',
          path: '/merchants',
          icon: 'goods',
        },
        {
          title: 'Feed Updates',
          path: '/feed-updates',
          icon: 'refresh-right',
        },
        {
          title: 'Feed Status',
          path: '/feed-status',
          icon: 's-marketing',
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
    title="Online Offers"
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
