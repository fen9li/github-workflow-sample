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
          title: 'Offers',
          path: '/offers',
          icon: 'goods',
        },
        {
          title: 'Clients',
          path: '/clients',
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
