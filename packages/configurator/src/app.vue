<script>
import { mapActions, mapGetters } from 'vuex'

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
  },
}
</script>

<template>
  <main :class="$style.root">
    <div :class="$style.sidebar">
      <router-view />
    </div>
    <div :class="$style.wrapper">
      <app-entry v-if="waiting || connecting" />
      <div
        v-show="showFrame"
        :class="$style.app"
      >
        <app-header />
        <app-frame />
      </div>
    </div>
  </main>
</template>

<style lang="scss" module>
.root {
  display: flex;
  width: 100vw;
  height: 100vh;
}

.sidebar {
  display: flex;
  flex-direction: column;
  width: rem(300px);
  height: 100vh;
  border-right: 1px solid var(--color-divider);
}

.wrapper {
  flex-grow: 1;
}
</style>
