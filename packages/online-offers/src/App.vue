<script>
import { mapGetters } from 'vuex'
import { API } from '@loyaltycorp/manage-lib/processors/api-processor'
import HeaderPublish from './components/publish/publish-changes'

export default {
  name: 'SuperApp',
  components: {
    HeaderPublish,
  },
  computed: {
    ...mapGetters('auth', [
      'loggedIn',
    ]),
    ...mapGetters('ui', [
      'menu',
    ]),
  },
  created() {
    const authHash = btoa(process.env.VUE_APP_API_AUTH + ':')
    const authHeader = `Basic ${authHash}`

    API.defaults.headers.common['Authorization'] = authHeader
  },
}
</script>

<template>
  <app-layout
    id="app"
    :menu="menu"
    title="Online Offers"
  >
    <header-publish slot="header-right" />
    <router-view />
  </app-layout>
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
