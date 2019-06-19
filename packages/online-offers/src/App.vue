<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SuperApp',
  computed: {
    ...mapGetters('auth', [
      'loggedIn',
    ]),
    ...mapGetters('ui', [
      'menu',
    ]),
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
