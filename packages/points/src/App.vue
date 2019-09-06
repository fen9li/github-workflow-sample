<script>
import { API } from '@loyaltycorp/manage-lib/processors/api-processor'
import { mapGetters } from 'vuex'

export default {
  name: 'PointsApp',
  computed: {
    ...mapGetters('auth', [
      'loggedIn',
    ]),
    ...mapGetters('ui', [
      'menu',
    ]),
  },
  methods: {
    handleLoginEvent(data) {
      const authHeader = `Bearer ${data.accessToken}`
      API.defaults.headers.common['Authorization'] = authHeader
      this.$store.dispatch('providers/getProviders')
    },
  },
}
</script>

<template>
  <app-layout
    id="app"
    :menu="menu"
    title="Points"
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
