<script>
import { mapActions, mapGetters } from 'vuex'
import api from '@lib/api'

export default {
  name: 'App',
  computed: {
    ...mapGetters('exchange', [
      'waiting',
      'connecting',
    ]),
    ...mapGetters('frame', [
      'showFrame',
    ]),
    ...mapGetters('dashboard', [
      'widgets',
    ]),
  },
  mounted() {
    this.initExchange()
  },
  methods: {
    ...mapActions('exchange', {
      initExchange: 'INIT',
    }),
    handleLoginEvent(data) {
      const authHeader = `Bearer ${data.accessToken}`
      api.axios.defaults.headers.common['Authorization'] = authHeader
    },
  },
}
</script>

<template>
  <app-layout :class="$style.root">
    <router-view
      slot="sidebar"
      :key="$route.path"
    />
    <div
      slot="authorized"
      :class="$style.wrapper"
    >
      <app-entry v-if="waiting || connecting" />
      <div
        v-show="showFrame"
        :class="$style.app"
      >
        <app-header />
        <app-frame />
      </div>
    </div>
  </app-layout>
</template>

<style lang="scss" module>
.root {
  display: flex;
  width: 100vw;
  height: 100vh;

  :global(.el-header) {
    display: none;
  }
}

.sidebar {
  display: flex;
  flex-direction: column;
  width: rem(300px);
  height: 100vh;
  border-right: 1px solid var(--color-divider);
}

.app {
  height: 100%;
}

.wrapper {
  height: 100%;
}
</style>
