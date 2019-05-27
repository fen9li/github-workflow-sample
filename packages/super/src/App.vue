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
          title: 'Auth',
          path: '/auth',
          icon: 'lock',
          children: [
            {
              title: 'API Endpoints',
              path: '/auth/api-endpoints',
            },
            {
              title: 'Users',
              path: '/auth/users',
            },
            {
              title: 'Roles',
              path: '/auth/roles',
            },
          ],
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
