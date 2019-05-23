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
          title: 'System',
          path: '/settings',
          icon: 'cpu',
          children: [
            {
              title: 'Users',
              path: '/settings/users',
              icon: 'user',
            },
            {
              title: 'Roles and permissions',
              path: '/settings/roles',
              icon: 'user',
            },
            // {
            //   title: 'Payment Settings',
            //   path: '/settings/payment',
            // },
            // {
            //   title: 'Notification Settings',
            //   path: '/settings/notification',
            // },
            // {
            //   title: 'User Access',
            //   path: '/settings/user-access',
            // },
            // {
            //   title: 'Templates',
            //   path: '/settings/templates',
            // },
            // {
            //   title: 'Log History',
            //   path: '/settings/log-history',
            // },
            // {
            //   title: 'Events',
            //   path: '/settings/events',
            // },
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
