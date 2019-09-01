<script>
import { mapActions, mapGetters } from 'vuex'
import AppSidebar from '~/components/app/app-sidebar'
import AppEntry from '~/components/app/app-entry'
import AppFrame from '~/components/app/app-frame'

export default {
  name: 'App',
  components: {
    AppSidebar,
    AppEntry,
    AppFrame,
  },
  data() {
    return {
      iframe: false,
      appUrl: 'localhost:8080',
    }
  },
  computed: {
    ...mapGetters('exchange', [
      'waiting',
      'connecting',
    ]),
    frameUrl() {
      const origin = window.location.origin

      return `${this.appUrl}?origin=${origin}`
    },
  },
  mounted() {
    this.initExchange()
  },
  methods: {
    ...mapActions('exchange', {
      initExchange: 'INIT',
    }),
    loadApp() {
      this.iframe = true
      this.$router.push('/dashboard')
    },
  },
}
</script>

<template>
  <main :class="$style.root">
    <app-sidebar>
      <router-view />
    </app-sidebar>
    <div :class="$style.app">
      <app-frame />
      <app-entry v-if="waiting || connecting" />
    </div>
  </main>
</template>

<style lang="scss" module>
.root {
  display: flex;
  width: 100vw;
  height: 100vh;
}

.app {
  flex-grow: 1;
}
</style>
